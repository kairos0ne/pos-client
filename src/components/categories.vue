<template>
  <div>
      <el-card v-for="category in categories" :key="category.id" class="box-card">
          <router-link :to="{ name: 'category', params: { categoryId: category.id } }">
            <div>
              <h2>{{ category.name }}</h2>
              <p>{{ category.description }}</p>
            </div>
          </router-link>
      </el-card>
  </div>
</template>
<script>
import {HTTP} from '../http-common.js'

export default {
  data () {
    return {
      categories: {
      },
      inventories: {
      }
    }
  },
  mounted () {
    HTTP.get('categories')
      .then(response => {
        this.categories = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
  }
}
</script>
<style>
.el-card {
    font-family: 'Amiko', sans-serif;
  }
</style>
