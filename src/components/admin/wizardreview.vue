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
<template>
    <div class="content">
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel" v-if="showUserCompleted.length != 0">
                {{showUserCompleted[0].name}} 的點名資料
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div v-for="(Completed,index) in CompletedList" :key="index">
                課程名稱:{{Completed.title}}<br/>
                點名狀態:{{completeExtent_tostring(Completed.completeExtent)}}
                <hr/>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close_modal">關閉</button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
        </div>
      </div>
        <div class="table-header col-lg-6" v-if="Completedusers.length != 0">審核嚮導-{{Completedusers[0].session_name}}</div>
        <table class="table table-bordered col-lg-9 col-md-10 col-sm-10 col-12">
            <tbody>
                <tr>
                    <th scope="row">#</th>
                    <th scope="row">姓名</th>
                    <th scope="row">帳號</th>
                    <th scope="row">審核</th>
                </tr>
                <tr v-for="(Completeduser,index) in Completedusers" :key="index" @click="getUserData(Completeduser.account)">
                    <td>{{index+1}}</td>
                    <td>{{Completeduser.name}}</td>
                    <td>{{Completeduser.account}}</td>
                    <td>
                      <button class="btn btn-primary" @click.stop="addDegree(Completeduser.account)">審核</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            Completedusers:[],
            showUserCompleted:[]
        }
    },
    watch: {
        user:function(n,o) {
            if (o == "") {
                this.getData();
            }
        }
    },
    mounted() {
        if (this.$GLOBAL.login_token !='') {
            this.getData();
        }
        
    },
    methods: {
        getData:function() {
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getCompletedListBys_id`,{
                headers:{ 
                    authorization: `Bearer ${this.$GLOBAL.login_token}`
                },
                params:{
                    s_id:parseInt(this.$route.params.s_id),
                }}
            ).then(function(response) {
                self.Completedusers = response.data;
            })
            .catch(function(error) {

              // console.log(error.response)
            });
        },
        getUserData:function(account){
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getUserCompletedListBys_id`,{
                headers:{ 
                    authorization: `Bearer ${this.$GLOBAL.login_token}`
                },
                params:{
                    s_id:parseInt(this.$route.params.s_id),
                    su_account:account
                }}
            ).then(function(response) {
                self.showUserCompleted = response.data;
            })
            .catch(function(error) {
                //console.log(error.response)
            });
            $("#exampleModal").modal("show");
        },
        close_modal:function() {
            self.showUserCompleted = [];
        },
        completeExtent_tostring:function(completeExtent) {
          let str =''
          switch (completeExtent) {
              case 0:
                  str ='未出席'
                  break;
              case 1:
                  str ='有出席但未通過'
                  break;
              case 2:
                  str ='有出席'
                  break;
              case 3:
                  str ='有出席且有通過'
                  break;
              default:
                  break;
          }
          return str;
        },
        addDegree:function(account) {
          const data = {
            s_id:parseInt(this.$route.params.s_id),
            su_account:account
          }
          this.$http.post(`${this.$GLOBAL.path}/api/addDegree`,data,{
          headers:{ 
              authorization: `Bearer ${this.$GLOBAL.login_token}`
          }}
          ).then(function(response) {
            alert(response.data)
            //console.log(response)
          })
          .catch(function(error) {
            alert(error.response.data)
            //console.log(error.response)
          });
        }
        
    },
    computed: {
        CompletedList:function() {
            if (this.showUserCompleted.length!=0) {
              return Array.prototype.concat.apply([],this.showUserCompleted.filter(a=>a.completed.length != 0).map(a=>{
                  this.$set(a.completed[a.completed.length - 1], 'title', a.title);
                  return a.completed[a.completed.length - 1]      
              }))
            }
        }
    },
}
</script>