<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 + Add new

        form(@submit.prevent="onSubmit").add-new
          // —————————— ADD FILM/SERIAL TITLE ——————————
          .form__row(:class="{ 'form__row--error': $v.taskTitle.$error }")
            input.form__input.add-new__input(
              type="text",
              placeholder="What we will watch?",
              v-model="taskTitle",
              @change="$v.taskTitle.$touch()"
              :class="{ 'error': $v.taskTitle.$error }"
            )
            .form__error-msg(v-if="!$v.taskTitle.required") Attention! Title is required

          // —————————— ADD FILM/SERIAL DESCRIPTION ——————————
          .form__row
            textarea.add-new__textarea(
              placeholder="Enter some description",
              v-model="taskDescription",
              @keyup.enter="newTask"
            )

          // —————————— CHOOSE FILM / SERIAL RADIO ——————————
          .add-new__what-watch
            label.add-new__what-watch-label
              input.add-new__what-watch-radio(type="radio", name="whatWatch", id="radioFilm", value="Film", v-model="whatWatch")
              span.add-new__what-watch-label-text Film
            label.add-new__what-watch-label
              input.add-new__what-watch-radio(type="radio", name="whatWatch", id="radioSerial", value="Serial", v-model="whatWatch")
              span.add-new__what-watch-label-text Serial

          // —————————— TOTAL TIME ——————————
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

          // —————————— ADD NEW TAG ——————————
          .add-new__add-tag
            // ——— add tag: buttton ———
            .ui-tag__wrapper(@click="showAddTagForm = !showAddTagForm")
              .ui-tag
                span.tag-title Add New Tag
                span.button-close(:class="{active: !showAddTagForm}")
            // ——— add tag: form ———
            transition(name="fade")
              .add-new__add-tag-form(v-if="showAddTagForm")
                input.add-new__add-tag-form-input(
                  type="text",
                  placeholder="New tag",
                  v-model="tagTitle",
                  @keyup.enter="newTag"
                )
                .button.button-default.add-new__add-tag-form-button(@click="newTag") Send

          // —————————— CURRENT TAGS ——————————
          .add-new__current-tags
            .tag-list__text
              b Current tags:
            .tag-list
              transition-group(enter-active-class="animated fadeInRight", leave-active-class="animated fadeOutDown")
                .ui-tag__wrapper(v-for="tag in tags", :key="tag.title")
                  .ui-tag(@click="addTagUsed(tag)", :class="{active: tag.use}")
                    span.tag-title {{ tag.title}}
                    span.button-close
          p.console-log console.log => tagsUsed: {{ tagsUsed }}

          // —————————— SEND FORM BTN ——————————
          .button-list
            button.button.button--round.button-primary(type="submit", :disabled="submitStatus === 'PENDING'") Send
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      submitStatus: null,
      taskTitle: '',
      taskDescription: '',
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
      tagsUsed: []
    }
  },

  validations: {
    taskTitle: {
      required
    }
  },

  methods: {

    // —————ADD NEW TAG—————
    newTag () {
      if (this.taskTitle === '') {
        return
      }

      const tag = {
        title: this.tagTitle,
        use: false
      }

      this.$store.dispatch('newTag', tag)

      // Reset
      this.tagTitle = ''
    },

    // —————ADD TAG USED—————
    addTagUsed (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    },

    // —————Submit New Task—————
    onSubmit () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('ERROR')
        this.submitStatus = 'ERROR'
      } else {
        // Vaild
        console.log('SEND')
        this.submitStatus = 'PENDING'

        // Firebase waiting
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)

        // Time
        let time
        if (this.whatWatch === 'Film') {
          time = this.filmTime
        } else {
          time = this.serialTime
        }

        // Task
        const task = {
          title: this.taskTitle,
          description: this.taskDescription,
          whatWatch: this.whatWatch,
          time,
          tags: this.tagsUsed,
          completed: false,
          editing: false
        }

        this.$store.dispatch('newTask', task)

        // Reset
        this.taskTitle = ''
        this.taskDescription = ''

        // Reset $v (validate)
        this.$v.$reset()

        // Reset for Tags
        this.tagMenuShow = false
        this.tagsUsed = []
        this.tagTitle = ''

        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].use = false
        }
      }
    },

    getHoursAndMinutes (minutes) {
      let hours = Math.trunc(minutes / 60)
      let mins = minutes % 60
      return hours + ' Hours ' + mins + ' Minutes'
    }
  },

  computed: {
    tags () {
      return this.$store.getters.tags
    },

    // total time: films + serials
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
