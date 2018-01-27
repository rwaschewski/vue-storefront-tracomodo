<template>
  <footer :class="{ 'brdr-top-1 brdr-c-alto' : isCheckout }">
    
  </footer>
</template>

<script>
import { coreComponent } from 'lib/themes'

import Newsletter from './Newsletter.vue'

export default {
  data () {
    return {
      isCheckout: false
    }
  },
  created () {
    if (this.$route.path === '/checkout') {
      this.isCheckout = true
    }
  },
  watch: {
    '$route.path': function () {
      if (this.$route.path === '/checkout') {
        this.isCheckout = true
      } else {
        this.isCheckout = false
      }
    }
  },
  methods: {
    newsletterClick () {
      this.$bus.$emit('notification', {
        type: 'success',
        message: 'This feature is not implemented yet :( Newsletter is on our roadmap - issue #200!',
        action1: { label: 'OK', action: 'close' }
      })
    }
  },
  components: {
    Newsletter
  },
  mixins: [coreComponent('core/blocks/Footer/Footer')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/global_vars';
$gray-secondary: map-get($colors, gray-secondary);

  .newsletter-content {
    align-items: center;
  }
  .icon {
    transition: 0.3s all;
  }
  .social-icon {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    &:hover .icon,
    &:focus .icon,
    &:active .icon {
      fill: $gray-secondary;
    }
  }
  .links {
    list-style-type: none;
  }
  .links li {
    display: inline-flex;
  }
  @media (max-width: 595px) {
    .no-mobile {
      display: none;
    }
    .social {
      margin-top: 0;
    }
    .social-icon:first-of-type {
      margin-left: 0;
    }
    .footer-links {
      padding-bottom: 30px;
    }
  }
</style>
