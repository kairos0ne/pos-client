<template>
  <div class="grid-content ">
      <h1>{{ inventory.name }}</h1>
      <h3>{{ inventory.description }}</h3>
      <el-button v-on:click="placeOrder(inventory)" class="test" type="primary">Order</el-button>
      <el-card  v-for="ingredient in ingredients" :key="ingredient.id" class="box-card">
          <router-link :to="{ name: 'ingredient', params: { inventoryId: inventory.id, categoryId: category.id, ingredientId: ingredient.id } }"><div>{{ ingredient.name }}</div></router-link>
      </el-card>
  </div>
</template>
<script>
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'

export default {
  data () {
    return {
      category: {
      },
      inventory: {
      },
      ingredients: {
      }
    }
  },
  components: {
    sidemenu,
    mainmenu
  },
  computed: {
    inventoryId () {
      return this.$route.params.inventoryId
    },
    categoryId () {
      return this.$route.params.categoryId
    }
  },
  created () {
    EventBus.$on('specialEvent', event => {
      this.inventory = event
    })
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
    HTTP.get('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients')
      .then(response => {
        this.ingredients = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    placeOrder (event) {
      this.$store.dispatch('setOrder', event)
    }
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
