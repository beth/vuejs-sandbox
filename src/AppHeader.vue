<template>
  <header>
    <h1>Dan and Beth's Hacker News</h1>
    <button v-on:click="getStories('topstories')">Top</button>
    <button v-on:click="getStories('newstories')">New</button>
    <button v-on:click="getStories('beststories')">Best</button>  
    <input v-model="search" v-on:input="filterStories(search)"></input>
  </header>
</template>

<script>
export default {
  data: function() {
    return {
      search: this.filterTerm,
    }
  },
  props: ['getStories', 'filterStories', 'filterTerm'],
}
</script>
