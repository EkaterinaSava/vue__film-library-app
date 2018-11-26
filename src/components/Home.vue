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
          // —————————— total time ——————————
          .add-new__total-time
            // —— if films
            .add-new__total-time-film(v-if="whatWatch === 'Film' ")
              label.total-time__label
                span.total-time__label-text Hours:
                input.total-time__input(type="number", v-model="filmHours")
              label.total-time__label
                span.total-time__label-text Minutes:
                input.total-time__input(type="number", v-model="filmMinutes")
              .add-new__total-time-text
                b Total Film Times:
                span {{ filmTime }}
            // —— if serials
            .add-new__total-time-serial(v-if="whatWatch === 'Serial' ")
              label.total-time__label
                  span.total-time__label-text How many seasons?
                  input.total-time__input(type="number", v-model="serialSeasons")
              label.total-time__label
                span.total-time__label-text How many series?
                input.total-time__input(type="number", v-model="serialSeries")
              label.total-time__label
                span.total-time__label-text Time of one series (minutes):
                input.total-time__input(type="number", v-model="serialSeriesMinutes")
              .add-new__total-time-text
                b Total Serial Times:
                span {{ serialTime }}
          // —————————— tag list ——————————
          .add-new__add-tag
            .ui-tag__wrapper(@click="showAddTagForm = !showAddTagForm")
              .ui-tag
                span.tag-title Add New Tag
                span.button-close(:class="{active: !showAddTagForm}")
            .add-new__add-tag-form(v-if="showAddTagForm")
              input.add-new__add-tag-form-input(type="text", placeholder="New tag", v-model="tagTitle", @keyup.enter="newTag")
              .button.button-default.add-new__add-tag-form-button(@click="newTag") Send
          .add-new__current-tags
            .tag-list__text
              b Current tags:
            .tag-list
              .ui-tag__wrapper(v-for="tag in tags", :key="tag.title")
                .ui-tag(@click="addTagUsed(tag)", :class="{active: tag.use}")
                  span.tag-title {{ tag.title}}
                  span.button-close
          p {{ tagsUsed }}

        .button-list
          .button.button--round.button-primary(@click="newTask") Send
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      taskId: 3,
      whatWatch: 'Film',

      // total time: films
      filmHours: 1,
      filmMinutes: 30,
      // total times: serials
      serialSeasons: 1,
      serialSeries: 11,
      serialSeriesMinutes: 40,

      // tags
      tagTitle: '',
      showAddTagForm: false,
      tagsUsed: [],
      tags: [
        {title: 'Comedy', use: false},
        {title: 'Westerns', use: false},
        {title: 'Adventure', use: false}
      ]
    }
  },
  methods: {
    newTag () {
      if (this.taskTitle === '') {
        return
      }
      this.tags.push({
        title: this.tagTitle,
        used: false
      })
    },
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      let time
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tagsUsed: this.tagsUsed,
        completed: false,
        editing: false
      }
      console.log(task)
      // upd id for each new
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
    },
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push(tag.title)
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },
    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let mins = minutes % 60
      return hours + ' Hours ' + mins + ' Minutes'
    }
  },
  computed: {
    filmTime () {
      let mins = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(mins)
    },
    serialTime () {
      let mins = this.serialSeasons * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(mins)
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

      &-text
        margin-bottom 20px

        & b
          margin-right 10px

    &__add-tag
      display flex
      padding-top 20px
      margin-bottom 20px

      .ui-tag
        &__wrapper
          cursor pointer

      .button-close
        &.active
          transform rotate(45deg)

      &-form
        display flex
        padding 0 40px

        &-input
          flex-basis 200px
          margin-bottom 0

        &-button
          margin-left 10px

    &__current-tags
      display flex
      align-items center
      flex-wrap wrap

      .tag-list
        &__text
          margin-right 10px

      .ui-tag
        &__wrapper
          margin 5px

        &.active
          background-color #444ce0
          color white

          & .button-close:before,
          & .button-close:after
            background-color white

  .total-time
    &__label
      display flex
      align-items center
      margin-bottom 20px

      &-text
        flex-basis 140px
        font-size 16px
        line-height 18px
        padding-bottom 10px

    &__input
      max-width 200px
      margin-bottom 0
</style>
