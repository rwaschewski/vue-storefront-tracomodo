<template>
  <div class="newsletter py25 px40 bg-lightgray">
    
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonOutline from '../../../theme/ButtonOutline.vue'

export default {
  components: {
    ButtonOutline
  },
  mixins: [coreComponent('core/blocks/Footer/Newsletter')]
}
</script>


<style scoped>
  @media (max-width: 1023px) {
    .newsletter-button {
      padding-top: 25px;
      text-align: center;
    }
  }

  @media (max-width: 767px) {
    .h3 {
      font-size: 18px;
      text-align: center;
    }
  }
</style>