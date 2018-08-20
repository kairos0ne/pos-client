<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"> <router-link to="/">Home</router-link></el-menu-item>
        <el-submenu index="2">
          <template slot="title">Admin</template>
          <el-menu-item index="2-1">item one</el-menu-item>
          <el-menu-item index="2-2">item two</el-menu-item>
          <el-menu-item index="2-3">item three</el-menu-item>
        </el-submenu>
      <el-menu-item index="3"><router-link to="/info">Info</router-link> </el-menu-item>
      <el-menu-item index="4" size="small"><router-link to="/order">Orders</router-link></el-menu-item >
      </el-menu>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      orderNumber: null
    }
  },
  computed: {
    getOrder () {
      return this.$store.getters.getOrder
    }
  },
  updated () {
  },
  mounted () {
  },
  methods: {
    handleSelect (key, keyPath) {
    }
  }
}
</script>
<style>
.el-menu {
  font-family: 'Amiko', sans-serif;
}
.item {
  margin-top: 3px;
  margin-right: 40px;
}
</style>
