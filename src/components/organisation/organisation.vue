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
                <el-card class="box-card">
                    <h3>{{ organisation.name }}</h3>
                    <p class="description">{{ organisation.description }}</p>
                    <p class="address">{{ organisation.address }}</p>
                  <div class="api-lable">API KEY</div>
                  <div class="api-key">{{ getAuthKey }}</div>
                </el-card>
            </div>
          </el-col>
        </el-row>
      </el-row>
</template>
<script>
import {HTTP} from '../../http-common.js'
import sidemenu from '../sidemenu.vue'
import mainmenu from '../mainmenu.vue'

export default {
  data () {
    return {
      organisation: {}
    }
  },
  created () {
  },
  mounted () {
    HTTP.get('organisations/' + this.getOrgId)
      .then(response => {
        this.organisation = response.data
      })
      .catch(e => {
        this.errors.push(e)
      })
  },
  computed: {
    getOrgId () {
      return sessionStorage.getItem('Organisation ID')
    },
    getAuthKey () {
      return sessionStorage.getItem('Authorisation')
    }
  },
  components: {
    sidemenu,
    mainmenu
  }
}
</script>
<style>
    .box-card {
      width: 100%;
    }
    .api-key {
      background-color: lightgrey;
      padding: 10px;
      color: white;
      margin-left: 18px;
    }
    .api-lable {
      margin-left: 20px;
      margin-bottom: 10px;
    }
    .description {
      margin-left: 20px;
    }
    .address {
      margin-left: 20px;
    }

</style>
