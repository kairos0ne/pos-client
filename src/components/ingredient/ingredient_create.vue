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
                      <el-button @click.prevent="postIngredient()">Save</el-button>
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
        inventory_id: this.$route.params.inventoryId
      },
      ingredient: {
      }
    }
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
  components: {
    mainmenu,
    sidemenu
  },
  methods: {
    postIngredient () {
      HTTP.post('categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients', this.form)
        .then(response => {
          this.ingredient = response.data
          EventBus.$emit('specialEvent', this.ingredient)
          this.$router.push('/categories/' + this.categoryId + '/inventories/' + this.inventoryId + '/ingredients/' + this.ingredient.id)
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
