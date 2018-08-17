<template>
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-button @click.prevent="postIngredient()">Save</el-button>
    </el-form>
</template>
<script>
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      labelPosition: 'right',
      form: {
        name: '',
        description: ''
      },
      ingredient: {
      }
    }
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
    HTTP.get('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients/' + this.ingredientId)
      .then(response => {
        this.ingredient = response.data
        this.form.name = this.ingredient.name
        this.form.description = this.ingredient.description
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    postIngredient () {
      HTTP.put('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients/' + this.ingredientId, this.form)
        .then(response => {
          this.ingredient = response.data
          EventBus.$emit('specialEvent', this.ingredient)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
