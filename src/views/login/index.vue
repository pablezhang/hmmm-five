<template>
  <div style="height:100%">
    <div class="container">
      <div class="login-box">
        <div class="title">
          <img src="../../assets/image/下载.png"> <span>用户登录</span>
        </div>
        <el-form ref="form" :model="formData" :rules="rules" class="form">
          <el-form-item prop="username">
            <el-input v-model="formData.username" prefix-icon="el-icon-user-solid" placeholder="username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="formData.password" show-password prefix-icon="el-icon-s-goods" placeholder="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="btn" @click="goLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right-bg" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      formData: {
        username: 'demo',
        password: 'hm#qd@mm!'
      },
      rules: {
        username: [
          { required: true, message: 'The user name cannot be empty', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'The user password cannot be empty', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['loginActions']),
    async goLogin() {
      try {
        await this.$refs.form.validate()
        this.setSha()
        await this.loginActions(this.formData)
      } catch (error) {
        console.log(error)
      }
    },
    setSha() {
      const sha256 = require('js-sha256').sha256// 这里用的是require方法，所以没用import
      this.formData.password = sha256(this.formData.password)// 要加密的密码
      // console.log(this.formData.password)// 这就是你加密之后的密码
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/image/bg.jpg);
  background-repeat: no-repeat;
  background-size:100%;
  .right-bg{
    position:absolute;
    bottom:0;
    right: 0;
    width: 700px;
    height: 470px;
    background-image: url(../../assets/image/loginBg.png);
  }
  .login-box{
    position:absolute;
    top: 30%;
    left: 20%;
    padding: 35px 35px 15px;
    background-color: #f5f5f5;
    width: 520px;
    height: 325px;
    .title{
      width: 100%;
      height: 30px;
      line-height: 30px;
      font-size: 22px;
      img{
        vertical-align: text-top;
      }
    }
    .form{
      margin-top:15px;
      ::v-deep .el-input {
        .el-input__inner{
          height: 47px;
        }
      }
      .btn{
        margin-top: 20px;
        width: 100%;
        height: 47px;
        font-size: 22px;
      }
    }
  }
}

</style>
