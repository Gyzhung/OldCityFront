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
            </div>
        </div>               
      </div>
    <!-- <div class="container">        
        <div id ="profile" class="col-lg-12 col-xs-12" align="center" >
          <label >會員登入</label>
        <div class="profileDetail">
          <br>
          <p>會員帳號:</p>
          <input id="account"  v-model="users.account" type="text" >
          
          <p>會員密碼:</p>
          <input id="password" @keyup.enter="login" v-model="users.password" type="password">
          <br><br>
          <button type="button" class="btn btn-light" >註冊會員</button>
          <button type="button" @click="login" class="btn btn-primary">登入</button>
          </div>
        </div>
      </div>
    <div style="clear:both;"></div>這是用來清除上方的浮動效果-->
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
  computed: {},
  methods: {
    login() {
      const self = this;
      const data = {
        account: this.users.account,
        password: this.users.password
      }
      this.$http.post(`${this.$GLOBAL.path}/api/login`,data)
      .then(function(response) {
        if ((status = 200)) {
          self.$GLOBAL.setCookie('login_token',response.data,1);
          self.$GLOBAL.login_token = response.data;
          self.$http.get(`${self.$GLOBAL.path}/api/getMyData`,{ headers: { authorization: `Bearer ${self.$GLOBAL.login_token}`} })
          .then(function(response) {
            if (status == 200) {
              self.$GLOBAL.status = response.data.status;
              alert("已登入");
              self.$emit("login",response.data);//使用外層方法
              self.$router.push({ path: `/index` });
            }
          })
          .catch(function(error) {
          });
        }
      })
      .catch(function(error) {
        alert(error.response.data[0])
      });
    }
  }
};
</script>
