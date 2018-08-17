<template>
    <el-row>
        <el-row>
          <el-col :span="24">
            <div class="grid-content">
            <mainmenu></mainmenu>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content ">
              <sidemenu></sidemenu>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content ">
                <el-row class="form-wrapper">
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
                </el-row>
            </div>
          </el-col>
        </el-row>
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
        base_price: 0,
        category_id: this.$route.params.categoryId
      },
      inventory: {
      },
      categoryId: this.$route.params.categoryId,
      inventoryId: this.$route.params.inventoryId
    }
  },
  components: {
    mainmenu,
    sidemenu
  },
  methods: {
    postInventory () {
      HTTP.post('categories/' + this.$route.params.categoryId + '/inventories', this.form)
        .then(response => {
          this.inventory = response.data
          let crud = 'read'
          this.$store.dispatch('setInventoryCrud', crud)
          EventBus.$emit('specialEvent', this.inventory)
          this.$router.push('/categories/' + this.categoryId + '/inventories/' + this.inventory.id)
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
<style>
  .form-wrapper {
    margin: 20px;
  }
</style>
