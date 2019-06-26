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
    <div class="search" :key="item" v-for="item in getRes">
      <p>課程名稱:{{ item.c_name }}</p>
      <p>課程時間:{{ item.c_duration}}</p>
      <p>開始報名日期:{{ item.c_signUpTime_start}}</p>
      <p>結束報名日期:{{ item.c_signUpTime_end}}</p>
      <p>課程人數上限:{{ item.c_maxNum}}</p>
      <p>課程簡介:{{ item.c_introduce }}</p>
      <p>課程內容:{{ item.c_content }}</p>
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
      userStatus:''
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
  methods: {
    search() {
        console.log(global_.login_token);
      const self = this;
      axios
        .post(`http://oldcity.southeastasia.cloudapp.azure.com/api/searchCourse`, {
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
