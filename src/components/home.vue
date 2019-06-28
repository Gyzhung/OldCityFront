<style >
* {
  font-family: Microsoft JhengHei;
}
.home {
  position: relative;
  height: 100%;
}
.contentroute {
  height: 100%;
}
</style>

<template>
  <div class="home">
    <Header :islogin="isLogin" :userName="userName"></Header>
    
    <router-view @login="login" :isShow="isShow" :islogin="isLogin"></router-view>
    <!-- <div class="contentroute">
    
    </div> -->
    <!-- <v-footer></v-footer> -->
  </div>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";

import footer from "@/components/footer.vue";
export default {

  data() {
    return {
      getRes: [],
      isLogin: false,
      isShow:false,
      userName:''
    };
  },
  updated: function() {
   this.getData();
  },
  methods: {
    login() {//再login.vue內套用
        this.isLogin = true;
    },
    getData() {
      
      const self = this;
      axios
        .get(`http://163.17.145.142/api/getMyData`, {
          headers: { authorization: `Bearer ${global_.login_token}` }
          // headers: { "authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vb2xkY2l0eS5zb3V0aGVhc3Rhc2lhLmNsb3VkYXBwLmF6dXJlLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE1NTk3MDU1NjAsIm5iZiI6MTU1OTcwNTU2MCwianRpIjoiY0dtUkxRUGZLMHdaSHJBRiIsInN1YiI6InJvb3QxMjMiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.CrSlBMA6l2CUa2pYk9SdgGqLKShtyTeZdN6zu7XQ37M` }
        })
        .then(function(response) {
          if (status == 200) {
            self.getRes = response.data;
            self.userName = response.data.name;

            self.status = response.data.status;

            if(self.status == 4){
              self.isShow = true;
              console.log("是管理員");
            }
      
        
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

