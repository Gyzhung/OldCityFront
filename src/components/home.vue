<style>

* {
  font-family: "Microsoft JhengHei";
  text-decoration: none;
}
.container-fluid {
  margin: 0;
  padding: 0;
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
.row {
  margin-right: 0;
  margin-left: 0;
}
.contentroute {
  height: 100%;
}
.content{
  min-height: 60vh;
}
.btn-lightbrown {
  background-color: #ab8a6b;
  color: #ffffff;
}
.btn-lightbrown:hover {
  background-color: #784a45;
  color: #ffffff;
}
.btn-light {
  border-color: #784a45;
}
.btn-light:hover{
  background-color:rgba(171, 138, 107, .6)
}
a:hover, a:visited, a:link, a:active {
  text-decoration: none  !important;
  color: black ;
}

@media (max-width: 480px) {
}

</style>

<template>
  <div class="home">
    <Header :user="user" @logout="logout"></Header>
    
    <router-view :user="user" @login="login" :isShow="isShow" @update_userdata="update_userdata"></router-view>
    <!-- <div class="contentroute">
    
    </div> -->
    <Footer></Footer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      user: '',
      isShow:false,
    };
  },
  mounted() {
    this.$GLOBAL.login_token = this.$GLOBAL.getCookie("login_token");
    this.update_userdata();
  },
  updated: function() {
   //this.getData();
  },
  methods: {
    login:function(user) {//再login.vue內套用
        this.user = user;
    },
    logout:function(user) {//再login.vue內套用
      this.$GLOBAL.delCookie("login_token");
      this.user = '';
    },
    update_userdata:function() {
      const self = this;
      if (this.$GLOBAL.login_token != null) {
      this.$http.get(`${this.$GLOBAL.path}/api/getMyData`, {
        headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }
      })
      .then(function(response) {
         
        if (response.status == 200) {
          self.user = response.data;
          self.status = response.data.status;

          if(self.status == 4){
            self.isShow = true;
            console.log("是管理員");
          }
      
        }
      })
      .catch(function(error) {
      });
    }
    }
  }
};
</script>

