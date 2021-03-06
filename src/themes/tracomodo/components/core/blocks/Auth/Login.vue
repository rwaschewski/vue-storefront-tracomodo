<template>
  <div>
    <div class="py35 px65 bg-lightgray">
      <h1 class="my0">Login</h1>
    </div>
    <div class="py35 px65 bg-white c-gray">
      <form @submit.prevent="login" novalidate>
        <div class="mb35">
          <input type="email" name="email" ref="email" v-model="email" placeholder="Email-Adresse *">
          <span class="validation-error" v-if="!$v.email.required">*Erforderlich.</span>
          <span class="validation-error" v-if="!$v.email.email">*Bitte geben Sie eine gültige Email Adresse ein.</span>
        </div>
        <div class="mb35 pass-container">
          <input :type="passType" name="password" v-model="password" placeholder="Password *">
          <i class="icon material-icons c-alto" @click="togglePassType">{{ iconName }}</i>
          <span class="validation-error" v-if="!$v.password.required">*Erforderlich.</span>
        </div>
        <div class="row">
          <div class="col-xs-6 mb35">
            <input class="m5" type="checkbox" name="remember" id="remember">
            <label for="remember">Merken?</label>
          </div>
          <div class="col-xs-6 mb35 align-right">
            <a href="#" @click.prevent="remindPassword">Passwort vergessen?</a>
          </div>
        </div>
        <div class="mb20">
          <button-full class="btn-full p0" text="Einloggen" @click.native="login"></button-full>
        </div>
        <input type="submit">
        <div class="center-xs">
          <span>noch <a href="#" @click.prevent="switchElem">kein Kunde?</a></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      passType: 'password',
      iconName: 'visibility',
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  mixins: [coreComponent('core/blocks/Auth/Login')],
  methods: {
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'register')
    },
    togglePassType (name) {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.iconName = 'visibility_off'
      } else {
        this.passType = 'password'
        this.iconName = 'visibility'
      }
    },
    remindPassword () {
      if (!navigator.onLine) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Reset password feature does not work while offline!',
          action1: { label: 'OK', action: 'close' }
        })
      } else {
        this.$store.commit('ui/setAuthElem', 'forgot-pass')
      }
    },
    login () {
      if (this.$v.$invalid) {
        this.$bus.$emit('notification', {
          type: 'error',
          message: 'Please fix the validation errors',
          action1: { label: 'OK', action: 'close' }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', 'Authorization in progress ...')
      this.$store.dispatch('user/login', { username: this.email, password: this.password }).then((result) => {
        console.log(result)
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.$bus.$emit('notification', {
            type: 'error',
            message: result.result,
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          this.$bus.$emit('notification', {
            type: 'success',
            message: 'You are logged in!',
            action1: { label: 'OK', action: 'close' }
          })
          this.$store.commit('ui/setSignUp', false)
        }
      }).catch(err => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    }
  },
  mounted () {
    this.$refs.email.focus()
  },
  components: {
    ButtonFull
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../../css/text.scss';

  input[type=password], input[type=email], input[type=text] {
    @extend body;
    box-sizing: border-box;
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    width: 100%;
  }

  input[type=submit] {
    visibility: hidden;
  }

  input::-webkit-input-placeholder {
    color: #BDBDBD;
  }

  input:-moz-placeholder {
    color: #BDBDBD;
  }

  input:focus {
    outline: none;
    border-color: black;
    transition: 0.3s all;
  }

  .btn-full {
    box-sizing: border-box;
    width: 100%;
    justify-content: center;
    text-align: center;
  }

  .pass-container {
    position: relative;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    right: 0;
    top: 10px;

    &:hover {
      color: #8E8E8E;
    }
  }

  .validation-error {
    display: block;
    font-size: 12px;
    color: #EB5757;
  }
</style>
