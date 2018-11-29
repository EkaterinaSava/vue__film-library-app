<template lang="pug">
  .content-wrapper
    section
      .container
        .login
          // —————————— REGISTRATION PICTURE —————————————————
          .login__banner
          // —————————— REGISTRATION FORM ————————————————————
          .login__form
            h1.ui-title-1 Login
            form.login__form-inner(@submit.prevent="onSubmit")
              .login__form-row(:class="{ 'login__form-row--error': $v.email.$error }")
                input.login__form-input(
                  type="email",
                  placeholder="E-mail",
                  v-model="email",
                  :class="{ 'error': $v.email.$error }",
                  @change="$v.email.$touch()"
                )
                .login__form-error-msg(v-if="!$v.email.required") Attention! Field is required
                .login__form-error-msg(v-if="!$v.email.email") Attention! Email is not correct
              .login__form-row(:class="{ 'login__form-row--error': $v.password.$error }")
                input.login__form-input(
                  type="password",
                  placeholder="Password",
                  v-model="password",
                  :class="{ 'error': $v.password.$error }",
                  @change="$v.password.$touch()"
                )
                .login__form-error-msg(v-if="!$v.password.required") Attention! Field is required
                .login__form-error-msg(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters
              .login__form-btn-wrapper
                button.button.button-primary.login__form-btn(type="submit", :disabled="submitStatus === 'PENDING'") Login
                .login__form-btn-status(v-if="submitStatus === 'OK'") Thanks for your submission!
                .login__form-btn-status(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                .login__form-btn-status(v-if="submitStatus === 'PENDING'") Sending...
          // —————————— GO TO LOGIN LINK —————————————————————
        .go-to__login
          span.go-to__login-text Never was here?
          router-link.go-to__login-link(to="/registration")
            span Registration
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      submitStatus: null
    }
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },

  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('login!')
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .login
    display flex
    padding-top 50px

    &__banner
      flex-basis 50%

    &__form
      flex-basis 50%

      &-input
        margin-bottom 0

        &.error
          border-color #f44336
          animation shake .4s

      &-row
        margin-bottom 20px

      &-error-msg
        display none
        color #f44336
        font-size 14px
        line-height 20px
        padding-top 5px

      &-row--error &-error-msg
        display block

      &-btn
        border 0
        font-family: 'Montserrat', Helvetica, Arial, sans-serif

        &-status
          font-size 14px
          line-height 20px
          padding-top 5px
</style>
