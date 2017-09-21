<template>
  <div>
    <story 
      v-for="story in stories"
      v-bind:story="story">
    </story>
  </div>
</template>

<script>
import Story from './Story.vue'


export default {
  components: {
    'story': Story
  },
  props: ['storyType'],
  watch: {
    storyType: 'getStories'
  },
  data() {
    return {
      stories: [
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
    getStories() {
      fetch(`https://hacker-news.firebaseio.com/v0/${this.storyType}.json`)
        .then((res) => res.json())
        .then((ids) => Promise.all(
          ids.slice(0, 20).map(id => 
            fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((res) => res.json())
          )
        ))
        .then(stories => {
          this.stories = stories
            .filter(story => story)
            .map(story => ({ id: story.id, author: story.by, points: story.score, title: story.title }))
        })
        .catch(err => console.error(err));
    }
  },
  created() {
    this.getStories()
  }
}
</script>