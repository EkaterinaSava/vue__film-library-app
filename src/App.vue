<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(to="/") Film Library
            .button-burger(@click="menuShow = !menuShow", :class="{active: menuShow}")
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(:class="{active: menuShow}")
              ul.navbar-list
                li.navbar-item(v-for="link in linkMenu", :key="link.title", @click="menuShow = false")
                  router-link.navbar-link(:to="`${link.url}`") {{ link.title }}
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,

      linkMenu: [
        {title: '+ Add New', url: '/'},
        {title: 'Current List', url: '/task'},
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="stylus">
  .header-logo
    font-size 30px
    font-weight 700

  input
    font-size 14px
    line-height 20px

  .console-log
    display inline-flex
    color #4fc08d
    border 1px solid #4fc08d
    padding 5px
    margin 10px

  .content-wrapper
    min-height auto

  .go-to
    &__login
      display flex
      padding-left 50%
      margin-top 20px

      &-link,
      &-text
        font-size 16px
        line-height 16px

      &-link
        border-bottom 1px solid
        margin-left 5px
        transition color .3s ease-out, border-bottom-color .3s ease-out
        cursor pointer

        &:hover
          color #444ce0
          border-bottom-color #444ce0

  // ——Form Components——
  .form
    &__input
      margin-bottom 0

      &.error
        border-color #f44336
        animation shake .4s

    &__row
      margin-bottom 20px

    &__error-msg
      display none
      color #f44336
      font-size 14px
      line-height 20px
      padding-top 5px

    &__row--error &__error-msg
      display block

    &__btn
      border 0
      font-family: 'Montserrat', Helvetica, Arial, sans-serif

      &-status
        font-size 14px
        line-height 20px
        padding-top 5px

  // ——Animation for Tasks——
  // Active
  .taskList-enter-active,
  .taskList-leave-active
    transition: all .4s

  // Enter
  .taskList-enter,
  .taskList-leave-to
    opacity: 0
    transform: translateY(10px)

  // ——Animation for Tags menu——
  // Active
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .2s

  // Enter
  .fade-enter,
  .fade-leave-to
    opacity: 0

  /*
  Usage animate.css
  https://daneden.github.io/animate.css/
  */
  .animated
    animation-duration: 1s;
    animation-fill-mode: both;

  .fadeInRight
    animation-name: fadeInRight
  @keyframes fadeInRight
    from
      opacity: 0;
      transform: translate3d(100%,0,0);
    to
      opacity: 1
      transform: translate3d(0,0,0)

  .fadeOutDown
    animation-name: fadeOutDown
  @keyframes fadeOutDown
    from
      opacity: 1
    to
      opacity: 0
      transform: translate3d(0,100%,0)

  .shake
    animation-name: shake
  @keyframes shake
    from,
    to
      transform: translate3d(0, 0, 0);
    20%,
    60%
      transform: translate3d(-10px, 0, 0);
    40%,
    80%
      transform: translate3d(10px, 0, 0);
</style>
