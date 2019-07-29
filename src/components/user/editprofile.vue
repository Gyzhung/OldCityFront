<style scoped>
.title {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 3px;
}
</style>
<template>
    <div class="content">
        <div class="title">我的個人資訊</div>
        <div class="container-fluid" >
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    姓名  
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="name" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    電子信箱 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="email" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    家用電話 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="tel" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    行動電話 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="cel" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    性別 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <select v-model="gender" class="form-control">
                        <option value="0">女</option>
                        <option value="1">男</option>
                        <option value="2">其他</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-md-6 col-sm-12 col-12">
                    <button class="btn btn-success" @click="update">修改</button>
                    <router-link tag="button"  class="btn btn-warning" to="profile">取消</router-link>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    data() {
        return {
            name:this.user.name,
            email:this.user.email,
            tel:this.user.tel,
            cel:this.user.cel,
            gender:this.user.gender,
        }
    },
    watch: {
        user:function() {
            this.name=this.user.name
            this.email=this.user.email
            this.tel=this.user.tel
            this.cel=this.user.cel
            this.gender=this.user.gender
        }
    },
    mounted() {
        
    },
    methods:{
        update:function(){
            const self = this;
            const data = {
                name:this.name,
                email:this.email,
                tel:this.tel,
                cel:this.cel,
                gender:this.gender,
            }
            
            this.$http.post(`${this.$GLOBAL.path}/api/editUser`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },params:{s_id:this.$route.params.s_id},})
            .then(function(response) {
                //對上層 home 取用戶資料
                
                self.$emit("update_userdata");
                alert(response.data);
                self.$router.push("/profile");
            
            }).catch(function(error) {
                console.log(error)
            });
        }
    }
}
</script>