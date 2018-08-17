<template>
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="Name">
        <el-input v-model="category.name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="category.description"></el-input>
      </el-form-item>
      <el-form-item label="Icon Path">
        <el-input v-model="category.icon_path"></el-input>
      </el-form-item>
      <el-form-item label="Image Path">
        <el-input v-model="category.photo_path"></el-input>
      </el-form-item>
      <el-button @click.prevent="postCategory()">Save</el-button>
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
        description: '',
        icon_path: '',
        photo_path: ''
      },
      categoryId: this.$route.params.categoryId,
      category: {
      }
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
  },
  methods: {
    postCategory () {
      HTTP.put('categories/' + this.category.id, this.category)
        .then(response => {
          this.category = response.data
          let crud = 'read'
          this.$store.dispatch('setCategoryCrud', crud)
          EventBus.$emit('updateCategory', this.category)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
