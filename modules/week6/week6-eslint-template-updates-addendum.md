## OPTIONAL READING: Addendum re: template updates and ESLINT!

Folks, I added an ESLint configuration to our starter kit. As I've mentioned in previous lectures,
ESLint is a static code analyzer that will report syntax errors and poor JS patterns in your code,
and even fix the issues that it finds (provided those fixes will have no material effect on running
your code).

The JS ecosystem is wide and wonderful, which is why I have put you all through the trouble of
learning npm etc.

Here's a link to the ESLint website: (https://eslint.org/)[https://eslint.org/]

To summarize,

1. Pull in your template updates using the (instructions on our course
   README.md)[https://github.com/artzte/cocc-js#setting-up-to-receive-course-updates].
2. If you have an active project in play that you want to update with the ESLint features, then run
   this command:

```
# from the root of your repository folder, eg ~/src/artzt-cocc-js:
cp starter/package.json starter/eslint.config.js projects/week6
```

3. Run the eslint static analyzer:

```
# from your project folder, eg ~/src/artzt-cocc-js/projects/week6:
npm run lint:fix
```

4. Profit!
