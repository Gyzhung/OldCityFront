<style scoped>
table.search {
  margin: auto 5%;
  width: 90%;
  border: solid;
  border-width: 5px;
  padding: 15px;
}
.bar {
  text-align: center;
  margin: 5% auto 5%;
}
.search th {
  background-color: gray;
  color: white;
}
.search tr {
  border: solid;
  border-width: 3px;
}
td {
  border-right: solid;
  border-width: 1px;
  padding: 10px;
}
h1 {
  margin: auto 5%;
  margin-top: 5%;
  margin-bottom: 2%;
}
</style>

<template>
  <div>
    <!--eslint-disable-next-line-->
    <h1
      v-if="index == 1"
      v-for="(ses,index) in sesRes"
      :key="ses.c_name"
      width="100%"
    >{{ses.c_name}}</h1>
    <table class="search">
      <tr>
        <th>場次名稱 </th>
        <th>場次ID </th>
        <th>報名開始</th>
        <th>報名截止</th>
        <th>課程開始</th>
        <th>課程結束</th>
        <th></th>
      </tr>
      <tr :key="ses.s_id" v-for="ses in sesRes">
        <td>{{ses.session_name}}</td>
        <td><router-link :to="{name:'getUncheckSignUp',params:{s_id:ses.s_id}}">查詢報名審核名單 {{ses.s_id}}</router-link></td>
        <td>{{ses.signUpTime_start}}</td>
        <td>{{ses.signUpTime_end}}</td>
        <td>{{ses.sessions_start}}</td>
        <td>{{ses.sessions_end}}</td>
        <td>
          <router-link
            tag="button"
            :to="{name:'Session',params:{s_id:ses.s_id}}"
          >{{sign}}{{ses.Is_signUp}}</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  props: ["islogin"],
  data() {
    return {
      sesRes: [],
      cc_id: this.$route.params.c_id,
      sign: "",
      Is_signUp: "",
      isShow:false
    };
  },
  mounted() {
    this.isAdmin();
    alert(this.islogin);

    if (this.islogin) {
      this.getLses();
    } else {
      this.getses();
    }
  },
  methods: {
     isAdmin() {
      if (global_.userStatus == 4 || global_.userStatus == 3) {
        self.isShow = true;
        console.log(2222222222);
        console.log(self.isShow);
      }
    },
    getses() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/getSessionListByc_id?c_id=${this.cc_id}`
        )
        .then(function(response) {
          self.sesRes = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getLses() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/get_L_SessionListByc_id?c_id=${
            this.cc_id
          }`,
          { headers: { authorization: `Bearer ${global_.login_token}` } }
        )
        .then(function(response) {
          self.sesRes = response.data;

          for (var i = 0; i <= response.data.length - 1; i++) {
            const a = response.data[i].Is_signUp;
            console.log(a);
            if(a > 0 ){
                response.data[i].Is_signUp = "已報名";
            }else{
                response.data[i].Is_signUp = "報名";
            }
          }
          
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // signUp() {

    //   axios
    //     .post(
    //       `http://163.17.145.142/api/addSignUp?s_id=${this.rou}`,
    //       {},
    //       {
    //         headers: {
    //           authorization: `Bearer ${global_.login_token}`
    //         }
    //       }
    //     )
    //     .then(function(response) {
    //       if ((status = 200)) {
    //         alert("報名成功");
    //         self.isSign = "已報名";
    //       }
    //     })
    //     .catch(function(error) {
    //       alert(response);
    //       alert("報名失敗");
    //     });
    // }
  }
};
</script>
