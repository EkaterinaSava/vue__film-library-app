<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 + Add new
        .add-new
          input.add-new__input(type="text", placeholder="What we will watch?", v-model="taskTitle", @keyup.enter="newTask")
          textarea.add-new__textarea(placeholder="Enter some description", v-model="taskDescription", @keyup.enter="newTask")
          .add-new__what-watch
            label.add-new__what-watch-label
              input.add-new__what-watch-radio(type="radio", name="whatWatch", id="radioFilm", value="Film", v-model="whatWatch")
              span.add-new__what-watch-label-text Film
            label.add-new__what-watch-label
              input.add-new__what-watch-radio(type="radio", name="whatWatch", id="radioSerial", value="Serial", v-model="whatWatch")
              span.add-new__what-watch-label-text Serial
          .add-new__total-time
            .add-new__total-time-film(v-if="whatWatch === 'Film' ") Total Film Times
            .add-new__total-time-serial(v-if="whatWatch === 'Serial' ") Total Serial Times
          .add-new__tags
            .tag-list
              .ui-tag__wrapper
                .ui-tag
                  span.tag-title Dogs
                  span.button-close
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      taskId: 3,
      whatWatch: 'Film'
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        completed: false,
        editing: false
      }
      console.log(task)
      // upd id for each new
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .add-new
    &__what-watch
      margin-bottom 20px
      &-label
        display flex
        align-items center
      &-radio
        margin-right 10px
        margin-bottom 0
    &__total-time
      padding 20px 0
</style>
