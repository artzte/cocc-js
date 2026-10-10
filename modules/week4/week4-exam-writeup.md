## Week 4 Exam Writeup: Assessment Architecture & Final Project Capstone

A common question students ask around Week 4—as we approach the first third of our term—is:  
_**"When is our midterm exam, and how will the final exam be conducted?"**_

This document outlines the examination architecture for CIS-133JS, explains why Week 4 marks the
launch of your examination sequence, and details how your comprehensive capstone project fulfills
the role of our final exam.

---

### Course Examination Philosophy: Project as Exam

Traditional timed written examinations or multiple-choice tests are poor proxies for evaluating
real-world software engineering skill. In web development, your competence is proven by your ability
to:

1. Reason through complex language semantics (scoping, asynchronous execution, and data
   transformation).
2. Architect modular, maintainable systems using modern ECMAScript standards (ES Modules and ES6
   Classes).
3. Connect front-end interfaces to live network resources via asynchronous HTTP APIs (`fetch`).
4. Write robust automated unit test suites (using Vitest) that verify business logic independently
   of the DOM.
5. Deploy a functioning, accessible web application to public cloud infrastructure (GitHub Pages).

For these reasons, **CIS-133JS does not administer a traditional in-class or proctored written final
exam**. Instead, **your staged Final Project serves as the comprehensive Final Exam for the
course**.

---

### Grade Allocation & Staged Exam Sequence

The Final Project capstone comprises **40% of your total course grade** (equal in weight to all ten
weekly programming assignments combined). Rather than leaving this massive assessment to a single
stressful submission at the end of the term, the project exam is partitioned into **four staged
milestones**:

| Milestone       | Delivery Week              | Due Date                                                               | Deliverable                                  | Weight | Location / Requirements                                                                                    |
| :-------------- | :------------------------- | :--------------------------------------------------------------------- | :------------------------------------------- | :----- | :--------------------------------------------------------------------------------------------------------- |
| **Milestone 1** | **Week 4** (starts Oct 12) | **Monday, Oct 19**                                                     | **Project Proposal & API Selection**         | 10%    | `projects/final/README.md` via GitHub PR                                                                   |
| **Milestone 2** | **Week 7** (starts Nov 2)  | **Monday, Nov 9**                                                      | **Design Document & Architecture Plan**      | 10%    | Additions to `projects/final/README.md` via PR                                                             |
| **Milestone 3** | **Week 9** (starts Nov 16) | **Monday, Nov 23**                                                     | **Initial Structure & Test Scaffold**        | 10%    | PR with stubbed modules + passing Vitest tests + successful initial deployment to class page hosted on AWS |
| **Milestone 4** | **Week 12** (Finals Week)  | **Mon 12/7 (PR)**<br>**Wed 12/9 (Review)**<br>**Fri 12/11 (Approval)** | **Final Application Delivery & Walkthrough** | 10%    | Live deployment preview + PR approved by instructor                                                        |

---

### Milestone Submission Schedule & Review Workflow

- **Standard Milestone Cadence**: Each of the first three project deliverables (Milestones 1, 2,
  and 3) is due on the **Monday following the delivery week** by **11:59 PM**. Week 4 begins on
  **October 12**, establishing the following schedule:
  - **Milestone 1 (Proposal)**: Delivered in Week 4; due **Monday, October 19**.
  - **Milestone 2 (Design Document)**: Delivered in Week 7; due **Monday, November 9**.
  - **Milestone 3 (Initial Structure & Test Scaffold)**: Delivered in Week 9; due **Monday, November
    23**.
- **Final Deliverable (Milestone 4) Exception & Review Window**:  
  Unlike earlier milestones, the final deliverable must be completed within Finals Week (Week 12) to
  enable iterative code review and grading before the end of the term on Friday, December 11:
  1. **Initial Pull Request (Monday, 12/7 by 11:59 PM)**: You must submit your complete application
     as an initial pull request against `main`, tag instructor **Eric Artzt** (`artzte`) as
     reviewer, and ensure your preview app is running live in the designated deployment environment.
  2. **Instructor Initial Comments (Wednesday, 12/9)**: The instructor commits to returning
     structured initial code review comments on your pull request by Wednesday, December 9.
  3. **Revisions & Final PR Approval (Friday, 12/11)**: You must address all review feedback, push
     any necessary fixes, and secure a final pull request approval from the instructor by Friday,
     December 11.

---

### Alignment with Course Learning Outcomes

The Final Project is calibrated to provide measurable evidence that you have achieved all four core
outcomes defined in the COCC course catalog:

| Course Outcome | Description                                                                 | How It Is Evaluated in the Final Project Exam                                                                                            |
| :------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **CO1**        | _Implement scripts relying on DOM architecture and methods._                | Constructing dynamic DOM templates, creating elements, managing classes/attributes, and updating content without external UI frameworks. |
| **CO2**        | _Construct functions utilizing variables, conditionals, loops, and arrays._ | Implementing data processing pipelines, filtering API payloads, sorting collections, and managing application state.                     |
| **CO3**        | _Generate scripts that process user input and provide meaningful output._   | Capturing search queries, filter selections, and form submissions, presenting dynamic feedback, loading states, and error alerts.        |
| **CO4**        | _Plan and create scripts utilizing events and handlers._                    | Employing `addEventListener`, handling form submissions, bubbling/delegation, and coordinating asynchronous responses.                   |

---

### Final Project Technical Requirements Checklist

When your project is evaluated during Finals Week (Milestone 4), it will be assessed against these
rigorous criteria:

- [ ] **Pure Vanilla JavaScript**: Zero UI frameworks (no React, Vue, Svelte, or Angular).
- [ ] **ES Modules (≥4 Modules)**: Clean separation of concerns (e.g., API client, state model, DOM
      view, controller).
- [ ] **ES6 Class (≥1 Class)**: Meaningful object-oriented encapsulation modeling an application
      entity or service.
- [ ] **Public API Consumption**: At least one live asynchronous `fetch` integration with robust
      `res.ok` validation, error handling, and loading state indicators.
- [ ] **Event-Driven Interactions (≥3 Distinct Interactions)**: Live search, category filters,
      modals, sorting, or persistent favorites.
- [ ] **Automated Testing Suite**: Passing Vitest unit tests verifying non-DOM business logic and
      data transformations.
- [ ] **Public Deployment**: Live preview hosted on AWS with zero build errors. (Instructor will
      supply the dev-ops workflow for this; you'll probably just need to add a security key,
      provided by the instructor, to your repo settings)
- [ ] **Instructor PR Approval**: Initial pull request opened by Monday, 12/7 with instructor tagged
      as reviewer, preview app running, review comments addressed, and PR approved by Friday, 12/11.

---

### Academic Integrity & Original Work

As stated in our course syllabus:

- All project code submitted must be your own original work written specifically for this course.
- You are encouraged to use GitHub Copilot to review and lint your pull requests. However, you may
  not use generative AI tools to wholesale generate application features or bypass the learning
  objectives.
- You may use AI tools to solve IT-related problems on your workstation, such as difficulties with
  Git
- If you have questions regarding architecture, API choice, or debugging, reach out to **Eric
  Artzt** ([eartzt2@cocc.edu](mailto:eartzt2@cocc.edu)) to schedule a 1:1 consultation.

For details on submitting this week's first milestone, refer to
[Final Project Milestone 1: Project Proposal](week4-assignment-project-proposal.md).
