<template>
    <div>
        <el-button size="small">默认按钮</el-button>
        <el-button size="small" type="primary">主要按钮</el-button>
        <el-button size="small" type="success">成功按钮</el-button>
        <el-button size="small" type="info">信息按钮</el-button>
        <el-button size="small" type="warning">警告按钮</el-button>
        <el-button size="small" type="danger">危险按钮</el-button>
        <div class="page">
            <p>111</p>
        </div>
    </div>
</template>

<script>
import {login} from '../../api'

export default {
    name: "index",
    mounted() {
        login({id: 1}).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>

<style lang="scss" scoped>

.page {
    p {
        font-size: 36px;
    }
}

</style>