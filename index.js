Vue.component('app-header', {
  template: `
    <header>
      <h1>Dan and Beth\'s Hacker News</h1>
      <button v-on:click="getStories('topstories')">Top</button>
      <button v-on:click="getStories('newstories')">New</button>
      <button v-on:click="getStories('beststories')">Best</button>  
      <input v-model="search" v-on:input="filterStories(search)"></input>
    </header>
  `, 
  props: ['getStories', 'filterStories', 'filterTerm'],
  data: function() {
    return {
      search: this.filterTerm,
    }
  }
});

Vue.component('story-list', {
  template: `
    <div>
      <story 
        v-for="story in stories"
        v-bind:story="story">
      </story>
    </div>
  `,
  props: ['stories'] 
});

Vue.component('story', {
  template: `
    <div>
      {{ story.title }} by {{ story.author }}
    </div>
  `,
  props: ['story']
});

const app = new Vue({
  el: '#app',
  template: `
    <div>
      <app-header 
        v-bind:get-stories="getStories"
        v-bind:filter-stories="filterStories"
        v-bind:filter-term="filterTerm"
      ></app-header>
      <story-list v-bind:stories="displayedStories"></story-list>
    </div>
  `,
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
  },
  data: {
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
});

