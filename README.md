# A templates and functions library for custom event frontend

## When to use vmo lib?

1. The custom event business logic need to be wrapped to a function and be reused
2. Components or functions need to be save in a library that others can keep maintaining
3. Documentation and Experimental
4. Accelerated custom event development
5. Be testable and maintainable

## How to use

1. Install from github
   `yarn add https://github.com/17media/vmo-lib.git#latest`

2. Use components or hooks with vmo-frontend. See Playground folder for use case

3. copy paste whole components file in template can quickly make custom components. See Template folder

4. Use `yarn remove vmo-lib` & `yarn add https://github.com/17media/vmo-lib.git` to reinstall the library

### lib

- hooks
- components

## template

- offline
  - offlineNormal: no team pk leaderboard, only boards with transition
  - offlineTeam: team pk leaderboard without transition but every leaderboards should scroll at the same time
- online

### playground

> local testing

`yarn start`

## Document

leave comments when coding (support Markdown!) and it would generate docs automatically.

Here is [guideline](https://typedoc.org/guides/doccomments/)

Generate document

```
yarn doc
```

where config at `typedoc.json`

to confirm what options have been loaded:

```
npx typedoc --showConfig
```

## How to create components or hooks

1. create a folder or file
2. testing hooks if needed
3. use playground to create use case for vmo-frontend and e2e testing

## Release

1. checkout master branch
2. yarn build
3. git tag vX.X.X
4. git push origin vX.X.X
5. release tag on https://github.com/17media/vmo-lib/releases/new
