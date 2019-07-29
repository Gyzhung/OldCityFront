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
        <div class="title">{{user.name}}的個人資訊</div>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11 text-center">
                    <img v-if="user.profile_pic != null" :src="`${this.$GLOBAL.path}/images/ThumbnailImage/${user.profile_pic}`" alt="">
                    <img v-else src="../../assets/user.png" alt="">                  
                </div>
            </div>
            <!-- <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    帳號 : {{user.account}}
                </div>
            </div> -->
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    姓名 : {{user.name}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    生日 : {{user.birthday}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    身分證字號 : {{user.identity_num}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    電子信箱 : {{user.email}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    家用電話 : {{user.tel}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    行動電話 : {{user.cel}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    性別 : {{genderTostring(user.gender)}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files:null,
            user:''
        }
    },
    mounted() {
        this.getuser()
    },
    methods:{
        getuser:function () {
            const self =  this;
            this.$http.get(`${this.$GLOBAL.path}/api/getUserDataByAdmin`,{
                headers:{ 
                    authorization: `Bearer ${this.$GLOBAL.login_token}`
                },
                params:{
                    get_account:this.$route.params.account
                }})
            .then(function(response) {
                self.user = response.data;
            })
            .catch(function(error) {
                console.log(error.response)
            });
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
        
    }
}
</script>