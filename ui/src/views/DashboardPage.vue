<template>
    <div class="setting">
        <button @click="clickOpenSetting">
            Setting
        </button>
    </div>
</template>

<script>
export default {
  methods:{
    clickOpenSetting(){
        this.$router.push('/setting')
    }
  }
}
</script>

<style scoped>
.setting{
    position: absolute;
    top: 0;
    right: 10px;
}
</style>