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
</style>

<template>
    <div class="content">
    <div class="form session">
      <div class="row">
        <div class="table-header col-lg-6" v-if="!!Branches">
          <div v-if="Branches[0] != undefined">{{Branches?Branches[0].session_name:""}}</div>
          <div v-else>尚未建立任何場次</div>
        </div>
        <div class="col-lg-9 col-md-9 col-sm-10 col-12 mb-2" style="margin: 0 auto;" v-if="user.status ==4">
          <div style="float:left;">
            <router-link :to="{name:'createBranch',params:{s_id:$route.params.s_id}}"  class="btn btn-success" style="color:white;">新增</router-link>
          </div>
        </div>
        <table class="table col-lg-9 col-md-9 col-sm-10 col-12">
            <thead>
                <tr>
                  <th>流程名稱 </th>
                  <th>報名開始</th>
                  <th>報名截止</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="Branch in Branches" :key="Branch.b_id">
                  <td>{{Branch.title}}</td>
                  <td>{{Branch.signUpTime_start.substr(0,10)}}</td>
                  <td>{{Branch.signUpTime_end.substr(0,10)}}</td>
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
                          <!-- <a class="dropdown-item" href="#">修改</a> -->
                          <!-- <a class="dropdown-item" href="#">刪除</a> -->
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
      Branches:null
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
      const self = this;
      if (this.user == '') {
        this.$http.get(`${this.$GLOBAL.path}/api/getBranchListBys_id`,{params:{ s_id:this.$route.params.s_id}})
        .then(function(response) {
          self.Branches = response.data;
          
        })
        .catch(function(error) {
        });
      }else{
        this.$http.get(`${this.$GLOBAL.path}/api/get_L_BranchListBys_id`,
        {headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },params:{s_id:this.$route.params.s_id},})
        .then(function(response) {
          self.Branches = response.data;
          
        }).catch(function(error) {
        });
      }
      
    }
  },
}
</script>