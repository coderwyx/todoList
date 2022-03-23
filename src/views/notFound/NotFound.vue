<template>
    <div class="notFound">
        <icon-svg class="icon"  icon-class="not-found" />
        <div style="text-align: center;">Not Found</div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
    name: '',
    props: {

    },
    components: {

    },
})
</script>

<style scoped>
.notFound {
    font-size: 40px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
}
.icon {
    font-size: 460px;
}
</style>