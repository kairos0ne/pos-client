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
              <h2>Order Details</h2>
              <el-card   v-for="order in order" :key="order.id" class="box-card">
                  {{ order.name }}
                  {{ order.base_price }}
                  <el-button @click.prevent="deleteItem">delete</el-button>
              </el-card>
              <el-button @click.prevent="saveOrder(order)" v-if="orderEmpty == true"  type="primary">Save Order</el-button>
              <p class="no-items" v-if="orderEmpty == false">There is currently nothing in your order</p>
            </div>
          </el-col>
        </el-row>
      </el-row>
  </template>
<script>
import {HTTP} from '../../http-common.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'
// import { EventBus } from '../../event-bus.js'

export default {
  data () {
    return {
      order: [],
      total: null,
      orderEmpty: true
    }
  },
  components: {
    sidemenu,
    mainmenu
  },
  computed: {
    getOrder () {
      return this.$store.getters.getOrder
    }
  },
  created () {
  },
  computed: {
    getOrgId () {
      return sessionStorage.getItem('Organisation ID')
    },
    getAuthKey () {
      return sessionStorage.getItem('Authorisation')
    }
  },
  updated () {
    const order = this.order
    if (order.length < 1 || order === undefined) {
      this.orderEmpty = false
    } else {
      this.orderEmpty = true
    }
  },
  mounted () {
    this.order = this.getOrder
  },
  methods: {
    deleteItem (order) {
      var index = this.order.indexOf(order)
      this.order.splice(index, 1)
    },
    saveOrder (order) {
      HTTP.post('organisation/' + this.getOrgId + '/tables/' + this.tableId + '/orders', this.order)
        .then(response => {
          this.order = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>
<style>
  h2 {
    margin-left: 20px;
  }
  .no-items {
    margin-left: 20px;
  }
</style>
