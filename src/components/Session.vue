<style scoped>
.sesDetail {
  background-color: rgb(255, 238, 190);
  border: 2px burlywood;
  font-family: Microsoft JhengHei;
}

label {
  font-size: 34px;
  color: #94693f;
  font-weight: bold;
  font-family: Microsoft JhengHei;
}
.newsText {
  margin-top: 5px;
  margin-left: 10px;
  font-family: Microsoft JhengHei;
  font-size: 15px;
  border: 3px burlywood;
}
input {
  background: #dacfb8;
  border-radius: 5px;
  padding: 5px 15px;
}
input#search::-webkit-input-placeholder {
  color: #ffffff;
  font-family: Microsoft JhengHei;
}
</style>

<template>
  <div class="sesDetail" align="center">
    <label>場次詳細</label>
    <table class="newsText" border="1">
      <tr>
        <th>場次名稱</th>
        <th>報名開始</th>
        <th>報名截止</th>
        <th>課程開始</th>
        <th>課程結束</th>

      </tr>
      <tr  v-for="ses in sesDRes">
        <td>{{ses.session_name}}</td>
        <td>{{ses.signUpTime_start}}</td>
        <td>{{ses.signUpTime_end}}</td>
        <td>{{ses.sessions_start}}</td>
        <td>{{ses.sessions_end}}</td>
      </tr>
      <tr>
        <td>
          <button @click="signUp">{{sign}}</button>
        </td>
      </tr>
    </table>
  </div>

  <!-- 8 -->
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
import router from "@/router";
export default {
  data() {
    return {
      sesDRes: [],
      s_id: this.$route.params.s_id,
      sign: "報名",
      c_id: "",
      c_name: "",
      session_name: "",
      sessions_end: "",
      sessions_start: "",
      signUpTime_end: "",
      signUpTime_start: "",
     
    };
  },
  mounted() {
    this.getsesD();
  },
  methods: {
    getsesD() {
      const self = this;
      axios
        .get(`http://163.17.145.142/api/getSessionData?s_id=${this.s_id}`, {
          headers: { authorization: `Bearer ${global_.login_token}` }
        })
        .then(function(response) {
          self.sesDRes = response.data;
  
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    signUp() {
      axios
        .post(
          `http://163.17.145.142/api/addSignUp?s_id=${this.s_id}`,
          {},
          {
            headers: {
              authorization: `Bearer ${global_.login_token}`
            }
          }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("報名成功");
            router.go(-1);
          }
        })
        .catch(function(error) {
          alert(error);
          alert("報名失敗");
        });
    }
  }
};
</script>
