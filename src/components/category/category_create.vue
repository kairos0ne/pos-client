<template>
    <el-row>
        <el-form :label-position="labelPosition" label-width="100px" :model="form">
          <el-form-item label="Name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="Icon Path">
            <el-input v-model="form.icon_path"></el-input>
          </el-form-item>
          <el-form-item label="Image Path">
            <el-input v-model="form.photo_path"></el-input>
          </el-form-item>
          <el-button @click.prevent="postCategory()">Save</el-button>
        </el-form>
      </el-row>
</template>
<script>
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'

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
      category: {
      },
      categoryId: this.$route.params.categoryId
    }
  },
  components: {
    mainmenu,
    sidemenu
  },
  methods: {
    postCategory () {
      HTTP.post('categories', this.form)
        .then(response => {
          this.category = response.data
          EventBus.$emit('categoryCreate', this.category)
        })
        .catch(e => {
          this.errors.push(e)
        })
      let crud = 'read'
      this.$store.dispatch('setCategoryCrud', crud)
      this.$router.push('/')
    }
  }
}
</script>
