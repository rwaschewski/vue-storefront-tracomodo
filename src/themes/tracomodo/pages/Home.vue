<template>
  <div id="home">
  <main-slider />
  
  <section class="container">
    <div>
      <header class="col-md-12 pt40">
        <h2 class="align-center">Neuheiten</h2>
      </header>
    </div>
    <div class="col-md-9 pt20 products-list">
      <!--<div v-if="isProductListEmpty">
          Keine passenden Produkte gefunden!
      </div>-->
      <!-- <product-listing columns="3" :products="everythingNewCollection" /> -->
    </div>
    <div class="row center-xs">
      <!-- <div v-for='(product, key) in everythingNewCollection' v-bind:key='product.id' class="col-md-3">
        <product-tile :instant='key < 4 ? true : false' :product="product"/>
      </div> -->
      
      <!-- <product-collection></product-collection> -->
    </div>
  </section>

  <!--<collection title="New Luma Yoga Collection" coverImage="/assets/collection.jpg" category="Women"></collection>-->

  <!-- <section class="container pb60">
    <div class="row center-xs">
      <header class="col-md-12 pt40">
        <h2 class="align-center">Inspirationen für Sie</h2>
      </header>
    </div>
    <tile-links />
  </section> -->
  <Onboard/>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'
import builder from 'bodybuilder'

// Base components overwrite
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'
import ProductListing from '../components/core/ProductListing.vue'
import TileLinks from '../components/theme/blocks/TileLinks/TileLinks.vue'
import Collection from '../components/theme/blocks/Collection/Collection'
import Onboard from '../components/theme/blocks/Home/Onboard.vue'

export default {
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  computed: {
    categories () {
      return this.$store.state.category.list
    },
    everythingNewCollection () {
      return this.$store.state.product.list
    },
    coolBagsCollection () {
      return this.$store.state.homepage.coolbags_collection
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Home ' + new Date())
      let newProductsQuery = builder().query('match', 'category.name', 'Tees').build()
      let coolBagsQuery = builder().query('match', 'category.name', 'Women').build()
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(function (res) {
          if (res) {
            store.state.homepage.new_collection = res.items
          }

          store.dispatch('product/list', {
            query: coolBagsQuery,
            size: 4,
            sort: 'created_at:desc'
          }).then(function (res) {
            if (res) {
              store.state.homepage.coolbags_collection = res.items
            }
            return resolve()
          })
        })
      })
    })
  },
  components: {
    ProductTile,
    MainSlider,
    TileLinks,
    Collection,
    Onboard,
    ProductListing
  },
  mixins: [corePage('Home')]
}
</script>

<style lang="scss" scoped>
  .cool-stuff-collection {
    mix-blend-mode: darken;
  }
</style>
