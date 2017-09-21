<template>
  <div>
    <app-header 
      v-bind:get-stories="getStories"
      v-bind:filter-stories="filterStories"
      v-bind:filter-term="filterTerm"
    ></app-header>
    <story-list v-bind:stories="displayedStories"></story-list>
  </div>
</template>

<script>
import AppHeader from './AppHeader.vue'
import StoryList from './StoryList.vue'

export default {
  components: {
    'app-header': AppHeader,
    'story-list': StoryList,
  },
  data: function() {
    return {
      storyType: '',
      filterTerm: '',
      displayedStories: [],
      dataStories: [
        {
          title: 'Hi Dan',
          points: 10,
          author: 'Daniel Thareja'
        },
        {
          title: 'Hi Beth',
          points: 100,
          author: 'Beth Johnson'
        },
        {
          title: 'Hello World',
          points: 2,
          author: 'author'
        }
      ]      
    }
  },
  methods: {
    getStories(type) {
      if (this.storyType === type) {
        return
      }
      fetch(`https://hacker-news.firebaseio.com/v0/${type}.json`)
      .then((res) => res.json())
      .then((ids) => Promise.all(
        ids.slice(0, 20).map(id => 
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.json())
        )
      ))
      .then(stories => {
        this.dataStories = stories
          .filter(story => story)
          .map(story => ({ id: story.id, author: story.by, points: story.score, title: story.title }))
        this.storyType = type
        this.filterStories(this.filterTerm)
      })
      .catch(err => console.error(err));
    },
    filterStories(term) {
      this.filterTerm = term;
      this.displayedStories = this.dataStories.filter(story => story.title.toLowerCase().includes(term.toLowerCase()))
    },
  },
  mounted: function () {
    this.getStories('topstories')
  }
}
</script>

<style>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
