<template>
  <div class="product align-center p15">
    <span @click.capture="preventClicks">
      <a target="_blank" :href="product.URL">
        <div class="product-image">
          <transition name="fade" appear>
            <img v-if="instant" :src="thumbnailPath" :key="thumbnailPath"/>
            <img v-if="!instant" v-lazy="thumbnailPath" :key="thumbnailPath"/>
          </transition>
        </div>
        <p class="mb0">{{ product.NAME | htmlDecode }}</p>

        <span class="price-special lh30 c-gray" v-if="product.SALE_PRICE !== product.ORIGINAL_PRICE">{{ product.SALE_PRICE}}</span>
        <span class="price-original lh30 c-gray" v-if="product.SALE_PRICE !== product.ORIGINAL_PRICE">{{ product.ORIGINAL_PRICE}}</span>

        <span class="lh30 c-gray" v-if="product.SALE_PRICE === product.ORIGINAL_PRICE " >{{ product.ORIGINAL_PRICE}}</span>
     </a>
    </span>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: ['instant'],
  mixins: [coreComponent('core/ProductTile')],
  created () {
    this.$bus.$on('product-after-configured', (config) => {
      this.$store.dispatch('product/configure', { product: this.product, configuration: config.configuration, selectDefaultVariant: false }).then((selectedVariant) => {
        if (selectedVariant) {
          this.product.parentSku = this.product.sku
          Object.assign(this.product, selectedVariant)
        }
      })
    })
  },
  data () {
    return {
      clicks: 0,
      thumbnailPath: '../../../../../../assets/products/' + this.product.IMG
    }
  },
  methods: {
    preventClicks (e) {
      this.clicks++
      if (this.clicks > 1) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/themes/default/css/transitions';

.price-special {
  color: red;
  margin-right: 5px
}
.price-original {
  text-decoration: line-through;
  font-size: smaller
}

.product-image > img {
  max-width: 242px;
  height: 100%;
  transition: 0.3s all $motion-main;
}
.product-image:hover > img {
  transform: scale(1.1);
  transition: 0.3s all $motion-main;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
  overflow: hidden;
}
</style>
