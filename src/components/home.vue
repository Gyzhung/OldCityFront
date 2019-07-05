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
  text-decoration: none;
  color: black;
}

@media (max-width: 480px) {
}

</style>

<template>
  <div class="home">
    <Header :user="user" @logout="logout"></Header>
    
    <router-view :user="user" @login="login" :isShow="isShow"></router-view>
    <!-- <div class="contentroute">
    
    </div> -->
    <Footer></Footer>
  </div>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";

import footer from "@/components/footer.vue";
export default {
  data() {
    return {
      user: '',
      isShow:false,
    };
  },
  mounted() {
    global_.login_token = global_.getCookie("login_token");
    const self = this;
    if (global_.login_token != null) {
      axios.get(`http://163.17.145.142/api/getMyData`, {
        headers: { authorization: `Bearer ${global_.login_token}` }
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
    
    
  },
  updated: function() {
   //this.getData();
  },
  methods: {
    login:function(user) {//再login.vue內套用
        this.user = user;
    },
    logout:function(user) {//再login.vue內套用
      global_.delCookie("login_token");
      this.user = '';
    },
    
    // getData() {
      
    //   const self = this;
    //   axios
    //     .get(`http://163.17.145.142/api/getMyData`, {
    //       headers: { authorization: `Bearer ${global_.login_token}` }
    //       // headers: { "authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vb2xkY2l0eS5zb3V0aGVhc3Rhc2lhLmNsb3VkYXBwLmF6dXJlLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE1NTk3MDU1NjAsIm5iZiI6MTU1OTcwNTU2MCwianRpIjoiY0dtUkxRUGZLMHdaSHJBRiIsInN1YiI6InJvb3QxMjMiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.CrSlBMA6l2CUa2pYk9SdgGqLKShtyTeZdN6zu7XQ37M` }
    //     })
    //     .then(function(response) {
    //       if (status == 200) {
    //         self.user = response.data;
    //         self.userName = response.data.name;

    //         self.status = response.data.status;

    //         if(self.status == 4){
    //           self.isShow = true;;
    //         }
      
        
    //       }
    //     })
    //     .catch(function(error) {
    //     });
    // }
  }
};
</script>

