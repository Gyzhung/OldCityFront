<style scoped>
table.search {
  margin: auto auto;
  width: 60%;
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
    <div class="content">
      <div style="min-height: 70vh;margin-bottom:100px;">
        <!--eslint-disable-next-line-->
        <h1 width="100%" v-if="!!Branches">{{Branches?Branches[0].session_name:""}}</h1>
        <table class="search">
        <tr>
            <th>流程名稱 </th>
            <th>報名開始</th>
            <th>報名截止</th>
            <th></th>
            <th></th>
            <th v-if="user.status == 4"></th>
        </tr>
        <tr :key="Branch.b_id" v-for="Branch in Branches">
            <td>{{Branch.title}}</td>
            <td>{{Branch.signUpTime_start}}</td>
            <td>{{Branch.signUpTime_end}}</td>
            <td>
              <router-link tag="button"  class="btn btn-primary" :to="{name:'Branch_content',params:{b_id:Branch.b_id}}" >
                查看
              </router-link>
            </td>
            <td>
              <div v-if="user !='' && Branch.Is_signUp == 1">已報名</div>
              <button v-else type="button" @click="addSignUp(Branch.b_id)" class="btn btn-lightbrown">報名</button>
            </td>
            <td v-if="user.status == 4">
              <router-link tag="button"  class="btn btn-success" :to="{name:'checkSignUp',params:{b_id:Branch.b_id}}" >
                審核
              </router-link>
            </td>
            
        </tr>
        </table>
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
            const self = this;
            this.$http.get(`http://163.17.145.142/api/get_L_BranchListBys_id`,
                {
                    headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                    params:{
                        s_id:this.$route.params.s_id
                    },
                    
                }
            )
            .then(function(response) {
                self.Branches = response.data;
                console.log(response)
            })
            .catch(function(error) {
                console.log(error.response);
            });
        }
    }
    },
  mounted() {
    const self = this;
    if (this.user == '') {
      this.$http.get(`http://163.17.145.142/api/getBranchListBys_id`,{
      params:{
        s_id:self.$route.params.s_id
      }}
      )
      .then(function(response) {
        self.Branches = response.data;
        console.log(response)
      })
      .catch(function(error) {
        console.log(error.response);
      });
    }else{
      this.$http.get(`http://163.17.145.142/api/get_L_BranchListBys_id`,
      {
        headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
        params:{
            b_id:this.$route.params.b_id
        },
        
      }).then(function(response) {
        self.Branches = response.data;
        console.log(response)
      }).catch(function(error) {
        console.log(error.response);
      });
    }
    
    
  },
  methods: {
    addSignUp:function(b_id) {
      const data = {
          b_id : b_id
      }
      const self = this;
      this.$http.post(`http://163.17.145.142/api/addSignUp`,data,
          {
              headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }
          }
      )
      .then(function(response) {
          alert("報名成功");

          self.$http.get(`http://163.17.145.142/api/get_L_BranchListBys_id`,{
            params:{
              s_id:self.$route.params.s_id
            },
            headers: { authorization: `Bearer ${self.$GLOBAL.login_token}` }}
          )
          .then(function(response) {
            self.Branches = response.data;
            console.log(response)
          })
          .catch(function(error) {
            console.log(error.response);
          });
      })
      .catch(function(error) {
          alert(error.response.data);
          console.log(error.response);
      }); 
    }
  },
}
</script>