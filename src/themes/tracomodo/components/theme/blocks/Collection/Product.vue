<template>
  <div class="product">
    <img :src="'../../../assets/' + product.IMG" class="image" alt="">
    <p>{{product.NAME}}</p>
  </div>
</template>
<script>
export default {
  props: ['product'],
  data () {
    return {
    }
  }
}
</script>
<style scoped>

</style>

