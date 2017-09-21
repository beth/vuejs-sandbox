## Teacher notes

## confusion points
confusion points are best uncovered by a beginner, answers are best covered by a more experienced person

- difference between Vue.component and new Vue()?
- some curriculum that bridges the gap between basic vue (the first thing we did) and the vue cli for basic webpack
  - converting index.html and index.js to a .vue file
  - what is the render method? why do we need this!
  - explanation of the basic webpack things and what they do, and what would happen if they weren't there
- why could we use a plain object as data when passing it to the Vue constructor, but not when we importing it from App.vue
  A: If data is an object, the same object reference is shared by multiple instances of a component. There is only one instance of the root component (using new Vue), so it's safe to use an object. (source: https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function)

## vue-loader

vue-loader is responsible for parsing a ".vue" file into a Vue component options object. In addition to what is exported by the script tag in the file, the loader adds a few magical properties that we're still unsure about. Beth really wants to know more about them

vue-loader docs can be found here: https://vue-loader.vuejs.org/en

## render 

render: takes a createElement function (provided by vue internals) and returns a VNode
hopefully - createElement is invoked with the vue options object and returns a VNode
example render function - (createElement) => createElement(vueOptionsObject)

Vue.component('app', {
  render: h => h('div', [
    h('header', header),
    h('main', body),
    h('footer', footer)
  ])
})

## new Vue({})

will **entirely replace** the element found at the `el` property in the options object

## registering components

Globally register components with Vue.component(name, options). Options can be a plain javascript object, or a component imported from a ".vue" file (since that's what is returned from the vue-loader).

Locally register components by using the `components` option. This option is an object with keys of the component name, and value of the component (again, either imported from a ".vue" file or a plain javascript object)


## Routing

What does Vue.use() do??

