import firebase from 'firebase/app'
import User from './user_help'

export default {
  state: {
    user: null
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },

  actions: {
    // ——————————————————— REGISTRATION ———————————————————
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // if 'done' logic:
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
        console.log(user)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    // ——————————————————————— LOGIN ———————————————————————
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        // if 'done' logic:
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.user.uid))
        commit('setLoading', false)
        console.log(user)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },

    // —————————————————— WHEN USER LOGGED —————————————————
    loggedUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
      console.log(payload.uid)
    },

    // ———————————————————— LOGOUT —————————————————————————
    logoutUser ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },

  getters: {
    user (state) {
      return state.user
    },

    checkUser (state) {
      return state.user !== null
    }
  }
}
