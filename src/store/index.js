import Vue from 'vue'
import Vuex from 'vuex'
import * as localForage from 'localforage'

import * as types from './mutation-types'
import UniversalStorage from '../lib/storage'

Vue.prototype.$db = {
  ordersCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'orders'
  })),

  categoriesCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'categories'
  })),

  attributesCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'attributes'
  })),

  cartsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'carts'
  })),

  elasticCacheCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'elasticCache'
  })),

  productsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'products'
  })),

  claimsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'claims'
  })),

  wishlistCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'wishlist'
  })),

  compareCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'compare'
  })),

  usersCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'user'
  })),

  syncTaskCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'syncTasks'
  })),

  checkoutFieldsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'checkoutFieldValues'
  })),
  styleOptionsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'options'
  }))
}

global.db = Vue.prototype.$db // localForage instance

import order from './modules/order'
import product from './modules/product'
import category from './modules/category'
import attribute from './modules/attribute'
import cart from './modules/cart'
import wishlist from './modules/wishlist'
import compare from './modules/compare'
import user from './modules/user'
import payment from './modules/payment'
import shipping from './modules/shipping'
import meta from './modules/meta'
import ui from './modules/ui-store'
import checkout from './modules/checkout'
import homepage from './modules/homepage'
import stock from './modules/stock'
import tax from './modules/tax'
import social from './modules/social-tiles'
import claims from './modules/claims'
import sync from './modules/sync'
import options from './modules/options'

Vue.use(Vuex)

const state = {
}

const mutations = {
  TOPICS_LIST: (state, topics) => {
    state.topics = topics
  },

  INCREMENT: (state) => {
    state.count++
  },

  DECREMENT: (state) => {
    state.count--
  }
}

const plugins = [
  store => {
    store.subscribe((mutation, store) => {
      if (mutation.type.indexOf(types.SN_CART) === 0) { // check if this mutation is cart related
        global.db.cartsCollection.setItem('current-cart', store.cart.cartItems).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (mutation.type.indexOf(types.SN_WISHLIST) === 0) { // check if this mutation is wishlist related
        global.db.wishlistCollection.setItem('current-wishlist', store.wishlist.itemsWishlist).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (mutation.type.indexOf(types.SN_COMPARE) === 0) { // check if this mutation is compare related
        global.db.compareCollection.setItem('current-compare', store.compare.itemsCompare).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (mutation.type.indexOf(types.SN_USER) === 0) { // check if this mutation is cart related
        global.db.usersCollection.setItem('current-user', store.user.current).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
        global.db.usersCollection.setItem('current-token', store.user.token).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (mutation.type.indexOf(types.SN_CHECKOUT) === 0) {
        if (mutation.type.indexOf(types.CHECKOUT_SAVE_PERSONAL_DETAILS) > 0) {
          global.db.checkoutFieldsCollection.setItem('personal-details', store.checkout.personalDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        } else if (mutation.type.indexOf(types.CHECKOUT_SAVE_SHIPPING_DETAILS) > 0) {
          global.db.checkoutFieldsCollection.setItem('shipping-details', store.checkout.shippingDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        }
      }
    })
  }
]

export default new Vuex.Store({
  modules: {
    order,
    product,
    category,
    attribute,
    cart,
    wishlist,
    compare,
    user,
    payment,
    shipping,
    meta,
    ui,
    homepage,
    social,
    stock,
    checkout,
    tax,
    claims,
    sync,
    options
  },
  state,
  mutations,
  plugins
})
