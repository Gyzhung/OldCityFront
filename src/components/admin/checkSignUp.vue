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
.btn-blue{
  background-color: #60ABCB;
  color:#ffffff;
  font-weight: 700;
}
.btn-blue:hover{
  background-color: #4A869F;
  color: #ffffff;
}
</style>
<style>
  @import url('../../assets/css/tooltip.css');
</style>

<template>
    <div class="content">
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                {{show_user_data.name}} 的個人資料
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row justify-content-center">
                  <div class="col-sm-11 text-center">
                      <img v-if="show_user_data.profile_pic != null" :src="`${this.$GLOBAL.path}/images/ThumbnailImage/${show_user_data.profile_pic}`" alt="">
                      <img v-else src="../../assets/user.png" alt="">                  
                  </div>
              </div>
              <!-- <div class="row justify-content-center">
                  <div class="col-sm-11">
                      帳號 : {{show_user_data.account}}
                  </div>
              </div> -->
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      姓名 : {{show_user_data.name}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      生日 : {{show_user_data.birthday}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      身分證字號 : {{show_user_data.identity_num}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      電子信箱 : {{show_user_data.email}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      家用電話 : {{show_user_data.tel}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      行動電話 : {{show_user_data.cel}}
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col-sm-11">
                      性別 : {{genderTostring(show_user_data.gender)}}
                  </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_modal">關閉</button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="table-header col-lg-6 " v-if="su_users.length!=0">
          {{su_users[0].title}}
        </div>
      </div>
      <div class="row justify-content-center mb-3" v-if="su_users.length!=0">
        <div class="col-lg-9 col-md-10 col-sm-10 col-12">
          <router-link tag="button" class="btn btn-warning" :to="{name:'Branch',params:{s_id:su_users[0].s_id}}">返回</router-link>
        </div>
      </div>
      <div class="row justify-content-center">
        <table class="table table-bordered col-lg-9 col-md-10 col-sm-10 col-12">
            <tbody>
                <tr>
                    <th scope="row">#</th>
                    <th scope="row">姓名</th>
                    <th scope="row">帳號</th>
                    <th width="10%">審核</th>
                </tr>
                <tr :key="su_user.su_id" v-for="(su_user,index) in su_users" @click="showuser(su_user.account)">
                    <td>{{index+1}}</td>
                    <td>{{su_user.name}}</td>
                    <td>{{su_user.account}}</td>
                    <td> 
                      <button v-if="su_user.reviewResult != 1" class="btn btn-primary" @click.stop="reviewSignUp(su_user.su_id,su_user.reviewResult)">
                        審核
                      </button>
                      <div v-else>已審核</div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>   
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            su_users:[],
            tooltip_msg:"點擊前往用戶個人頁面",
            show_user_data:{}
        }
    },
    watch: {
        user:function(n,o) {
            if (o == "") {
                const self = this;
                this.$http.get(`${this.$GLOBAL.path}/api/getSignUpListByb_id`,
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
      console.log(this.$route.meta.s_id)
        const self = this;
        if (this.$GLOBAL.login_token !='') {
          this.$http.get(`${this.$GLOBAL.path}/api/getSignUpListByb_id`,
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
        this.$http.post(`${this.$GLOBAL.path}/api/reviewSignUp`,data,
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
        this.$http.get(`${this.$GLOBAL.path}/api/getSignUpListByb_id`,
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
      showuser:function(user_account) {
        const self =  this;
        this.$http.get(`${this.$GLOBAL.path}/api/getUserDataByAdmin`,{
        headers:{ 
            authorization: `Bearer ${this.$GLOBAL.login_token}`
        },
        params:{
            get_account:user_account
        }})
        .then(function(response) {
            self.show_user_data = response.data;
        })
        .catch(function(error) {
            console.log(error.response)
        });
        $("#exampleModal").modal('show');
      },
      genderTostring:function(gender){
        switch (gender) {
            case 0:
                return "女"
                break;
            case 1:
                return "男"
                break;
            default:
                return "其他"
                break;
        }
      },
      close_modal:function() {
        this.show_user_data = {}
      }
    },
    
}
</script>

