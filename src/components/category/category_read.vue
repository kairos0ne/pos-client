<template>
  <div class="grid-content ">
      <h1>{{ category.name }}</h1>
      <el-card  v-for="inventory in inventories" :key="inventory.id" class="box-card">
          <router-link :to="{ name: 'inventory', params: { inventoryId: inventory.id, categoryId: category.id } }"><div>{{ inventory.name }}</div></router-link>
      </el-card>
  </div>
</template>
<script>
import {HTTP} from '../../http-common.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      category: {
      },
      inventories: {
      },
      categoryId: this.$route.params.categoryId
    }
  },
  components: {
    sidemenu,
    mainmenu
  },
  mounted () {
    HTTP.get('categories/' + this.categoryId)
      .then(response => {
        this.category = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    HTTP.get('categories/' + this.categoryId + '/' + 'inventories')
      .then(response => {
        this.inventories = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
    EventBus.$on('updateCategory', event => {
      this.category = event
    })
  },
  methods: {
  }
}
</script>
<style scoped>
h1 {
  font-family: 'Amiko', sans-serif;
  margin: 20px;
}
</style>
