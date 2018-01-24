<template>
  <div id="styleChoice">
    <h2>Welchen Style bevorzugen Sie?</h2>
    <div class="answer-wrapper">
      <vue-select-image v-if="male" class="images" :dataImages="dataImages"
                        @onSelectImage="onSelectImage">
      </vue-select-image>
      <vue-select-image v-else class="images" :dataImages="dataImages"
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
      male: true,
      optionSelected: {
        id: '',
        src: '',
        alt: ''
      }
    }
  },
  computed: {
    dataImagesMale: function () {
      // TODO: Nach Optionen für Männer bzw. Frauen Filtern
    }
  },
  methods: {
    onSelectImage: function (data) {
      this.imageSelected = Object.assign({}, this.imageSelected, data)
    }
  }
}
</script>
<style scoped>
</style>
