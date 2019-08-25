<style scoped>
* {
  font-family: "Microsoft JhengHei";
  text-decoration: none;
}

body {
  margin: 0;
  position: relative;
  padding-bottom: 1.5rem;
}
#app{
  margin: 0;
  position: relative;
  padding-bottom: 1.5rem;
}
.home{
  margin: 0;
  position: relative;
  padding-bottom: 1.5rem;
}
</style>

<template>
  <div class="home">
    <Header :user="user" @logout="logout"></Header>
    
    <router-view :user="user" @login="login"  @update_userdata="update_userdata"></router-view>
    <Footer></Footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: '',
    };
  },
  mounted() {
    this.$GLOBAL.login_token = this.$GLOBAL.getCookie("login_token");
    this.update_userdata();
  },
  methods: {
    login:function() {
      //登入 於組件呼叫
      this.update_userdata();
    },
    logout:function(user) {
      //登出 於組件呼叫
      //刪除cookie 清除使用者資料
      this.$GLOBAL.delCookie("login_token");
      this.user = '';
    },
    update_userdata:function() {
      //取得使用者資料
      if (this.$GLOBAL.login_token != null) {
        this.$http.get( `${this.$GLOBAL.path}/api/getMyData`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}`}})
        .then(response=> {
          if (response.status == 200) {
            this.user = response.data;
            if(this.user.status == 4) console.log("是管理員")
          }
        })
        .catch(error=> {
          console.log(error.response)
        });
      }
    }
  }
};
</script>

