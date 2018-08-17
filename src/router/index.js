import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/components/base'
import Login from '@/components/login'
import Category from '@/components/category/category'
import Inventory from '@/components/inventory/inventory'
import Ingredient from '@/components/ingredient/ingredient'
import InventoryCreate from '@/components/inventory/inventory_create'
import IngredientCreate from '@/components/ingredient/ingredient_create'
import Organisation from '@/components/organisation/organisation'
import Info from '@/components/info'
import Order from '@/components/order/order'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'base',
      component: Base
    },
    {
      path: '/organisation',
      name: 'organisation',
      component: Organisation
    },
    {
      path: '/info',
      name: 'info',
      component: Info
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/categories/:categoryId',
      name: 'category',
      component: Category,
      props: true
    },
    {
      path: '/categories/:categoryId/inventories/:inventoryId',
      name: 'inventory',
      component: Inventory,
      props: true
    },
    {
      path: '/categories/:categoryId/inventories-create',
      name: 'inventory-create',
      component: InventoryCreate,
      props: true
    },
    {
      path: '/categories/:categoryId/inventories/:inventoryId/ingredients/:ingredientId',
      name: 'ingredient',
      component: Ingredient,
      props: true
    },
    {
      path: '/categories/:categoryId/inventories/:inventoryId/ingredients-create',
      name: 'ingredient-create',
      component: IngredientCreate,
      props: true
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      props: true
    }
  ]
})
