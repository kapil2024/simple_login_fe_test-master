<template>
    <div class="title-text">
        <div class="title active">{{ title }}</div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,

    },
};
</script>

<style scoped>
.title-text {
    display: flex;
    width: 200%;
}

.title {
    width: 50%;
    font-size: 35px;
    font-weight: 600;
    text-align: center;
    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
</style>