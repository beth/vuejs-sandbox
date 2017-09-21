<template>
  <div>
    {{ story.title }} by {{ story.author }}
  </div>
</template>

<script>
  export default {
    props: ['story']
  }
</script>