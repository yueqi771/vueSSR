<template>
    <div class="index">
        <div class="banner">
            这里是首页
            <router-link to="/login">点击去登陆</router-link>
        </div>

        <section class="real-app">
            <input
                type="text"
                class="add-input"
                autofocus="autofocus"
                placeholder="接下去要做什么？"
                @keyup.enter="addTodo"
            >
            <item
                :todo="todo"
                v-for="todo in filteredTodos"
                :key="todo.id"
                @del="deleteTodo"
            />
            <tabs
                :filter="filter"
                :todos="todos"
                @toggle="toggleFilter"
                @clearAllCompleted="clearAllCompleted"
            />
        </section>

    </div>
</template>


<style lang="less" scoped>
    .index{
        .banner{
            width: 100%;
            height: 300px;
            background: cornflowerblue;
            position: relative;
            text-align: center;
            color: #fff;
            font-size: 20px;
            line-height: 40px;
            a{
                font-size: 16px;
                color: #fdd;
            }
        }
    }
    .real-app{
        width: 600px;
        margin: 100px auto 0;
        box-shadow: 0 0 5px #666;
    }
    .add-input{
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'
    let id = 0
    export default {
        metaInfo:{
            title: "昭言"
        },

        asyncData ({ store, route }){
            let userInfo = {
                name: '越祈',
                sex: '女',
            }

            // 触发action后， 会返回Promise
            return store.dispatch('updateUserInfo', userInfo)
        },

        data() {
            return {
                todos: [],
                filter: 'all'
            }
        },

        components: {
            Item,
            Tabs,
        },

        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => completed === todo.completed)
            },

            get_user() {
                return this.$store.state.user_info;
            }
        },

        methods: {
            addTodo(e) {
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        },

        created() {
        }
    }
</script>

