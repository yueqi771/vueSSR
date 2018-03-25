const mutaions = {
    setUserInfo(state, userInfo) {
        state.user_info.name = userInfo.name ? userInfo.name : '';
        state.user_info.sex = userInfo.sex ? userInfo.sex : '';
        state.user_info.avatar = userInfo.avatar ? userInfo.avatar : '';

        console.log(state.user_info)
    }
}

export default mutaions
