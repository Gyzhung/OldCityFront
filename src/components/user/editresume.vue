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
        <div class="title">我的履歷</div>
        <div class="container-fluid" >
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    最高學歷 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="education" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    通訊地址 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="currentAddress" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    戶籍地址 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="residenceAddress" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    緊急聯絡人 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="emergencyContactName" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    緊急聯絡人電話
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="emergencyContactCel" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    緊急聯絡人關係 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="emergencyContactRelation" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    服務 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <select v-model="serve" class="form-control" placeholder="級數">
                        <option value="0">已退休</option>
                        <option value="1">在職中</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    原服務地點 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="servePlace" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    領隊證 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="leaderLicense" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    導遊證 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="guideLicense" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    解說員證 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="narratorLicense" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                 <div class="col-md-2 col-sm-4 col-4">
                    志工經驗 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="volunteer" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    其他相關經驗 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="other" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    興趣 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="interest" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="col-md-2 col-sm-4 col-4">
                    参與動機 
                </div>
                <div class="col-md-4 col-sm-8 col-8">
                    <input v-model="motivation" type="text" class="form-control">
                </div>
            </div>
            <div class="row justify-content-center mt-2" v-for="(language,index) in user_languages" :key="index">
                <div class="col-md-2 col-sm-4 col-4">
                    <span  v-show="index==0">語言 </span>
                </div>
                
                <div class="col-md-2 col-sm-4 col-4">
                    <input v-model="language.languages" type="text" class="form-control" placeholder="語言">
                </div>
                <div class="col-md-2 col-sm-4 col-4">
                    <select v-model="language.level" class="form-control" placeholder="級數">
                        <option value="1">優等</option>
                        <option value="2">普通</option>
                        <option value="3">尚可</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-center mt-2">
                <div class="offset-md-2 offset-4 offset-sm-4 col-md-4 col-sm-8 col-8">
                    <button class="btn btn-success" @click="add_language">增加</button>
                </div>
            </div>
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-md-6 col-sm-12 col-12">
                    <button class="btn btn-success" @click="update">修改</button>
                    <router-link tag="button"  class="btn btn-warning" to="resume">取消</router-link>                    
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
            education:this.user.education,
            currentAddress: this.user.currentAddress,
            residenceAddress: this.user.residenceAddress,
            emergencyContactName: this.user.emergencyContactName,
            emergencyContactCel: this.user.emergencyContactCel,
            emergencyContactRelation: this.user.emergencyContactRelation,
            serve: this.user.serve,
            servePlace: this.user.servePlace,
            leaderLicense: this.user.leaderLicense,
            guideLicense: this.user.guideLicense,
            narratorLicense: this.user.narratorLicense,
            volunteer: this.user.volunteer,
            other: this.user.other,
            interest: this.user.interest,
            motivation: this.user.motivation,
            user_languages:[]
        }
    },
    watch: {
        user:function name(params) {
            const self = this;
            this.education=this.user.education
            this.currentAddress= this.user.currentAddress
            this.residenceAddress= this.user.residenceAddress
            this.emergencyContactName= this.user.emergencyContactName
            this.emergencyContactCel= this.user.emergencyContactCel
            this.emergencyContactRelation= this.user.emergencyContactRelation
            this.serve= this.user.serve
            this.servePlace= this.user.servePlace
            this.leaderLicense= this.user.leaderLicense
            this.guideLicense=this.user.guideLicense
            this.narratorLicense= this.user.narratorLicense
            this.volunteer= this.user.volunteer
            this.other= this.user.other
            this.interest= this.user.interest
            this.motivation= this.user.motivation
            this.user.user_languages.forEach(element => {
                self.user_languages.push({languages:element.languages,level:element.level})
            });
        }
    },
    mounted() {
        const self = this;
        if (this.user.user_languages != undefined) {
            this.user.user_languages.forEach(element => {
                self.user_languages.push({languages:element.languages,level:element.level})
            });
        }
        
    },
    methods:{
        add_language:function() {
            this.user_languages.push({languages:'',level:''})
        },
        update:function(){
            const self = this;
            const arr = ['servePlace','leaderLicense','guideLicense','narratorLicense','volunteer','other','interest','motivation']
            const data = {
                education:this.education,
                currentAddress: this.currentAddress,
                residenceAddress: this.residenceAddress,
                emergencyContactName: this.emergencyContactName,
                emergencyContactCel: this.emergencyContactCel,
                emergencyContactRelation: this.emergencyContactRelation,
                serve: this.serve,
                languages: []
            }
            arr.forEach(element => {
                if (this[element] != null && this[element] !='') {
                    data[element] = this[element]
                }
            });
            
            this.user_languages.forEach(element => {
                if (element.languages !="" && element.level != "") {
                    data.languages.push(element)
                } 
            });
            data.languages = data.languages.map(a=>JSON.stringify(a))
            this.$http.post(`${this.$GLOBAL.path}/api/updateResume`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },params:{s_id:this.$route.params.s_id},})
            .then(function(response) {
                //對上層 home 取用戶資料
                self.$emit("update_userdata");
                self.$router.push("/resume");
            
            }).catch(function(error) {
                alert(error.response.data)
            });
        }
    }
}
</script>