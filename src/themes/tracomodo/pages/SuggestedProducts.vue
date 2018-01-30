<template>
  <div id="suggested-products" class="align-center">
    <header class="col-md-12 pt30 pl20 pr20">
      <h3 class="align-center">Die Produkte könnten zu Ihnen passen</h3>
    </header>
    <div class="stepButtons">
      <button-outline color="blue" class="button back" text="Neu" @click.native="reset" />
    </div>
    <div class="container pb60">
      <div class="row pt15 pl20 center-md">
        <div class="col-md-9 pt20 products-list">
            <!--<div v-if="isProductListEmpty">
                Keine passenden Produkte gefunden!
            </div>-->
            <product-listing columns="3" :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import ProductListing from '../components/core/ProductListing.vue'
import ButtonOutline from '../components/theme/ButtonOutline.vue'

export default {
  beforeMount () {
    this.$store.dispatch('product/fetchProducts', {
      gender: this.$store.getters['options/gender'],
      style: this.$store.getters['options/style'],
      colors: this.$store.getters['options/colors']
    })
  },
  data () {
    return {
    }
  },
  components: {
    ProductListing,
    ButtonOutline
  },
  methods: {
    reset () {
      this.$store.commit('options/RESET')
      this.$router.push({name: 'home'})
    }
  },
  computed: mapState('product', {
    products: state => state.list
  })
}
</script>
<style scoped>

</style>
