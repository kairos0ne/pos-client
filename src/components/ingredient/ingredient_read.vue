<template>
    <div class="grid-content ">
        <h1>{{ ingredient.name }}</h1>
        <h3>{{ ingredient.description }}</h3>
    </div>
  </template>
<script>
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      category: {
      },
      inventory: {
      },
      ingredient: {
      }
    }
  },
  components: {
  },
  computed: {
    inventoryId () {
      return this.$route.params.inventoryId
    },
    categoryId () {
      return this.$route.params.categoryId
    },
    ingredientId () {
      return this.$route.params.ingredientId
    }
  },
  mounted () {
    HTTP.get('categories/' + this.categoryId)
      .then(response => {
        this.category = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    HTTP.get('categories/' + this.categoryId + '/inventories/' + this.inventoryId)
      .then(response => {
        this.inventory = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    HTTP.get('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients/' + this.ingredientId)
      .then(response => {
        this.ingredient = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    EventBus.$on('specialEvent', event => {
      this.ingredient = event
    })
  },
  methods: {
  }
}
</script>
<style >
h1 {
  font-family: 'Amiko', sans-serif;
  margin: 20px;
}
h3 {
  font-family: 'Amiko', sans-serif;
  margin: 20px;
}
</style>
