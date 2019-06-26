<template>
  <table border="0" align="center">
    <tr>
      <td>
        帳號:
        <input type="text" :name="users.account" v-model="users.account" autocomplete="on">
      </td>
      <td>
        密碼:
        <input type="password" :password="users.password" v-model="users.password">
      </td>
      <td>
        <button @click="login">登入</button>
      </td>
    </tr>
  </table>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";

export default {
  data() {
    return {
      users: {
        account: "",
        password: ""
      },

      getRes: []
    };
  },
  computed: {},
  // updated() {
  //     this.getData();
  // },
  methods: {
    login() {
      const self = this;
      axios
        .post("http://163.17.145.142/api/login", {
          account: this.users.account,
          password: this.users.password
        })
        .then(function(response) {
          if ((status = 200)) {
            global_.login_token = response.data;

            axios
              .get(
                `http://163.17.145.142/api/getMyData`,
                {
                  headers: { authorization: `Bearer ${global_.login_token}` }
                }
              )
              .then(function(response) {
                if (status == 200) {
                  self.getRes = response.data;
                  global_.isLogin = true;
                  global_.status = response.data.status;

                  console.log(global_.isLogin);
                  console.log(global_.status);
                  alert("已登入");
                  self.$emit("login");//使用外層方法
                  self.$router.push({ path: `/index` });
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
