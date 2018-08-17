<template>
    <el-form :label-position="labelPosition" label-width="100px" :model="form">
      <el-form-item label="Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="Base Price">
        <el-input v-model="form.base_price"></el-input>
      </el-form-item>
      <el-button @click.prevent="postInventory()">Save</el-button>
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
        base_price: 0.00
      },
      inventory: {
      }
    }
  },
  computed: {
    inventoryId () {
      return this.$route.params.inventoryId
    },
    categoryId () {
      return this.$route.params.categoryId
    }
  },
  mounted () {
    HTTP.get('categories/' + this.categoryId + '/inventories/' + this.inventoryId)
      .then(response => {
        this.inventory = response.data
        this.form.name = this.inventory.name
        this.form.description = this.inventory.description
        this.form.base_price = this.inventory.base_price
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  methods: {
    postInventory () {
      HTTP.put('categories/' + this.categoryId + '/inventories/' + this.inventoryId, this.form)
        .then(response => {
          this.inventory = response.data
          EventBus.$emit('specialEvent', this.inventory)
        })
        .catch(e => {
          this.errors.push(e)
        })
      let crud = 'read'
      this.$store.dispatch('setCategoryCrud', crud)
    }
  }
}
</script>
