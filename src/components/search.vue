<style>
</style>

<template>
  <div>
    <table border="0" align="center">
      <tr>
        <td>
          搜尋:
          <input type="text" :keystr="keyword.keystr" v-model="keyword.keystr" autocomplete="on">
        </td>
        <button @click="search">搜尋</button>
      </tr>
    </table>
    <!--eslint-disable-next-line-->
    <div class="search" :key="item.c_id" v-for="item in getRes">
      <router-link :to="{name:'getSessionListByc_id',params:{c_id:item.c_id}}">查詢場次 {{ item.c_id }}</router-link>
      <p>課程名稱:{{ item.c_name }}</p>
      <p>課程時間:{{ item.duration}}</p>
      <p>課程人數上限:{{ item.maxNum}}人</p>
      <p>課程簡介:{{ item.introduce }}</p>
      <router-link :to="{name:'getCourse',params:{c_id:item.c_id}}">更多資訊</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  data() {
    return {
      keyword: {
        keystr: "",
        time: ""
      },
      getRes: [],
      userStatus: ""
      //   getRes: {
      //     c_id: "",
      //     c_name: "",
      //     c_duration: "",
      //     c_signUpTime_start: "",
      //     c_signUpTime_end: "",
      //     c_maxNum: "",
      //     c_introduce: "",
      //     c_content: "",
      //     c_type: "",
      //     c_pic: "",
      //     created_at: ""
      //   }
    };
  },
  mounted: function() {
    const self = this;
    axios
      .post(`http://163.17.145.142/api/searchCourse`, {
        keyword: `all:`
      })

      .then(function(response) {
        if ((status = 200)) {
          self.getRes = response.data;
        }
      })
      .catch(function(error) {
        console.log(error);
        alert(response);
      });
  },
  methods: {
    search() {
      console.log(global_.login_token);
      const self = this;

      axios
        .post(`http://163.17.145.142/api/searchCourse`, {
          keyword: `${this.keyword.keystr}`
        })
        .then(function(response) {
          if ((status = 200)) {
            self.getRes = response.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
