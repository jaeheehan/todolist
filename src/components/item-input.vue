<template>
<div class="form-group">
  <input type="text"
         class="form-control"
         v-model="todo"
         @keypress.enter="addItem"
         placeholder="할일을 입력해주세요"/>
</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ItemInput extends Vue {
    todo = ''
    addItem () {
        this.$store.commit('addItem',
            { title: this.todo, status: 'active' })
        this.todo = ''
    }
}
</script>

<style scoped>

</style>
