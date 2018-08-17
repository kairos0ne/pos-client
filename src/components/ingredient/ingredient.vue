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
            <el-tabs v-model="activeName">
              <el-tab-pane label="General" name="first">
                  <ingredientRead></ingredientRead>
                  <div class="spacer"></div>
                  <el-popover
                  ref="popover5"
                  placement="top"
                  width="160"
                  v-model="visible">
                  <p>Are you sure you want to delete this category?</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
                    <el-button type="primary" size="mini" @click.prevent="deleteIngredient()">confirm</el-button>
                  </div>
                </el-popover>
                <el-button v-popover:popover5>Delete</el-button>
              </el-tab-pane>
              <el-tab-pane label="Settings" name="second">
                  <ingredientUpdate ></ingredientUpdate>
              </el-tab-pane>
              <!-- <el-tab-pane label="Add Category" name="third">
                  <categoryCreate></categoryCreate>
              </el-tab-pane> -->
            </el-tabs>
          </el-col>
        </el-row>
      </el-row>
</template>
<script>
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'
import ingredientRead from './ingredient_read.vue'
import ingredientCreate from './ingredient_create.vue'
import ingredientUpdate from './ingredient_update.vue'
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      crudState: '',
      buttons: true,
      create: false,
      read: true,
      update: false,
      delete: false,
      visible: false,
      activeName: 'first'
    }
  },
  components: {
    sidemenu,
    mainmenu,
    ingredientRead,
    ingredientCreate,
    ingredientUpdate
  },
  created () {
    EventBus.$on('specialEvent', event => {
      this.activeName = 'first'
    })
  },
  computed: {
    ingredientId () {
      return this.$route.params.ingredientId
    },
    inventoryId () {
      return this.$route.params.inventoryId
    },
    categoryId () {
      return this.$route.params.categoryId
    }
  },
  methods: {
    deleteIngredient (ingredientId) {
      HTTP.delete('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients/' + this.ingredientId)
        .then(response => {
          this.category = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
      this.$router.push('/')
    },
    addInventory () {
      EventBus.$emit('createInventory', this.category)
      this.$router.push('/categories/' + this.categoryId + '/inventories')
    }
  }
}
</script>
