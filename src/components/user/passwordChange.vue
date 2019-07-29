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
            <div class="form-header">修改密碼</div>
            <div class="card-body">
                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">輸入舊密碼:</label>
                    <div class="col-md-6">
                        <input type="password" @keyup.enter="login" v-model="old_password" class="form-control" name="password">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">輸入新密碼:</label>
                    <div class="col-md-6">
                        <input type="password" @keyup.enter="login" v-model="new_password" class="form-control" name="password">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="password" class="col-md-4 col-form-label text-md-right">確認新密碼:</label>
                    <div class="col-md-6">
                        <input type="password" v-model="new_password2" class="form-control" name="password">
                    </div>
                </div>
                <div class="col-md-6 offset-md-4">                            
                    <button type="button" @click="passwordChange" class="btn btn-lightbrown">修改</button>
                </div>
            </div>               
      </div>
  </div>
</template>
<script>
export default {
    props:["user"],
    data() {
        return {
            old_password : '',
            new_password : '',
            new_password2 : '',
        }
    },
    methods: {
        passwordChange:function() {
            const self = this;
            const data = {
                account : this.user.account,
                old_password : this.old_password,
                new_password : this.new_password,
                new_password2 : this.new_password2,
            }
            this.$http.post(`${this.$GLOBAL.path}/api/passwordChange`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
             .then(function(response) {
                self.$GLOBAL.setCookie('login_token',response.data.token,1);
                self.$GLOBAL.login_token = response.data.token;
                self.$emit("update_userdata");
                alert("修改成功")
            })
            .catch(function(error) {
                alert("修改失敗");
            });
        }
    },
}
</script>