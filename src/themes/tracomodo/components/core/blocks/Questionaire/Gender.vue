<template>
  <div id="genderChoice">
    <h2>Sind Sie männlich oder weiblich?</h2>
    <div class="answer-wrapper">
      <vue-select-image class="images" :dataImages="dataImages"
                        @onSelectImage="onSelectImage">
      </vue-select-image>
    </div>
  </div>
</template>
<script>
import VueSelectImage from 'vue-select-image'
import optionsData from '../../../../../../resource/options.json'

export default {
  components: {
    VueSelectImage
  },
  data () {
    return {
      dataImages: optionsData,
      optionSelected: {
        id: '',
        src: '',
        alt: ''
      }
    }
  },
  methods: {
    onSelectImage: function (data) {
      this.optionSelected = Object.assign({}, this.optionSelected, data)
    }
  },
  computed: {
    optionsSelected: () => this.$store.getters.optionsSelected
  }
}
</script>
<style scoped>
.answer-wrapper{
  display: inline-block;
  height: 200px;
}
.images {
  width: 100%;
  height: 100%;
  margin: 0 5em;
}
  
</style>
