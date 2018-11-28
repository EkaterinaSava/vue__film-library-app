<template lang="pug">
  .content-wrapper
    section
      .container
        .registartion
          .registartion__banner
          .registartion__form
            h1.ui-title-1 Registration
            form.registartion__form-inner(@submit.prevent="onSubmit")
              .registartion__form-row(:class="{ 'registartion__form-row--error': $v.email.$error }")
                input.registartion__form-input(
                  type="email",
                  placeholder="E-mail",
                  v-model="email",
                  :class="{ 'error': $v.email.$error }",
                  @change="$v.email.$touch()"
                )
                .registartion__form-error-msg(v-if="!$v.email.required") Attention! Field is required
                .registartion__form-error-msg(v-if="!$v.email.email") Attention! Email is not correct
              .registartion__form-row(:class="{ 'registartion__form-row--error': $v.password.$error }")
                input.registartion__form-input(
                  type="password",
                  placeholder="Password",
                  v-model="password",
                  :class="{ 'error': $v.password.$error }",
                  @change="$v.password.$touch()"
                )
                .registartion__form-error-msg(v-if="!$v.password.required") Attention! Field is required
                .registartion__form-error-msg(v-if="!$v.password.minLength") Password must have at least {{ $v.password.$params.minLength.min }} letters
              .registartion__form-row(:class="{ 'registartion__form-row--error': $v.passwordRepeat.$error }")
                input.registartion__form-input(
                  type="password",
                  placeholder="Repeat password",
                  v-model="passwordRepeat",
                  :class="{ 'error': $v.passwordRepeat.$error }",
                  @change="$v.passwordRepeat.$touch()"
                )
                .registartion__form-error-msg(v-if="!$v.passwordRepeat.required") Attention! Field is required
                .registartion__form-error-msg(v-if="!$v.passwordRepeat.sameAsPassword") Passwords must be identical
              .registartion__form-btn-wrapper
                button.button.button-primary.registartion__form-btn(type="submit", :disabled="submitStatus === 'PENDING'") Registration
                .registartion__form-btn-status(v-if="submitStatus === 'OK'") Thanks for your submission!
                .registartion__form-btn-status(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                .registartion__form-btn-status(v-if="submitStatus === 'PENDING'") Sending...
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      passwordRepeat: '',
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
    },
    passwordRepeat: {
      required,
      sameAsPassword: sameAs('password')
    }
  },

  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('submit!')
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
  .registartion
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
