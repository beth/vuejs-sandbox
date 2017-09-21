<template>
  <div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import AppHeader from './AppHeader.vue'
import StoryList from './StoryList.vue'

const routes = [ 
  { path: '/newest' , component: StoryList, props: {storyType: 'newstories'} },
  { path: '/best' , component: StoryList, props: {storyType: 'beststories'} },
  { path: '/top' , component: StoryList, props: {storyType: 'topstories'} }
]

export default {
  router: new VueRouter({ routes }),
  components: {
    'app-header': AppHeader
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
  padding: 0px 5px;
}

.router-link-active {
  background-color: #42b983;
  color: white;
  border-radius: 5px;
}
</style>
