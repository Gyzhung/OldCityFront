<style scoped>
.content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table td{
  vertical-align: middle;
}
.table th{
  vertical-align: middle;
}
.table-header {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.btn-lightbrown{
 margin-top: 2rem;
 font-weight: 600;
 letter-spacing: 2px;
}
.btn-enter{
  float: right;
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover{
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
.session{
  margin: 0 auto;
  width: 70%;
  min-height: 70vh;
}
</style>

<template>
  <div class="content">
    <div class="form session">
      <div class="row">
        <div class="table-header col-lg-6" v-if="!!sessions">
          <div v-if="sessions[0] != undefined">{{sessions[0].c_name}}</div>
          <div v-else>尚未建立任何場次</div>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-6 col-10 mb-2" style="margin: 0 auto;" v-if="user.status ==4">
          <div style="float:left;">
            <router-link :to="{name:'createSession',params:{c_id:$route.params.c_id}}"  class="btn btn-success" style="color:white;">新增</router-link>
          </div>
        </div>
        <table class="table col-lg-9 col-md-9 col-sm-6 col-10">
            <thead>
                <tr>
                    <th width="10%"></th>
                    <th>場次名稱</th>
                    <th width="15%"></th>
                    <th width="15%" v-if="user.status ==4"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="session in sessions" :key="session.s_id">
                    <th scope="row">{{session.s_id}}</th>
                    <td>{{session.session_name}}</td>
                    <td>
                        <router-link :to="{name:'Branch',params:{s_id:session.s_id}}" class="btn btn-enter">查看</router-link>
                    </td>
                    <td v-if="user.status ==4">
                        <button @click="delete_session(session.s_id)" class="btn btn-danger">刪除</button>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: ["user"],
  data() {
    return {
      sessions: null,
    };
  },
  mounted() {
    this.getSession();
  },
  methods: {
    getSession() {
      const self = this;
      this.$http.get(`http://163.17.145.142/api/getSessionListByc_id?c_id=${this.$route.params.c_id}`)
      .then(function(response) {
        self.sessions = response.data;
      })
      .catch(function(error) {
      });
    },
    delete_session:function(s_id) {
      const data ={
        s_id :s_id
      }
      const self = this;
      if(confirm("確定刪除活動/課程?"))
      {
        this.$http.post(`http://163.17.145.142/api/deleteSession`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
        .then(function(response) {
          if ((status = 200)) {
            self.getSession();
          }
        })
        .catch(function(error) {
          console.log(error.response)
        });
      }
    }
  }
};
</script>
