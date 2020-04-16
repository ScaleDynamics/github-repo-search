/*
 * Copyright 2020 ScaleDynamics SAS. All rights reserved.
 * Licensed under the MIT license.
 */

'use strict';

const axios = require('axios');

// GitHub auth token
const GITHUB_ACCESS_TOKEN = 'YOUR_API_TOKEN';

// Result limit by search
const LIMIT_PER_PAGE = 10;

/**
 * Search repositories
 *
 * @param {string} query
 * @param {number} page
 */
const search = async (query, page = 1) => {
  // search the most starred JavaScript or TypeScript repositories on GitHub API
  const uri = `https://api.github.com/search/repositories?q=${query}+language:javascript+language:typescript&sort=stars&order=desc&page=${page}&per_page=${LIMIT_PER_PAGE}`;
  const headers = {
    headers: {
      Authorization: `token ${GITHUB_ACCESS_TOKEN}`
    }
  };
  const { repositories, total, error } = await axios
    .get(uri, headers)
    .then(({ data }) => ({
      repositories: data.items,
      total: data.total_count
    }))
    .catch(error => {
      console.error(`[GitHub API] ${error}`, error.response.data);
      return {
        error: `Error on GitHub API (${error.response.data.message})`
      };
    });

  // exit on github API error
  if (error) {
    return { error };
  }

  // find package download counts on npmjs.org
  await Promise.all(
    repositories.map(async repo => {
      try {
        // get npm name from package.json
        const { data: packageJson } = await axios.get(
          `https://raw.githubusercontent.com/${repo.full_name}/${repo.default_branch}/package.json`
        );

        // npm package not found or private
        if (!packageJson.name || packageJson.private) {
          return;
        }

        // get download stats from npm API
        repo.downloads = await axios
          .get(`https://api.npmjs.org/downloads/point/last-week/${packageJson.name}`)
          .then(({ data }) => data.downloads);

        // set npm link
        repo.npmjs_url = `https://www.npmjs.com/package/${packageJson.name}`;
      } catch (error) {
        // npm package not found
      }
    })
  );

  return {
    total,
    repositories:
      // keep only useful data
      repositories.map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        archived: repo.archived,
        html_url: repo.html_url,
        description: repo.description,
        watchers: repo.watchers,
        language: repo.language,
        pushed_at: repo.pushed_at,
        license: repo.license && repo.license.name,
        npmjs_url: repo.npmjs_url,
        downloads: repo.downloads
      }))
  };
};

module.exports = { search };
