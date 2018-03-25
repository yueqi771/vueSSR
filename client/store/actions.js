const actions = {
    // 更新用户信息
    updateUserInfo({ state, commit }, userInfo) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                commit('setUserInfo', userInfo);
                resolve()
            }, 1000)
        })

    }

}

export default actions;
