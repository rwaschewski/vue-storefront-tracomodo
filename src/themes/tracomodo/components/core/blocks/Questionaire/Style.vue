<template>
  <div id="style-choice-wrapper">
    <div class="styleChoice">
      <header class="col-md-12">
        <h2>Welchen Style bevorzugen Sie?</h2>
        <h4>Lederhosen Art</h4>
      </header>

      <div class="answer-wrapper" v-if="isMale">
        <vue-select-image class="images" 
                          :dataImages="maleStyleImages"
                          @onSelectImage="onSelectImage">
        </vue-select-image>
        <!-- <div class="label">
          <label for="images" class="col-xs-3" v-for="style in maleStyleImages" :key="style">{{ style.alt }} </label>
        </div> -->
        <h4>Hemd Art</h4>
        <vue-select-image class="images"
                          :dataImages="shirtStyleImages"
                          @onSelectImage="onSelectImage">
        </vue-select-image>
      </div>
      <div class="answer-wrapper" v-else>
        <vue-select-image class="images" 
                          :dataImages="femaleStyleImages"
                          @onSelectImage="onSelectImage">
        </vue-select-image>
      </div>
    </div>
    <div class="colorChoice">
      <header class="col-md-12">
        <h2>Welche Farbe mögen Sie?</h2>
        <small>Mehrfachauswahl möglich!</small>
      </header>
      <div class="row" v-if="isMale">
        <div class="col-xs-12 col-md-8 col-lg-7">
          <vue-select-image class="images"
                            :dataImages="maleColorOptions"
                            :is-multiple="true"
                            @onSelectMultipleImage="onSelectMultipleImage">
          </vue-select-image>
        </div>
      </div>
      <div class="row center-xs" v-else>
          <vue-select-image class="col-xs-12 col-md-8 col-lg-7"
                            :dataImages="femaleColorOptions"
                            :is-multiple="true"
                            @onSelectMultipleImage="onSelectMultipleImage">
          </vue-select-image>
      </div>
    </div>
  </div>
</template>
<script>
import VueSelectImage from 'vue-select-image'
import maleStyleImages from '../../../../../../resource/options_styles_male.json'
import femaleStyleImages from '../../../../../../resource/options_styles_female.json'
import maleColorOptions from '../../../../../../resource/options_colors_male.json'
import femaleColorOptions from '../../../../../../resource/options_colors_female.json'
import shirtStyleImages from '../../../../../../resource/style_hemd_male.json'

export default {
  components: {
    VueSelectImage
  },
  data () {
    return {
      maleStyleImages,
      femaleStyleImages,
      maleColorOptions,
      femaleColorOptions,
      shirtStyleImages,
      imageSelected: {
        id: '',
        type: '',
        src: '',
        alt: ''
      },
      imageMultipleSelected: []
    }
  },
  methods: {
    onSelectImage: function (data) {
      this.imageSelected = Object.assign({}, this.imageSelected, data)
      this.$store.commit('options/SET_STYLE', { style: this.imageSelected.alt })
      console.log(this.imageSelected.alt)
    },
    onSelectMultipleImage: function (data) {
      this.imageMultipleSelected = data
      this.$store.commit('options/ADD_COLOR', { color: this.imageMultipleSelected })
      console.log(this.imageMultipleSelected)
    }
  },
  computed: {
    isMale () {
      console.log(this.$store.getters['options/gender'])
      if (this.$store.getters['options/gender'] === 'male') {
        return true
      } else {
        return false
      }
    }
  }

}
</script>
<style scoped>
#style-choice-wrapper {
  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-align: center;
}
header{
  padding: 5px 20px;
}
#style-choice-wrapper>header>h2 {
  margin-bottom: 3px;
}
.answer-wrapper{
  display: inline-block;
  max-width: 100%;
  height: 250px;
  border: 1px solid rgba(182, 49, 49, 0);
  text-align: center;
  margin: 0px;
}
.images {
  margin: 1em auto;
  align-self: center;
  max-width: 100%;
}
</style>
