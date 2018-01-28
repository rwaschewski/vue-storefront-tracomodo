<template>
  <div class="container">
    <div class="products">
      <div class="clearfix">
        <product v-for="product in products" 
                :key="product.ASIN" 
                :product="product">
         </product>
      </div>
    </div>
  </div>
</template>
<script>
import Product from './Product.vue'

export default {
  created () {
    this.$set('products', this.$store.state['product/list'])
  },
  data () {
    return {
      products: []
    }
  },
  components: {
    Product
  }
}
</script>
<style scoped>

</style>
