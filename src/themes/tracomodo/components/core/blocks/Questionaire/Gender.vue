<template>
  <div id="genderChoice">
    <header class="col-md-12">
      <h2>Sind Sie männlich oder weiblich?</h2>
    </header>
    <div class="answer-wrapper">
      <vue-select-image class="images" :dataImages="dataImages"
                        @onSelectImage="onSelectImage">
      </vue-select-image>
    </div>
  </div>
</template>
<script>
import VueSelectImage from 'vue-select-image'
import genderOptions from '../../../../../../resource/options_gender.json'

export default {
  components: {
    VueSelectImage
  },
  data () {
    return {
      dataImages: genderOptions,
      imageSelected: {
        id: '',
        type: '',
        src: '',
        alt: ''
      }
    }
  },
  methods: {
    onSelectImage: function (data) {
      this.imageSelected = Object.assign({}, this.imageSelected, data)
      this.$store.commit('options/SET_GENDER', { gender: this.imageSelected.alt })
      console.log(this.imageSelected.alt)
    }
  }
}
</script>
<style scoped>
.answer-wrapper{
  display: inline-block;
  max-width: 100%;
  height: 250px;
  padding: 10px 0 5px 10px;
  border: 1px solid rgba(182, 49, 49, 0);
  text-align: center;
  margin: 10px;
}
.images {
  width: 100%;
  height: 100%;
  margin: 0 3em auto;
}
  
</style>
