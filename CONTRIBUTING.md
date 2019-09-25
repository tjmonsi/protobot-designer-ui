# Contributing to base-js-template

Please take a moment to review this document in order to make the contribution
process easy and effective for everyone involved.

Following these guidelines helps to communicate that you respect the time of
the developers managing and developing this open source project. In return,
they should reciprocate that respect in addressing your issue or assessing
patches and features.


## Using the issue tracker

The issue tracker is the preferred channel for [bug reports](#bug-reports),
[features requests](#feature-requests) and [submitting pull
requests](#pull-requests), but please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests (use
  [Stack Overflow](http://stackoverflow.com) or IRC).

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.


## Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. **Use the GitHub issue search** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` or development branch in the repository.

3. **Isolate the problem** &mdash; create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a live example.

A good bug report shouldn't leave others needing to chase you up for more
information. Please try to be as detailed as possible in your report. What is
your environment? What steps will reproduce the issue? What browser(s) and OS
experience the problem? What would you expect to be the outcome? All these
details will help people to fix any potential bugs.

Example:

```
The `paper-foo` element causes the page to turn pink when clicked.

## Expected outcome

The page stays the same color.

## Actual outcome

The page turns pink.

## Steps to reproduce

1. Put a `paper-foo` element in the page.
2. Open the page in a web browser.
3. Click the `paper-foo` element.
```

If it is possible, **please provide a reduced test case that demonstrates the problem**.


## Feature requests

Feature requests are welcome. But take a moment to find out whether your idea
fits with the scope and aims of the project. It's up to *you* to make a strong
case to convince the project's developers of the merits of this feature. Please
provide as much detail and context as possible.

If you still want to file an issue to request a feature, please provide a clear description of the feature. It can be helpful to describe answers to the following questions:

1. Who will use the feature? *“As someone filling out a form…”*
2. When will they use the feature? *“When I enter an invalid value…”*
3. What is the user’s goal? *“I want to be visually notified that the value needs to be corrected…”*


## Pull requests

Good pull requests - patches, improvements, new features - are a fantastic
help. They should remain focused in scope and avoid containing unrelated
commits.

**Please ask first** before embarking on any significant pull request (e.g.
implementing features, refactoring code, porting to a different language),
otherwise you risk spending a lot of time working on something that the
project's developers might not want to merge into the project.

Please adhere to the coding conventions used throughout a project (indentation,
accurate comments, etc.) and any other requirements (such as test coverage).

When submitting pull requests, please provide:

1. **A reference to the corresponding issue** or issues that will be closed by the pull request. Please refer to these issues in the pull request description using the following syntax:
```
(For a single issue)
Fixes #20

(For multiple issues)
Fixes #32, fixes #40
```

2. **A succinct description of the design** used to fix any related issues. For example:
```
This fixes #20 by removing styles that leaked which would cause the page to turn pink whenever `paper-foo` is clicked.
```

3. **At least one test for each bug fixed or feature added as part of the pull request.** We will still consider approving your pull request but if you can add a test, please add them :)

To contribute your work:

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/<project-name> %>
   # Navigate to the newly cloned directory
   cd <project-name>
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/<your-username>/<project-name> %>
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout <dev-branch>
   git pull upstream <dev-branch>
   ```

3. Create a new topic branch (off the main project development branch) to
   contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream development branch into your topic branch:

   ```bash
   git pull [--rebase] upstream <dev-branch>
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description.

## Contributing Rules (for Frontend)

Adding an additional npm package without a clear detail on why it should be added
and the byte impact it would add will be disapproved immediately.

I know this is not inherent in the docs (and I think I now have to add that)
but I am focusing on making this a performant module. Adding packages at whim is
an anti-pattern and I discourage the use of extra libraries without a clear
reason WHY it should be part of this module.

## Conventions of commit messages

We follow the convention written at https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines when writing commits.

Here is an example of the release type that will be done based on a commit messages (from https://github.com/semantic-release/semantic-release):

| Commit message                                                                                                                                                                                   | Release type               |
|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

To help us, we have Commitizen. We do this by doing this steps: Stage files then Commit using Commitizen

### Staging

Pick files to be staged using the side bar Source Control view

### Commit

Commit either using the Commitizen Control Panel via the Command Pallete (shift + command + P) and then answer the following information.
Or run `npm run commit` on your vagrant machine.

To help you answer, see the following rules

#### Type

Must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing or correcting existing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope (Optional)

The scope could be anything specifying place of the commit change. For example a filename, or component name, or page name, etc...

You can use * when the change affects more than a single scope.

#### Body

The body of commit has two parts: the action, and the description. It should in imperative tense form

##### Action

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter

##### Description

- should complete the sentence started by the action
- no dot (.) at the end

#### Longer Description (Footer - Optional)

This is where you should add more information. This should include more information on the motivation of the change stated in the Body.
Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

Commitizen will help in adding Breaking Changes or if it is connected to an issue number.

### Push

Push when ready.
