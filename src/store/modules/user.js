import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, AVATAR_USER, FULLNAME_USER } from '@/store/mutation-types'
import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      console.log('Login...')
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          console.log('Login response: ', response)
          if (response.code >= 0) {
            const tokenData = response.data.token
            Vue.ls.set(ACCESS_TOKEN, tokenData.tokenKey, tokenData.timeExpried * 60 * 60 * 1000)
            Vue.ls.set(AVATAR_USER, response.data.avatar, tokenData.timeExpried * 60 * 60 * 1000)
            Vue.ls.set(FULLNAME_USER, response.data.fullName, tokenData.timeExpried * 60 * 60 * 1000)
            commit('SET_TOKEN', tokenData.tokenKey)
            commit('SET_INFO', response.data)
            // commit('SET_NAME', { name: response.data.fullName, welcome: welcome() })
            // commit('SET_AVATAR', response.data.avatar)
            resolve()
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          console.log('result: ', result)
          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => { return action.action })
                per.actionList = action
              }
            })
            role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.fullName, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
          Vue.ls.remove(AVATAR_USER)
          Vue.ls.remove(FULLNAME_USER)
        })
      })
    }

  }
}

export default user
