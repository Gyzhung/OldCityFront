<template>
  <div>
    <table border="0" align="center">
      <tr>
        <td>
          場次名稱:
          <input
            type="text"
            :s_session_name="session.s_session_name"
            v-model="session.s_session_name"
          >
        </td>
        <td>
          報名開始日期:
          <input
            type="text"
            :s_signUpTime_start="session.s_signUpTime_start"
            v-model="session.s_signUpTime_start"
          >
        </td>
      </tr>

      <tr>
        <td>
          報名結束日期:
          <input
            type="text"
            :s_signUpTime_end="session.s_signUpTime_end"
            v-model="session.s_signUpTime_end"
          >
        </td>
        <td>
          場次開始日期:
          <input
            type="text"
            :s_sessions_start="session.s_sessions_start"
            v-model="session.s_sessions_start"
          >
        </td>
        <td>
          場次結束日期:
          <input
            type="text"
            :s_sessions_end="session.s_sessions_end"
            v-model="session.s_sessions_end"
          >
        </td>
      </tr>
      <button @click="addSession">增加場次</button>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";

export default {
  data() {
    return {
      c_id: this.$route.params.c_id,
      session: {
        s_session_name: "",
        s_signUpTime_start: "",
        s_signUpTime_end: "",
        s_sessions_start: "",
        s_sessions_end: ""
      }
    };
  },
  methods: {
    addSession() {
      console.log(this.c_id);
      const self = this;
      axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/addSession`,
          {
            c_id: this.c_id,
            s_session_name: this.session.s_session_name,
            s_signUpTime_start: this.session.s_signUpTime_start,
            s_signUpTime_end: this.session.s_signUpTime_end,
            s_sessions_start: this.session.s_sessions_start,
            s_sessions_end: this.session.s_sessions_end
          },
          { headers: { authorization: `Bearer ${global_.login_token}` } }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("建立成功");
          }
        })
        .catch(function(error) {
          console.log(self.s_session_name);
          console.log(error.response.data);
        });
    }
  }
};
</script>
<style>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>