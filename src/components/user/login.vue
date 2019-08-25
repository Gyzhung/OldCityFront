<style scoped>
.form {
    padding-top: 2rem;
  width: 60%;
  margin: 0 auto;
}
.login{
  margin-top: 10vh;
  height: 70vh;
}
.form-header {
  text-align: center;
  color: #784a45;
  font-size: 18px;
  font-weight: 700;
}
.form-control:focus {
  border-color: #ab8a6b;
  box-shadow: 0 0 5px rgba(171, 138, 107, 1);
}
.form-control{
  width: 80%;
}

</style>

<template>
  <div class="content">
    <div class="form login">                
      <div class="form-header">會員登入login</div>
        <div class="card-body">
            <div class="form-group row">
                <label for="account" class="col-md-4 col-form-label text-md-right">登入帳號:</label>
                <div class="col-md-6">
                    <input type="text" v-model="users.account" id="account" class="form-control" name="account">
                </div>
            </div>

            <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">登入密碼:</label>
                <div class="col-md-6">
                    <input type="password" @keyup.enter="login" v-model="users.password" id="password" class="form-control" name="password">
                </div>
            </div>
            <div class="col-md-6 offset-md-4">                            
                <button type="button" @click="login" class="btn btn-lightbrown">登入</button>
                <router-link to="/register" class="route_link" style="cursor: pointer;"><button type="button" class="btn btn-light">註冊會員</button></router-link>
                <router-link tag="span" to="/ForgetPassword" style="cursor:pointer;">&nbsp;忘記密碼</router-link>
            </div>
        </div>               
      </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      users: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      //登入
      const data = {
        account: this.users.account,
        password: this.users.password
      }
      this.$http.post(`${this.$GLOBAL.path}/api/login`,data)
      .then(response=> {
        if ((status = 200)) {
          //儲存cookie 並提示上層更新使用者資料
          this.$GLOBAL.setCookie('login_token',response.data,1);
          this.$GLOBAL.login_token = response.data;
          this.$emit("login");
          //導向首頁
          this.$router.push({ path: `/index` });
        }
      })
      .catch(error=>{
        alert(error.response.data[0])
      });
    }
  }
};
</script>
