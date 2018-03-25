import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import mutations from './mutations'
import actions from './actions'

export default () => {
    return new Vuex.Store({
        state,
        mutations,
        actions
    })
}
