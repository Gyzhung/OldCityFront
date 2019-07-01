<style scoped>
.itemcontent {
  width: 500 dw;
  height: 500dh;
}
</style>


<template>
  <div>
    <div :key="item.s_id" v-for="item in getRes">
    <router-link :to="{name:'/getUncheckSignUpListBys_id',params:{s_id:item.s_id}}" v-if="isShow">查詢報名審核名單 {{ item.s_id }}</router-link>
      <p>場次:{{ item.s_id }}</p>
      <p>課程名稱:{{ item.c_name }}</p>
      <p>場次名稱:{{ item.session_name }}</p>
      <p>場次開始報名日期:{{ item.signUpTime_start }}</p>
      <p>場次結束報名日期:{{ item.signUpTime_end }}</p>
      <p>場次開始日期:{{ item.sessions_start }}</p>
      <p>場次結束日期:{{ item.sessions_end }}</p>
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
      c_id: this.$route.params.c_id,
      getRes: [],
      getDataRes: [],
      // c_content: "",
      isShow: false
    };
  },
  mounted: function() {
    this.isAdmin();
    this.getSessionList();
  },
  methods: {
    getSessionList() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/api/getSessionListByc_id?c_id=${this.c_id}`
        )
        .then(function(response) {
          self.getRes = response.data;
          // self.c_content = response.data.c_content;
          console.log(self.c_content);
        })
        .catch(function(error) {});
    },
    isAdmin() {
      if (global_.userStatus == 4 || global_.userStatus == 3) {
        self.isShow = true;
        console.log(self.isShow);
      }
    }
  }
};
</script>