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
      <div style="min-height: 80vh;margin-top:50px;">
        <!--eslint-disable-next-line-->
        <!-- <h1 width="100%">{{sessions?sessions[0].c_name:""}}</h1> -->
        <table class="search">
          <tr>
              <th>帳號</th>
              <th>姓名</th>
              <th>場次</th>
              <th></th>
          </tr>
          <tr :key="su_user.su_id" v-for="su_user in su_users">
              <td>{{su_user.account}}</td>
              <td>{{su_user.name}}</td>
              <td>{{su_user.title}}</td>
              <!-- <td>{{Branch.signUpTime_start}}</td>
              <td>{{Branch.signUpTime_end}}</td>
              <td>
                <router-link tag="button" :to="{name:'Branch_content',params:{b_id:Branch.b_id}}" >
                  查看
                </router-link>
              </td> -->
              <td v-if="user.status == 4">
                <button v-if="su_user.reviewResult != 1" class="btn btn-primary" @click="reviewSignUp(su_user.su_id,su_user.reviewResult)">
                  審核
                </button>
                <div v-else>已審核</div>
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
            su_users:[]
        }
    },
    watch: {
        user:function(n,o) {
            if (o == "") {
                const self = this;
                this.$http.get(`http://163.17.145.142/api/getSignUpListByb_id`,
                    {
                        headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                        params:{
                            b_id:this.$route.params.b_id
                        },
                        
                    }
                )
                .then(function(response) {
                    self.su_users = response.data;
                })
                .catch(function(error) {
                });
            }
        }
    },
    mounted() {

        const self = this;
        if (this.$GLOBAL.login_token !='') {
          this.$http.get(`http://163.17.145.142/api/getSignUpListByb_id`,
            {
                headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                params:{
                    b_id:this.$route.params.b_id
                },
                
            }
          )
          .then(function(response) {
            self.su_users = response.data;
          })
          .catch(function(error) {
          });
        }
    },
    methods: {
      reviewSignUp:function(su_id,reviewResult){
        const self = this;
        const data ={
          su_id: su_id,
          reviewResult : 1
        }
        this.$http.post(`http://163.17.145.142/api/reviewSignUp`,data,
          {
              headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
          }
        )
        .then(function(response) {
          alert(response.data)
          self.update_signup();
        })
        .catch(function(error) {
        });
      },
      update_signup:function() {
        const self = this;
        this.$http.get(`http://163.17.145.142/api/getSignUpListByb_id`,
        {
            headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
            params:{
                b_id:this.$route.params.b_id
            },
            
        })
        .then(function(response) {
            self.su_users = response.data;
        })
        .catch(function(error) {
        });
      },
    },
    
}
</script>

