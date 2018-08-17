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
            TEST
        </div>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import sidemenu from './sidemenu.vue'
import mainmenu from './mainmenu.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    sidemenu,
    mainmenu
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>
<style>
</style>
