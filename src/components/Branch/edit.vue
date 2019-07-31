<style scoped>
.form {
    padding-top: 2rem;
  width: 90%;
  margin: 0 auto;
}
.add{
  
  min-height: 70vh;
}
.form-header {
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.form-control:focus {
  border-color: #ab8a6b;
  box-shadow: 0 0 5px rgba(171, 138, 107, 1);
}
.form-control{
  width: 80%;
}
.btn-lightbrown{
  font-weight: 700;
}
</style>

<template>
    <div class="content">
        <div class="form add">
            <div class="form-header ">修改課程/活動</div>
            <div class="card-body">
                <div>
                    <div class="form-group row">
                        <label for="account" class="col-md-2 col-form-label text-md-right">標題:</label>
                        <div class="col-md-3">
                            <input type="text" v-model="editbranch.title" class="form-control">
                        </div>
                        <label for="account" class="col-md-2 col-form-label text-md-right">人數上限:</label>
                        <div class="col-md-3">
                            <input type="text" v-model="editbranch.maxNum" class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="account" class="col-md-2 col-form-label text-md-right">報名開始日期:</label>
                        <div class="col-md-3">
                            <date-picker v-model="editbranch.signUpTime_start" :config="date_config"></date-picker>
                        </div>
                        <label for="account" class="col-md-2 col-form-label text-md-right">報名結束日期:</label>
                        <div class="col-md-3">
                            <date-picker v-model="editbranch.signUpTime_end" :config="date_config"></date-picker>
                        </div>
                    </div>
                     <div class="form-group row">
                        <label for="account" class="col-md-2 col-form-label text-md-right">活動起始日期:</label>
                        <div class="col-md-3">
                            <date-picker v-model="editbranch.eventTime_start" :config="date_config"></date-picker>
                        </div>
                        <label for="account" class="col-md-2 col-form-label text-md-right">活動結束日期:</label>
                        <div class="col-md-3">
                            <date-picker v-model="editbranch.eventTime_end" :config="date_config"></date-picker>
                        </div>
                    </div>
                    <!-- <div class="form-group row">
                        <label for="account" class="col-md-2 col-form-label text-md-right">場次流程:</label>
                        
                        <div class="col-md-6 mb-1" :class="{'offset-2' : index != 0}" v-for="(Schedule,index) in branchSchedule" :key="index">
                            <div style="width:40%;float:left">
                                <input type="text"  class="form-control" v-model="branchSchedule[index].period" placeholder="時程">
                            </div>
                            <div style="width:20%;float:right"><button class="btn btn-warning" @click="delete_Schedule(index)" >刪除</button></div>
                            <div style="width:40%;float:right">
                                <input type="text"  class="form-control" v-model="branchSchedule[index].event" placeholder="說明">
                            </div>
                            
                        </div>
                        <div class="offset-2 col-md-10"><button class="btn btn-primary" @click="save">增加</button></div>
                    </div> -->
                    <div class="form-group row">
                        <label for="account" class="col-md-2 col-form-label text-md-right">場次簡介:</label>
                        <div class="col-md-10">
                            <quill-editor  v-model="editbranch.content" :options="editorOption">
                      </quill-editor>
                        </div>
                    </div>
                    <div class="col-md-6 offset-md-5">
                        <button type="button" class="btn btn-lightbrown" @click="edit">
                            修改場次
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import datePicker from 'vue-bootstrap-datetimepicker'
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/regular.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import { addQuillTitle } from '../../js/quill_title'
import { QuillWatch } from 'quill-image-extend-module'

$.extend(true, $.fn.datetimepicker.defaults, {
    icons: {
      time: 'far fa-clock',
      date: 'far fa-calendar',
      up: 'fas fa-arrow-up',
      down: 'fas fa-arrow-down',
      previous: 'fas fa-chevron-left',
      next: 'fas fa-chevron-right',
      today: 'fas fa-calendar-check',
      clear: 'far fa-trash-alt',
      close: 'far fa-times-circle'
    }
});

export default {
    data() {
        return {
            editorOption: {
                modules: {
                toolbar:[
                    [{ 'size': ['small', false, 'large'] }],
                    ['bold', 'italic'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    ['link'],
                    
                ]}
            },
            b_id:this.$route.params.b_id,
            editbranch:{
                title:'',
                content:'',
                maxNum:'',
                signUpTime_start:'',
                signUpTime_end:'',
                eventTime_start:'',
                eventTime_end:'',                   
            },
         
            // branchSchedule:[{period:'',event:''}],
            date_config:{
                format:'YYYY-MM-DD HH:mm:ss',
            }
        }
    },
    mounted(){
        addQuillTitle();
            const self = this;
            this.$http.get(`${this.$GLOBAL.path}/api/getBranchData`,{
                params:{
                    b_id:this.$route.params.b_id
                }}
            )
            .then(function(response) {
                console.log(response.data)
                self.editbranch.title = response.data[0].title;
                self.editbranch.content = response.data[0].content;
                self.editbranch.maxNum = response.data[0].maxNum;
                self.editbranch.signUpTime_start = response.data[0].signUpTime_start;
                self.editbranch.signUpTime_end = response.data[0].signUpTime_end;
                self.editbranch.eventTime_start = response.data[0].eventTime_start;
                self.editbranch.eventTime_end = response.data[0].eventTime_end;
            })
            .catch(function(error) {
            });
    },
    methods: {
        edit:function() {
            const self = this;
            const data ={
                b_id:this.b_id,
                title:this.editbranch.title,
                content:this.editbranch.content,
                maxNum:this.editbranch.maxNum,
                signUpTime_start:this.editbranch.signUpTime_start,
                signUpTime_end:this.editbranch.signUpTime_end,
                eventTime_start:this.editbranch.eventTime_start,
                eventTime_end:this.editbranch.eventTime_end,
                // branchSchedule: this.branchSchedule.map(a=>JSON.stringify(a)),
            }
            this.$http.post(`${this.$GLOBAL.path}/api/editBranch`,data,{ headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` } })
            .then(function(response) {
            if ((status = 200)) {
                alert("修改成功");
                self.$router.push(`/Branch_content/${self.b_id}`);
            }
            })
            .catch(function(error) {
                alert(error.response.data[0])
            });
        },
    
        // save:function () {
        //     this.branchSchedule.push({period:'',event:''})
        // },
        // delete_Schedule:function(index) {
        //     this.branchSchedule.splice(index, 1);
        // }
    },
}
</script>