<template>
  <div id="questionaire" class="align-center">
    <section class="wrapper">
      <div id="progress">
        <div id="progressbar">
        </div>
      </div>
      <div id="stepContainer">
        <router-view></router-view>
      </div>
      <div>
        <div class="stepButtons">
          <button-outline color="blue" class="button back" text="zurück" @click.native="goBack" />
          <button-full class="button go" text="weiter" @click.native="goNext" />
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ButtonOutline from '../components/theme/ButtonOutline.vue'
import ButtonFull from '../components/theme/ButtonFull.vue'
import stepsData from '../../../resource/steps.json'

export default {
  data () {
    return {
      currentStep: 0,
      steps: stepsData.steps
    }
  },
  components: {
    ButtonOutline,
    ButtonFull
  },
  methods: {
    goBack () {
      this.currentStep = this.currentStep - 1
      this.$router.go(-1)
    },
    goNext () {
      this.$router.push({ path: this.nextRoute })
      this.currentStep = this.currentStep + 1
    }
  },
  computed: {
    nextRoute: function () {
      return this.steps[this.currentStep].next_route
    }
  }
}
</script>
<style scoped>
.wrapper {
  display: inline-block;
  margin: 2em auto;
}
.stepButtons {
  display: inline-flex;
  margin: 2em;
}
.back {
  float: left;
  margin-right: 4rem;
}
.go {
  text-transform: uppercase;
  float: right;
  margin-left: 4rem;
}
@media (max-width: 595px) {
    .stepbuttons, .back, .go {
      display: inline-flex;
      margin: 0;
    }
  }
</style>