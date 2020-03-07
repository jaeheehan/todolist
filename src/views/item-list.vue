<template>
  <div>
    <item v-for="item in renderList" :key="item.id" :id="item.id" :title="item.title" :status="item.status"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import item from '@/components/item.vue'
import { Item } from '@/store/store.interface'

@Component({
    components: {
        item
    }
})
export default class ItemList extends Vue {
  renderList: Item[] = [];

  created (): void {
      this.$store.dispatch('initData')
      this.renderList = this.$store.getters.allTodoList
  }

  @Watch('$route.params.status')
  routeUpdate (newValue: string) {
      console.log(newValue)
      if (!newValue) {
          this.renderList = this.$store.getters.allTodoList
      } else if (newValue === 'active') {
          this.renderList = this.$store.getters.activeTodoList
      } else if (newValue === 'clear') {
          this.renderList = this.$store.getters.clearTodoList
      }
  }
}
</script>
