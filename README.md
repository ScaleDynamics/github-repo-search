# GitHub Repo Search 🔍

Search on GitHub the most starred repositories that use JavaScript and TypeScript, and add the weekly download counts for each package from npmjs.org

## Try it

👉 See [live demo](https://warpjs-ctweqxljao20sm7xt3mbv7vst.storage.googleapis.com/index.html)

![screenshot](https://user-images.githubusercontent.com/54806942/75553607-04e56680-5a39-11ea-8ed7-809a2b8accb6.png)


## Stack
 - [Vue.js](https://vuejs.org/)
 - [Axios](https://github.com/axios/axios)
 - [Webpack](https://webpack.js.org/)
 - [WarpJS](http://warpjs.com/)
 - [GitHub API](https://developer.github.com/v3/)
 - [NpmJS API](https://github.com/npm/registry/blob/master/docs/download-counts.md)

## Setup

### Install

```bash
$ git clone https://github.com/WarpJS/github-repo-search.git
$ cd github-repo-search
$ npm install
```

### Config

#### GitHub API Token

- Generate a new token:
  - Go to https://github.com/settings/tokens/new
  - Check only scope `public_repo`
  - Generate token

- Save your token:
  - open the `src/api.js` file 
  - replace the `'YOUR_API_TOKEN'` with yours

#### WarpJS

- Open an account on [starbase.warpjs.com](https://starbase.warpjs.com) to get access to WarpJS
- Get your `User ID` and a `Project name` ("demo" by default) from the [WarpJS Console](https://starbase.warpjs.com)
- Rename the `.env.example` file to `.env` and copy your keys inside it

## Run

```bash
# run on localhost
$ npm start

# build and deploy to production
$ npm run build
$ npm run deploy
```
 
## License

Copyright 2020 ScaleDynamics SAS. All rights reserved.  
Licensed under the MIT license.
