<template>
  <section class="main-slider bg-darkgray c-white">
    <no-ssr>
        <carousel :perPage='1'>
            <slide v-for='slide in slides'>
                <div class="container" :style="{ backgroundImage: 'url(' + slide.image + ')' }">
                    <div class="row middle-xs center-xs">
                        <div class="col-md-8 px10p">
                            <p class="subtitle mb0 serif uppercase h3 align-center title-bg">{{ slide.subtitle }}</p>
                            <h1 class="title title-bg mt0 mb30 align-center">{{ slide.title }}</h1>
                            <div class="align-center">
                                <!--<button-outline class="button" :text="slide.button_text" color="blue" />-->
                                <button-full class="button" :text="slide.button_text" @click.native.stop="startConf" />
                            </div>
                        </div>
                    </div>
                </div>
            </slide>
        </carousel>
    </no-ssr>
  </section>
</template>

<script>
import NoSSR from 'vue-no-ssr'
import { coreComponent } from 'lib/themes'
import { Carousel, Slide } from 'vue-carousel'
import ButtonOutline from '../../../theme/ButtonOutline.vue'
import ButtonFull from '../../../theme/ButtonFull.vue'

export default {
  components: {
    ButtonOutline,
    ButtonFull,
    Carousel,
    Slide,
    'no-ssr': NoSSR
  },
  methods: {
    startConf () {
      this.$router.push('/questionaire/gender')
    }
  },
  mixins: [coreComponent('core/blocks/MainSlider/MainSlider')]
}
</script>

<style scoped>
h1 {
    font-size: 72px;
}
.main-slider {
    width: 100%;
    height: 640px;
}
.container {
    width: 100%;
    height: auto;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
.row {
    height: 640px;
}
.title-bg {
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center;
    padding: 5px;
}
@media (max-width: 75em) {
    .main-slider {
        height: 400px;
    }
    .title {
        font-size: 50px;
    }
    .subtitle {
        font-size: 20px;
    }
    .row {
        height: 400px;
    }
}
@media (max-width: 64em) {
    .main-slider {
        height: 300px;
    }
    .title {
        font-size: 48px;
    }
    .subtitle {
        font-size: 18px;
    }
    .button {
        font-size: 16px;
    }
    .row {
        height: 300px;
    }
}
</style>
