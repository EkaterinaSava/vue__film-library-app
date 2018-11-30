<template lang="pug">
  .content-wrapper
    section
      .container
        .task-list__header
          h1.ui-title-1 Tasks

          // ————— TASKS FILTER —————
          .task-list__filters
            p.console-log console.log => filter: {{ filter }}
            .button.button--round.button-default.task-list__filters-btn(@click="filter = 'active'") Active
            .button.button--round.button-default.task-list__filters-btn(@click="filter = 'completed'") Completed
            .button.button--round.button-default.task-list__filters-btn(@click="filter = 'all'") All

        // ————— TASK LIST ———————
        .task-list
          transition-group(name="taskList")
            .task-item(v-for="task in tasksFilter", :key="task.id", :class="{completed: task.completed}")
              .ui-card.ui-card--shadow
                .task-item__header
                  .task-item__header-info
                    span.task-item__label.ui-label.ui-label--light {{ task.whatWatch }}
                    span.task-item__info-time Total time: {{ task.time }}
                  .task-item__close.button-close
                .task-item__content
                  .task-item__content-header.ui-checkbox-wrapper
                    input.task-item__content-checkbox.ui-checkbox(type='checkbox', v-model="task.completed")
                    .task-item__content-heading.ui-title-3 {{ task.title }}
                  .task-item__content-body
                    .task-item__content-desc.ui-text-regular {{ task.description }}
                .task-item__tags
                  // —————————— tag list ——————————
                  .tag-list
                    .ui-tag__wrapper(v-for="tag in task.tags", :key="tag.title")
                      .ui-tag
                        span.tag-title {{ tag.title}}
</template>

<script>
export default {
  data () {
    return {
      filter: 'active'
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .task-list
    &__header
      display flex
      justify-content space-between
      align-items center
      margin-bottom 20px

    & .ui-title-1
      margin-bottom 0

    &__filters
      display flex
      justify-content flex-end
      align-items center
      margin-left -5px
      margin-right -5px

      &-btn
        margin-left 5px
        margin-right 5px

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

    &__tags
      padding-top 20px

      & .tag-list
        display flex
        flex-wrap wrap
        margin-left -5px
        margin-right -5px

      & .ui-tag__wrapper
        margin-left 5px
        margin-right 5px

    &.completed &__content-heading,
    &.completed &__content-desc
      color #999
      text-decoration line-through

    &.completed .ui-checkbox:checked:before
      border-color #999

    &.completed .ui-tag
      background-color #dcdfe6
      opacity .3
      cursor default
</style>
