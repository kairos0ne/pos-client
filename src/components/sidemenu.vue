<template>
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose">
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <router-link to="/organisation"><span>Organisation</span></router-link>
    </el-menu-item>
    <el-menu-item index="2" >
      <i class="el-icon-document"></i>
      <span>Orders</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-setting"></i>
      <span>Settings</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    }
  }
}
</script>
<style>
.el-menu {
  font-family: 'Amiko', sans-serif;
}
.shop-icon {
  margin: 5px 5px 5px 0px;
}
</style>
