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
            form.form__inner(@submit.prevent="onSubmit")
              .form__row(:class="{ 'form__row--error': $v.email.$error }")
                input.form__input(
                  type="email",
                  placeholder="E-mail",
                  v-model="email",
                  :class="{ 'error': $v.email.$error }",
                  @change="$v.email.$touch()"
                )
                .form__error-msg(v-if="!$v.email.required") Attention! Field is required
                .form__error-msg(v-if="!$v.email.email") Attention! Email is not correct
              .form__row(:class="{ 'form__row--error': $v.password.$error }")
                input.form__input(
                  type="password",
                  placeholder="Password",
                  v-model="password",
                  :class="{ 'error': $v.password.$error }",
                  @change="$v.password.$touch()"
                )
                .form__error-msg(v-if="!$v.password.required") Attention! Field is required
                .form__error-msg(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters
              .form__btn-wrapper
                button.button.button-primary.form__btn(type="submit", :disabled="submitStatus === 'PENDING'") Login
                .form__btn-status(v-if="submitStatus === 'OK'") Thanks for your submission!
                .form__btn-status(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                .form__btn-status(v-if="submitStatus === 'PENDING'") Sending...
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
</style>
