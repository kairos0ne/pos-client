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
              <categoryRead v-if="categoryCrud === 'read'"></categoryRead>
              <div class="spacer"></div>
              <el-popover
              ref="popover5"
              placement="top"
              width="160"
              v-model="visible">
              <p>Are you sure you want to delete this category?</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">cancel</el-button>
                <el-button type="primary" size="mini" @click.prevent="deleteCategory()">confirm</el-button>
              </div>
            </el-popover>
            <el-button @click.prevent="addInventory()">Add Inventory</el-button>
            <el-button v-popover:popover5>Delete</el-button>
          </el-tab-pane>
          <el-tab-pane label="Settings" name="second">
              <categoryUpdate ></categoryUpdate>
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
import categoryRead from './category_read.vue'
import categoryCreate from './category_create.vue'
import categoryUpdate from './category_update.vue'
import {HTTP} from '../../http-common.js'
import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      crudState: '',
      buttons: true,
      categoryId: this.$route.params.categoryId,
      create: false,
      read: true,
      update: false,
      delete: false,
      visible: false,
      activeName: 'first'
    }
  },
  computed: {
    categoryCrud () {
      return this.$store.getters.getCategoryCrud
    }
  },
  components: {
    sidemenu,
    mainmenu,
    categoryRead,
    categoryCreate,
    categoryUpdate
  },
  mounted () {
    let crud = 'read'
    this.$store.dispatch('setCategoryCrud', crud)
    EventBus.$on('updateCategory', event => {
      this.create = false
      this.read = true
      this.activeName = 'first'
    })
  },
  methods: {
    editCategory () {
      let crud = 'update'
      this.$store.dispatch('setCategoryCrud', crud)
    },
    newCategory () {
      let crud = 'create'
      this.$store.dispatch('setCategoryCrud', crud)
    },
    deleteCategory (categoryId) {
      let crud = 'delete'
      this.$store.dispatch('setCategoryCrud', crud)
      HTTP.delete('categories/' + this.categoryId)
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
      this.$router.push('/categories/' + this.categoryId + '/inventories-create')
    }
  }
}
</script>
<style scoped>
  .spacer {
    margin: 20px;
  }

</style>
