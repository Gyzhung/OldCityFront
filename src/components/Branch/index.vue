<style scoped>
.content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table td {
  vertical-align: middle;
}
.table th {
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
.btn-lightbrown {
  font-weight: 600;
  letter-spacing: 2px;
}
.btn-enter {
  float: right;
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover {
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
.session {
  margin: 0 auto;
  width: 90%;
  min-height: 70vh;
}
@media (max-width: 1225px) {
  .th_w{
    width: 15%;
  }
  
}
@media (max-width: 972px) {
  .th_w{
    width: 20%;
  }
  
}
@media (max-width: 650px) {
  .th_w{
    width: 25%;
  }
  
}
</style>

<template>
    <div class="content">
    <div class="form session">
      <div class="row">
        <div class="table-header col-lg-6" >
          <div v-if="Branches.length != 0">{{Branches[0].session_name}}</div>
          <div v-else>尚未建立任何場次</div>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-10 col-12 mb-2" style="margin: 0 auto;" >
          <div style="float:left;" v-if="user.status == 4">
            <router-link :to="{name:'createBranch',params:{s_id:$route.params.s_id}}"  class="btn btn-success" style="color:white;">新增</router-link>
          </div>
          <div style="float:right;" v-if="Branches.length != 0"> 
            <router-link :to="{name:'Session',params:{c_id:Branches[0].c_id}}"  class="btn btn-warning" style="color:white;">返回</router-link>
          </div>
        </div>
        <table class="table col-lg-9 col-md-9 col-sm-10 col-12">
            <thead>
                <tr>
                  <th></th>
                  <th>流程名稱 </th>
                  <th class="th_w">活動時間</th>
                  <th class="th_w">報名時間</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(Branch,index) in time_filter_Branch" :key="Branch.b_id">
                  <td>{{index+1}}</td>
                  <td>{{Branch.title}}</td>
                  <td v-html="eventTime(Branch)"></td>
                  <td v-html="signUpTime(Branch)"></td>
                  <td class="form-inline">
                    <div class="pt-1 pl-2">
                      <router-link tag="button"  class="btn btn-primary" :to="{name:'Branch_content',params:{b_id:Branch.b_id}}" >
                        查看
                      </router-link>
                    </div>
                    <div class="pt-1 pl-2">
                      <button type="button" style="font-size:17px" @click="deleteSignUp(Branch.su_id)"  class="btn btn-lightbrown" v-if="user !='' && Branch.Is_signUp == 1">已報名</button>
                      <button v-else type="button" @click="addSignUp(Branch.b_id)" class="btn btn-lightbrown">報名</button>
                    </div>
                    <div v-if="user.status == 4" class="pt-1 pl-2">
                      <div class="dropdown" >
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">功能</button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <router-link  class="dropdown-item" :to="{name:'checkSignUp',params:{b_id:Branch.b_id}}" >審核</router-link>
                          <router-link  class="dropdown-item" :to="{name:'completed',params:{b_id:Branch.b_id}}" >點名</router-link>
                          <router-link  class="dropdown-item" :to="{name:'Branch_photo',params:{b_id:Branch.b_id}}" >花絮</router-link>
                          <button class="dropdown-item" @click="sendMail(Branch.b_id)">發送行前信</button>
                          <!-- <a class="dropdown-item" href="#">修改</a> -->
                          <button class="dropdown-item" @click="delbranch(Branch.b_id)">刪除</button>
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
</template>
<script>
export default {
  props:['user'],
  data() {
    return {
      Branches:[]
    }
  },
  watch: {
    user:function(n,o) {
        if (o == "") {
            this.getBranchesData(this.user);
        }
    }
    },
  mounted() {
    this.getBranchesData(this.user);
  },
  methods: {
    addSignUp:function(b_id) {
      const data = {
          b_id : b_id
      }
      const self = this;
      this.$http.post(`${this.$GLOBAL.path}/api/addSignUp`,data,{ headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
      .then(function(response) {
          alert("報名成功");
          self.getBranchesData(self.user);
      })
      .catch(function(error) {
          alert(error.response.data);
      }); 
    },
    deleteSignUp:function(su_id) {
      const self = this;
      if(confirm("取消報名"))
      {
        const data ={
          su_id:su_id
        }
        this.$http.post(`${this.$GLOBAL.path}/api/deleteSignUp`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
        .then(function(response) {
          alert("取消成功")
          self.getBranchesData(self.user);
        })
        .catch(function(error) {
          alert(error.response.data)
        });
      }
    },
    getBranchesData:function(user){
      let header;
      if (this.user == '') {
        header = {
          params:{ 
            s_id:this.$route.params.s_id
          }
        }
      }else{
        header = {
          headers: { 
            authorization: `Bearer ${this.$GLOBAL.login_token}` 
          },
          params:{ 
            s_id:this.$route.params.s_id
          }
        }
      }
      this.$http.get(`${this.$GLOBAL.path}/api/getBranchListBys_id`,header)
      .then(response => {
        this.Branches = response.data;
      })
      .catch(error => {
        console.log(error.response)
      });
      
    },
    signUpTime:function (Branch) {
      return `${Branch.signUpTime_start.substr(5,5)}~<br/>${Branch.signUpTime_end.substr(5,5)}`
    },
    eventTime:function (Branch) {
      return `${Branch.eventTime_start.substr(5,5)}~<br/>${Branch.eventTime_end.substr(5,5)}`
    },
    delbranch:function(b_id) {
      const self = this;
      if(confirm("刪除流程?"))
      {
        const data ={
          b_id:b_id
        }
        this.$http.post(`${this.$GLOBAL.path}/api/deleteBranch`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
        .then(function(response) {
          self.getBranchesData(self.user);
          alert(response.data)
        }).catch(function(error) {
          alert(error.response)
        });
      }
    },
    sendMail:function (b_id) {
      if(confirm("確認發送行前信?"))
      {
        this.$http.get(`${this.$GLOBAL.path}/api/sendEventTips`,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },params:{b_id:b_id}})
        .then(function(response) {
          alert(response.data)
        }).catch(function(error) {
          alert(error.response)
        });
      }
    },
  },computed: {
    time_filter_Branch:function() {
      if (this.Branches.length != 0) {
        return this.Branches.filter(a=>new Date(Date.parse(a.eventTime_end.replace(/-/g,"/"))) >= new Date());
      }
      
    }
  },
}
</script>