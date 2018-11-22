<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home page
    section
      .container
        input(type="text", placeholder="What we will watch?", v-model="taskTitle", @keyup.enter="newTask")
        textarea(placeholder="Enter some description", v-model="taskDescription", @keyup.enter="newTask")
        div
          input(type="radio", name="whatWatch", id="radioFilm", value="Film", v-model="whatWatch")
          label(for="radioFilm") Film
          input(type="radio", name="whatWatch", id="radioSerial", value="Serial", v-model="whatWatch")
          label(for="radioSerial") Serial
          .total-time__film(v-if="whatWatch === 'Film' ")
            span Total Film Times
          .total-time__serial(v-if="whatWatch === 'Serial' ")
            span Total Serial Times
          .tag-list
            .ui-tag__wrapper
              .ui-tag
                span.tag-title Dogs
                span.button-close
    section
      .container
        .task-list
          .task-item(v-for="task in tasks", :key="task.id", :class="{completed: task.completed}")
            .ui-card.ui-card--shadow
              .task-item__header
                .task-item__header-info
                  span.task-item__label.ui-label.ui-label--light {{ task.whatWatch }}
                  span.task-item__info-time Total time:
                .task-item__close.button-close
              .task-item__content
                .task-item__content-header.ui-checkbox-wrapper
                  input.task-item__content-checkbox.ui-checkbox(type='checkbox', v-model="task.completed")
                  .task-item__content-heading.ui-title-3 {{ task.title }}
                .task-item__content-body
                  .task-item__content-desc.ui-text-regular {{ task.description }}
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      taskId: 3,
      whatWatch: 'Film',
      tasks: [
        {
          'id': 1,
          'title': 'GrowthBusters: Hooked on Growth',
          'description': 'I directed this documentary challenging the myths linking growth with prosperity and fulfillment. It explores how our beliefs about economic and consumption',
          'whatWatch': 'Film',
          'completed': false,
          'editing': false
        },
        {
          'id': 2,
          'title': 'Game of thrones',
          'description': 'Best serials',
          'whatWatch': 'Serial',
          'completed': false,
          'editing': false
        }
      ]
    }
  },
  methods: {
    newTask () {
      if (this.taskTitle === '') {
        return
      }
      this.tasks.push({
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        completed: false,
        editing: false
      })
      // upd id for each new
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .task-item
    margin-bottom 20px

    &:last-child
      margin-bottom 0

    &__header
      display flex
      justify-content space-between
      align-items center

    &__close

    &__label
      margin-right 10px

    &__content
      &-header
        display flex
        align-items center
        padding 20px 0

      &-checkbox
        margin-right 10px
      &-heading {
        margin 0
      }
</style>
