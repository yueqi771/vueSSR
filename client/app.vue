<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
        <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'

export default {
  metaInfo: {
    title: '越祈771'
  },
  components: {
    Header,
    Footer,
    Todo,
  }
}
</script>

<style lang="stylus" scoped>
    #app{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }
    #cover{
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #fff;
        opacity .9
        z-index -1
    }
</style>

<style lang="stylus">
    body,button,input,select,textarea {font: 100%/1 "Helvetica Neue", Helvetica, STHeiTi, "Microsoft YaHei";}
    body,h1,h2,h3,h4,h5,h6,dl,dt,dd,ul,ol,li,th,td,p,blockquote,pre,form,fieldset,legend,input,button,textarea,article,aside,footer,header,hgroup,nav,section,menu {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        box-sizing: border-box;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    em,i {
        font-style: normal;
    }
    li {
        list-style: none;
    }
    img {
        border: 0;
    }
    input,img {
        vertical-align: middle;
    }
    article,aside,footer,header,hgroup,nav,section,menu {
        display: block;
    }
    a {
        text-decoration: none;
        color: #000;
    }
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
    html,body {
        height: 100%;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        color: #000000;
        font-size: 14px !important;
    }
    a,input,textarea {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
        resize: none;
        border: none;
        -webkit-font-smoothing: antialiased;
    }
    * {
        box-sizing: border-box;
    }
    p {
        word-wrap: break-word;
    }
    body,pre {
        background: #fff;
        font-family: "Helvetica Neue", "Helvetica", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
    }
    ::-webkit-scrollbar {
        color: #ccc;
        background-color: #ccc;
        width: 10px;
        height: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: #717576;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #364044;
    }
    select::-ms-expand { display: none; }
    input::-ms-clear { display: none;}
    input::-ms-reveal { display: none;}

</style>



