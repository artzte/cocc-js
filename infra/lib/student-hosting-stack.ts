import * as cdk from 'aws-cdk-lib'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { Construct } from 'constructs'

export class StudentHostingStack extends cdk.Stack {
  public readonly bucket: s3.Bucket
  public readonly distribution: cloudfront.Distribution

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // 1. Private S3 bucket storing each student's built output under /<student-slug>/
    this.bucket = new s3.Bucket(this, 'StudentProjectsBucket', {
      bucketName: `cocc-cis133js-projects-${this.account}`,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      versioned: false,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    })

    // 2. CloudFront viewer-request function for per-student SPA routing (e.g. Navigo)
    //    - "/" -> "/index.html"
    //    - "/phillips/assets/app.js" (has file extension) -> served as-is from S3
    //    - "/phillips", "/phillips/", "/phillips/items/42" (no extension) -> "/phillips/index.html"
    const spaRouterFunction = new cloudfront.Function(
      this,
      'StudentSpaRouterFunction',
      {
        functionName: 'cocc-cis133js-student-spa-router',
        comment:
          'Rewrites /<student> and /<student>/<spa-route> to /<student>/index.html while passing static assets through',
        runtime: cloudfront.FunctionRuntime.JS_2_0,
        code: cloudfront.FunctionCode.fromInline(
          `
function handler(event) {
  var request = event.request;
  var uri = request.uri || '/';

  if (uri === '/' || uri === '') {
    request.uri = '/index.html';
    return request;
  }

  var parts = uri.split('/').filter(Boolean);
  if (parts.length === 0) {
    request.uri = '/index.html';
    return request;
  }

  var studentSlug = parts[0];
  var lastSegment = parts[parts.length - 1];

  // If the last path segment has a file extension (e.g. .js, .css, .png, .svg, .html),
  // serve that static asset directly from S3.
  if (lastSegment.indexOf('.') !== -1) {
    return request;
  }

  // Otherwise, treat it as the student's root or an SPA client-side route
  // (e.g. /phillips, /phillips/, /phillips/about, /phillips/items/42)
  // and serve that student's index.html so routers like Navigo can handle it.
  request.uri = '/' + studentSlug + '/index.html';
  return request;
}
        `.trim(),
        ),
      },
    )

    // 3. CloudFront distribution using Origin Access Control (OAC) to read from S3
    this.distribution = new cloudfront.Distribution(
      this,
      'StudentProjectsDistribution',
      {
        comment: 'CIS 133JS Student Final Projects',
        defaultRootObject: 'index.html',
        priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
        httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
        defaultBehavior: {
          origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          compress: true,
          cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
          functionAssociations: [
            {
              function: spaRouterFunction,
              eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            },
          ],
        },
      },
    )

    // Outputs used by issue-student-token.sh and GitHub Actions
    new cdk.CfnOutput(this, 'BucketName', {
      value: this.bucket.bucketName,
      description: 'S3 bucket storing student final project builds',
    })

    new cdk.CfnOutput(this, 'DistributionId', {
      value: this.distribution.distributionId,
      description: 'CloudFront distribution ID',
    })

    new cdk.CfnOutput(this, 'DistributionDomainName', {
      value: this.distribution.distributionDomainName,
      description: 'Base domain for student apps',
    })

    new cdk.CfnOutput(this, 'BaseUrl', {
      value: `https://${this.distribution.distributionDomainName}`,
      description:
        'Base HTTPS URL (append /<student-slug> to launch a student app)',
    })
  }
}
