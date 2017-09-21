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
  props: ['stories']
}
</script>