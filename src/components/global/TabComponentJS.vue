<template>
  <div 
    class="tab-component"
    :class="{ active: active }"
    @click="handleClick"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TabComponentJS',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const handleClick = () => {
      props.onClick()
    }

    return {
      handleClick
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-component {
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &.active {
    border-bottom-color: #3b82f6;
    color: #3b82f6;
    font-weight: 600;
  }
}
</style> 