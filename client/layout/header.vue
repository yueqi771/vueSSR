<template>
  <header class="main-header">
    <h1>Yueqi
        <span class="username">用户名{{ this.get_user.name }}</span>
    </h1>

  </header>
</template>

<style lang="less">

    .main-header{
        width: 100%;
        height: 60px;
        background: #4ba8c9;
        .username{
            float: right;
            margin-right: 100px;
            color: #fff;
            font-size: 14px;
        }
    }

    h1{
        width: 100%;
        font-size: 30px;
        color: #fff;
        font-weight: 100;
        text-align: center;
        line-height: 60px;
    }

</style>

<script>
    export default {
        computed: {
            get_user() {
                return this.$store.state.user_info;
            }
        }
    }
</script>


