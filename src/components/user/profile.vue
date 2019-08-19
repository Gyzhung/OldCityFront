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
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11 text-center">
                    <img v-if="user.profile_pic != null" :src="`${this.$GLOBAL.path}/images/ThumbnailImage/${user.profile_pic}`" alt="">
                    <img v-else src="../../assets/user.png" alt="">
                    <div>
                        <input hidden class="form-control-file" type="file" id="files" ref="files" v-on:change="handleFilesUpload()"/>
                        <div v-if="files !=null">{{files.name}}</div>
                        <button @click="addFiles" class="mt-2">選擇圖片</button>
                        <button v-if="files !=null" class="mt-2" @click="submitFiles">上傳</button>
                    </div>                    
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
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-md-4 col-sm-11">
                     <router-link tag="button"  class="btn btn-warning" to="passwordchange">變更密碼</router-link>
                </div>
            </div>
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-md-4 col-sm-11">
                    <router-link tag="button"  class="btn btn-primary" to="editprofile">修改</router-link>
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
            files:null
        }
    },
    mounted() {
    },
    methods:{
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
        }
        ,addFiles(){
            this.$refs.files.click();
        },
        handleFilesUpload(){
            let uploadedFiles = this.$refs.files.files;
            this.files = uploadedFiles[0];
        },
        submitFiles(){  
            const self = this;
            let formdata = new FormData();
            formdata.append('profile_pic', this.files);
            this.$http.post(`${this.$GLOBAL.path}/api/updateProfilePic`,formdata,
            {
                headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },
                'Content-Type': 'multipart/form-data'
            })
            .then(function(response) {
                self.files = null;
                self.$emit("update_userdata");
                alert("上傳成功")
                
            })
            .catch(function(error) {
                alert(error.response)
                //console.log(error.response)
            });
        },
    }
}
</script>