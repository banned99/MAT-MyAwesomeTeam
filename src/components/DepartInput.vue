<template>
  <div>
    <p v-for="(item, index) in departlist" :key="item.id">
      {{ item[0].toUpperCase() + item.slice(1) }}
      <button @click="remove(index)" v-if="item != 'boss'"> X </button>
    </p>
    <input type="text" v-model="name">
    <button @click="add"> + </button>
  </div>
</template>

<script>
export default {
  name: 'departinput',
  props: {
    departlist: {
      type: Array,
      required: true
    }
  },
  data: () => {
    return {
      name: ''
    }
  },
  computed: {

  },
  methods: {
    add: function () {
      this.$emit('add', this.name)
      this.name = ''
    },
    remove: function (index) {
      this.$emit('remove', index)
    }
  }
}
</script>
