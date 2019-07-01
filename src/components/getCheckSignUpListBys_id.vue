<style>
.itemcontent {
  width: 500 dw;
  height: 500dh;
}
</style>


<template>
  <div>
  
    <div :key="item.su_id" v-for="item in getRes">
      <p>學生id:{{ item.su_id }}</p>
      <p>場次id:{{ item.s_id }}</p>
      <p>帳號:{{ item.account }}</p>
      <p>學生姓名:{{ item.name }}</p>
    </div>
    <!-- <div v-html="c_content"></div> -->
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";

export default {

  data() {
    return {
      s_id: this.$route.params.s_id,
      getRes: [],
      susessStr: "",
      // c_content: "",
      isShow: false,
      isEmpty:false
    };
  },
  mounted: function() {
    this.isAdmin();
    this.getcheckSignUp();
  },
  methods: {
    
    getcheckSignUp() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/getcheckSignUpListBys_id?s_id=${
            this.s_id
          }`,
          {
            headers: {
              authorization: `Bearer ${global_.login_token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        )
        .then(function(response) {
          self.getRes = response.data;
          if(self.getRes==""){
              console.log("空的")
              this.isEmpty=true
              
          }

          // self.c_content = response.data.c_content;
        })
        .catch(function(error) {});
    },
    isAdmin() {
      if (global_.userStatus == 4 || global_.userStatus == 3) {
        self.isShow = true;
        console.log("333");
        console.log(self.isShow);
      }
    }
  }
};
</script>