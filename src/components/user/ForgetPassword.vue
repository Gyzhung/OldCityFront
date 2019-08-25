<style scoped>
.form {
    padding-top: 2rem;
  width: 60%;
  margin: 0 auto;
}
.login{
  margin-top: 10vh;
  height: 70vh;
}
.form-header {
  text-align: center;
  color: #784a45;
  font-size: 18px;
  font-weight: 700;
}
.form-control:focus {
  border-color: #ab8a6b;
  box-shadow: 0 0 5px rgba(171, 138, 107, 1);
}
.form-control{
  width: 80%;
}

</style>
<template>
    <div class="content">
        <div class="form login">                
        <div class="form-header">忘記密碼</div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="account" class="col-md-4 col-form-label text-md-right">輸入帳號:</label>
                    <div class="col-md-6">
                        <input type="text" v-model="account" id="account" class="form-control" name="account">
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">忘記密碼問題:</label>
                    <div class="col-md-6">
                        <select id="forget_question" class="form-control" name="forget_question" v-model="forget_question">
                            <option value="0" disabled>未設定</option>
                            <option value="1">我最愛的顏色</option>
                            <option value="2">我的出生地</option>
                            <option value="3">我最喜歡的遊戲</option>
                            <option value="4">我最喜歡的人</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="forget_answer" class="col-md-4 col-form-label text-md-right">答案:</label>
                    <div class="col-md-6">
                        <input type="text" v-model="forget_answer" id="forget_answer" class="form-control" name="forget_answer">
                    </div>
                </div>
                <div class="col-md-6 offset-md-4">                            
                    <button type="button" @click="forget_password" class="btn btn-lightbrown">確認</button>
                    
                </div>
            </div>               
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            account:"",
            forget_question:0,
            forget_answer:""
        }
    },
    methods: {
        forget_password:function() {
            const data ={
                forget_account:this.account,
                forget_question:this.forget_question,
                forget_answer:this.forget_answer,
            }
            this.$http.get(`${this.$GLOBAL.path}/api/forgetPassword`, {params:data})
            .then(response => {
                console.log(response.data)
                alert(response.data)
            })
            .catch(error => {
                console.log(error.response)
                alert(error.response.data)
            });
        }
    },
}
</script>