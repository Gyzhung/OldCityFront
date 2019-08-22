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
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover{
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
.session{
  margin: 0 auto;
  min-height: 70vh;
}
</style>

<template>
  <div class="content">
    <div class="form session">
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="table-header col-lg-6" v-if="!!sessions">
            <div v-if="sessions[0] != undefined">{{sessions[0].c_name}}</div>
            <div v-else>尚未建立任何場次</div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-7 col-md-8 col-sm-9 col-11 mb-2" v-if="user.status ==4">
            <div>
              <router-link :to="{name:'createSession',params:{c_id:$route.params.c_id}}"  class="btn btn-success" style="color:white;">新增</router-link>
            </div>
          </div>
        </div>
        <div class="row">
          <table class="table col-lg-7 col-md-8 col-sm-9 col-11">
              <thead>
                  <tr>
                      <th width="10%"></th>
                      <th>場次名稱</th>
                      <th width="202px"></th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(session,index) in sessions" :key="session.s_id">
                      <th scope="row">{{index + 1 }}</th>
                      <td>{{session.session_name}}</td>
                      <td>
                        <div  class="form-inline">
                            <router-link :to="{name:'Branch',params:{s_id:session.s_id}}" class="btn btn-enter mr-2">查看</router-link>
                            <div v-if="user.status == 4" class="dropdown" >
                              <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">功能</button>
                              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <!-- <router-link  class="dropdown-item" :to="{name:'checkSignUp',params:{b_id:Branch.b_id}}" >審核</router-link>
                                <router-link  class="dropdown-item" :to="{name:'completed',params:{b_id:Branch.b_id}}" >點名</router-link> -->
                                <!-- <router-link  class="dropdown-item" :to="`/wizardreview/${session.s_id}`" >審核嚮導</router-link> -->
                                <div class="dropdown-divider"></div>
                                <button @click="delete_session(session.s_id)" class="dropdown-item">刪除</button>
                              </div>
                            </div>
                          </div>
                      </td>
                  </tr>
              </tbody>
          </table>
        </div>
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
      this.$http.get(`${this.$GLOBAL.path}/api/getSessionListByc_id?c_id=${this.$route.params.c_id}`)
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
        this.$http.post(`${this.$GLOBAL.path}/api/deleteSession`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
        .then(function(response) {
          if ((status = 200)) {
            self.getSession();
          }
        })
        .catch(function(error) {
          //console.log(error.response)
        });
      }
    }
  }
};
</script>
