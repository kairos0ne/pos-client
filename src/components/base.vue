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
                <categories v-if="activeRead"></categories>
                <el-button class="add-cat-button" @click.prevent="addCategory()" v-if="activeRead">Add Category</el-button>
                <categoryCreate v-if="activeCreate" class="create-form"></categoryCreate>
            </div>
          </el-col>
        </el-row>
      </el-row>
</template>

<script>
import sidemenu from './sidemenu.vue'
import mainmenu from './mainmenu.vue'
import categories from './categories.vue'
import categoryCreate from './category/category_create.vue'
import { EventBus } from '../event-bus.js'

export default {
  data () {
    return {
      activeName: 'first',
      activeCreate: false,
      activeRead: true
    }
  },
  components: {
    sidemenu,
    mainmenu,
    categories,
    categoryCreate
  },
  computed: {
    authtoken () {
      return sessionStorage.getItem('Authorisation')
    }
  },
  created () {
    EventBus.$on('categoryCreate', event => {
      this.activeName = 'first'
      this.activeCreate = false
      this.activeRead = true
    })
  },
  methods: {
    addCategory () {
      this.activeCreate = true
      this.activeRead = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-family: 'Amiko', sans-serif;
}
h1 {
  font-family: 'Amiko', sans-serif;
}
.el-tabs {
  margin: 10px;
}
.create-form {
  margin: 20px;
}
.el-button {
  margin: 20px;
}
</style>
