<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Tasks
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
