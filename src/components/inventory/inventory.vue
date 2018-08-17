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
              <el-tabs v-if="activeRead" v-model="activeName" >
                  <el-tab-pane label="General" name="first">
                      <inventoryRead ></inventoryRead>
                      <div class="spacer"></div>
                      <el-popover
                      ref="popover5"
                      placement="top"
                      width="160"
                      v-model="visible">
                      <p>Are you sure you want to delete this inventory?</p>
                      <div style="text-align: right; margin: 0">
                        <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
                        <el-button type="primary" size="mini" @click.prevent="deleteInventory()">confirm</el-button>
                      </div>
                    </el-popover>
                    <el-button  @click.prevent="addIngredient()">Add Ingredient</el-button>
                    <el-button v-popover:popover5>Delete</el-button>
                  </el-tab-pane>
                  <el-tab-pane label="Settings" name="second">
                      <inventoryUpdate ></inventoryUpdate>
                  </el-tab-pane>
                </el-tabs>
                <inventoryCreate v-if="activeCreate"></inventoryCreate>
          </div>
        </el-col>
      </el-row>
    </el-row>
</template>
<script>
import {HTTP} from '../../http-common.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'
import inventoryRead from './inventory_read.vue'
import inventoryCreate from './inventory_create.vue'
import inventoryUpdate from './inventory_update.vue'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      inventory: {
      },
      ingredients: {
      },
      visible: false,
      activeName: 'first',
      activeCreate: false,
      activeRead: true
    }
  },
  components: {
    sidemenu,
    mainmenu,
    inventoryRead,
    inventoryCreate,
    inventoryUpdate
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
      this.activeName = 'first'
      this.inventory = event
    })
    EventBus.$on('createInventory', event => {
      this.activeCreate = true
      this.activeRead = false
    })
  },
  mounted () {
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
    setFirst () {
      this.activeName = 'first'
    },
    deleteInventory () {
      HTTP.delete('categories/' + this.categoryId + '/inventories/' + this.inventoryId)
        .then(response => {
          this.$router.push('/categories/' + this.categoryId)
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    addIngredient () {
      EventBus.$emit('createIngredient', this.inventory)
      this.$router.push('/categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients-create')
    }
  }
}
</script>
<style >

</style>
