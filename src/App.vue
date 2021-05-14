<template>
    <div class="app">
        <router-view v-if="isRouterAlive" />
    </div>
</template>

<script>
    export default {
        name: "App",
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive: true
            };
        },
        updated() {window.scroll(0,0);},
        methods: {
            // 重载页面 适合添加数据或者路由id改变
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(()=>{
                    this.isRouterAlive = true;
                });
            }
        }
    };
</script>
