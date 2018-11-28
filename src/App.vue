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
</style>
