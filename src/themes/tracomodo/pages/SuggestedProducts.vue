<template>
  <div id="suggested-products">
    <header class="col-md-12 pt40">
      <h2 class="align-center">Vorgeschlagene Produkte</h2>
    </header>
    <div class="container pb60">
      <div class="row pt15 pl20 center-md">
        <div class="col-md-9 pt20 products-list">
            <!--<div v-if="isProductListEmpty">
                Keine passenden Produkte gefunden!
            </div>-->
            <product-listing columns="3" :products="products" />
        </div>
        <div class="stepButtons">
          <button-outline color="blue" class="button back" text="Neu" @click.native="reset" />
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
    }
  },
  computed: mapState('product', {
    products: state => state.list
  })
}
</script>
<style scoped>

</style>
