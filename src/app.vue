<template>
  <div>
    <form class="form" v-on:submit.prevent="searchRepository()">
      <input type="search" v-model.trim="search" placeholder='search by name, i.e "proxy"' required /><!--
        --><button :disabled="loading" title="Search">
        <svg
          class=""
          height="18px"
          fill="#fff"
          version="1"
          viewBox="0 0 57 57"
          width="18px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.4 1.9C2.5 7.3-3.1 21.5 2.1 33c6.5 14.3 22.5 18.8 35.2 9.8 1.6-1.2 2.6-.4 8.6 6.1 4.2 4.7 7.2 7.2 7.9 6.7 2.3-1.4 1.2-3.6-5.3-10.5L42 38.2l2-4.3c3.9-8.6 1.5-21.5-5.1-27.6-6.5-5.9-17-7.8-24.5-4.4zm18 5.5c10.2 5.9 12.3 20.2 4.3 29.3-5.6 6.4-14.2 8.1-21.5 4.4C8.5 37.7 5 31.8 5 24.1c0-6.1 1.3-9.7 4.8-13.5 5.7-6.1 15.4-7.4 22.6-3.2z"
          ></path>
        </svg>
      </button>
    </form>
    <h2 v-if="loading">⚙️ Searching...</h2>
    <div v-else>
      <h2 v-if="!error && total !== null">{{ formatNumber(total) }} repository results</h2>
      <h2 v-if="error">
        ⚠️ Oops! Something went wrong.
      </h2>
      <h3 class="error" v-if="error">{{ error }}</h3>
      <ul class="result" v-if="repositories">
        <li v-for="(repo, index) in repositories" :key="index">
          <h3 class="title">
            <a :href="repo.html_url" target="_blank" rel="noopener">{{ repo.full_name }}</a>
            <span class="archived" v-if="repo.archived">Archived</span>
          </h3>
          <div class="description">{{ repo.description }}</div>
          <div class="details">
            <span>⭐ {{ formatNumber(repo.watchers) }}</span>
            <span v-if="repo.language === 'JavaScript'">🟡 {{ repo.language }}</span>
            <span v-if="repo.language === 'TypeScript'">🟢 {{ repo.language }}</span>
            <span v-if="repo.license && repo.license !== 'Other'">{{ repo.license }}</span>
            <span>{{ formatDate(repo.pushed_at) }}</span>
            <div v-if="repo.downloads">
              📈 {{ formatNumber(repo.downloads) }} weekly downloads on
              <a :href="repo.npmjs_url" target="_blank" rel="noopener">npmjs.org</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';

import api from 'github-repo-search-api';

export default {
  data: () => ({
    error: null,
    loading: false,
    search: null,
    repositories: null,
    total: null
  }),
  mounted() {
    // get search from query param
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('q');
    // search on load
    if (search) {
      this.search = search;
      this.searchRepository();
    }
  },
  methods: {
    searchRepository: async function() {
      // cancel on empty search
      if (!this.search.length) {
        return;
      }

      // udpate query param
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('q', this.search);
      history.pushState(null, '', window.location.pathname + '?' + searchParams.toString());

      this.clear();
      this.loading = true;

      // fetch api with warp
      const { repositories, total, error } = await api.search(this.search);

      this.error = error;
      this.repositories = repositories;
      this.total = total;
      this.loading = false;
    },
    formatDate: date => `Updated ${formatDistanceToNow(new Date(date))} ago`,
    formatNumber: number => number && number.toLocaleString('en'),
    clear: function() {
      this.error = null;
      this.loading = false;
      this.repositories = null;
      this.total = null;
    }
  }
};
</script>

<style scoped>
.form input {
  width: 70%;
  padding: 5px 15px;
  border: 1px solid #c9c9c9;
  font-size: 20px;
  line-height: 1.5;
  font-weight: lighter;
}
.form button {
  width: 60px;
  line-height: 38px;
  font-size: 20px;
  vertical-align: top;
  border: none;
  border-bottom: 1px solid #c9c9c9;
  background-color: #24292e;
}
ul {
  width: 78%;
  margin: 15px auto;
  padding: 0;
  text-align: left;
  list-style-type: '📁';
}
li {
  padding: 15px 0 15px 10px;
  border-bottom: 1px solid #eee;
}
.error {
  font-style: italic;
  color: darkred;
}
.title,
.description {
  margin: 0 0 10px;
}
.title .archived {
  margin-left: 10px;
  padding: 3px 4px;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #586069;
  vertical-align: middle;
}
.details span {
  display: inline-block;
  margin: 0 25px 10px 0;
  white-space: nowrap;
}
.details div {
  margin-bottom: 10px;
}
</style>
