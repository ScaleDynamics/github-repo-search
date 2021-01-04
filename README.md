# GitHub Repo Search 🔍

Search on GitHub the most starred repositories that use JavaScript and TypeScript, and add the weekly download counts for each package from npmjs.org

## Try it

👉 See [live demo](https://github-repo-search.scaledynamics.site/)

![screenshot](https://user-images.githubusercontent.com/54806942/75553607-04e56680-5a39-11ea-8ed7-809a2b8accb6.png)

## Stack

- [Vue.js](https://vuejs.org/)
- [Axios](https://github.com/axios/axios)
- [Webpack](https://webpack.js.org/)
- [WarpJS SDK](https://scaledynamics.com/product)
- [GitHub API](https://developer.github.com/v3/)
- [NpmJS API](https://github.com/npm/registry/blob/master/docs/download-counts.md)

## Setup

### Install

```bash
$ git clone https://github.com/ScaleDynamics/github-repo-search.git
$ cd github-repo-search
$ npm install
```

### Login to ScaleDynamics

Run the following command once to authenticate to your [ScaleDynamics account](https://console.scaledynamics.com/) with the [WarpJS CLI](https://docs.scaledynamics.com/docs/api/cli):

```bash
$ npx warp login
```

### Configure your GitHub API token

Generate a new token:
  - go to https://github.com/settings/tokens/new
  - enable at least the `public_repo` scope
  - generate token

Save your token:
  - open the `api/index.js` file
  - replace the `'YOUR_API_TOKEN'` with yours

## Run

```bash
# run on localhost
$ npm run dev

# build and deploy to production
$ npm run build
$ npm run deploy
```

## License

Copyright 2020 ScaleDynamics SAS. All rights reserved.  
Licensed under the MIT license.
