<style >
* {
  font-family: Microsoft JhengHei;
  
}
.home{
  position: relative;
  height: 100%;
}
.contentroute{
  height:100%;
}
</style>

<template>
  <div class="home">

    <v-header></v-header>
    <div class="contentroute">
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
    
  </div>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";
import header from "@/components/header.vue"
import footer from "@/components/footer.vue"
export default {
  components:{
      'v-header' : header,
      'v-footer' : footer,
  },
  data() {

    return {
      getRes: [],
      isLogin: true
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(global_.login_token);
      const self = this;
      axios
        .get(`http://localhost/api/getMyData`, {
          headers: { authorization: `Bearer ${global_.login_token}` }
        })
        .then(function(response) {
          if (status == 200) {
            self.getRes = response.data;
            global_.isLogin = false;
            self.isLogin = global_.isLogin;
            console.log(global_.isLogin);
            alert("yess");
          } else {
            global_.isLogin = true;
            self.isLogin = global_.isLogin;
            alert("dddd");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

