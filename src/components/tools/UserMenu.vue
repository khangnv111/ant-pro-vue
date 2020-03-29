<template>
  <div class="user-wrapper">
    <div class="content-box">
<!--      <a href="https://pro.loacg.com/docs/getting-started" target="_blank">-->
<!--        <span class="action">-->
<!--          <a-icon type="question-circle-o"></a-icon>-->
<!--        </span>-->
<!--      </a>-->
<!--      <notice-icon class="action"/>-->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="Avatar"/>
          <span>{{ fullName }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>Account Setting</span>
            </router-link>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>Logout</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import { AVATAR_USER, FULLNAME_USER } from '../../store/mutation-types'

export default {
  name: 'UserMenu',
  data () {
    return {
      fullName: '',
      Avatar: ''
    }
  },
  components: {
    NoticeIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  mounted () {
    this.fullName = Vue.ls.get(FULLNAME_USER)
    this.Avatar = Vue.ls.get(AVATAR_USER)
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: 'Message',
        content: 'Are you sure for quit ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: 'Error',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
