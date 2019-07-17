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
        <div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    最高學歷 : {{user.education}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    通訊地址 : {{user.currentAddress}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    戶籍地址 : {{user.residenceAddress}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    緊急聯絡人 : {{user.emergencyContactName}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    緊急聯絡人電話 : {{user.emergencyContactCel}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    緊急聯絡人關係 : {{user.emergencyContactRelation}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    服務 : {{user.serve}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    服務單位 : {{user.servePlace}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    領隊證 : {{user.leaderLicense}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    導遊證 : {{user.guideLicense}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    解說員證 : {{user.narratorLicense}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    志工經驗 : {{user.volunteer}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    其他相關經驗 : {{user.other}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    興趣 : {{user.interest}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    動機 : {{user.motivation}}
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4 col-sm-11">
                    語言 : 
                    <span v-for="(language,index) in user.user_languages" :key="index">
                        <span v-if="index!=0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        {{language.languages}}-{{levelTostring(language.level)}}
                        <button class="btn btn-danger mt-1" @click="dellanguage(language.ul_id)">刪除</button><br/>
                    </span>
                </div>
            </div>
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-md-4 col-sm-11">
                    <router-link tag="button"  class="btn btn-primary" to="editresume">修改</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['user'],
    methods: {
        levelTostring:function(level){
            switch (level) {
                case 1:
                    return "優等"
                    break;
                case 2:
                    return "普通"
                    break;
                case 3:
                    return "尚可"
                    break;
                default:
                    break;
            }
        },
        dellanguage:function(ul_id) {
            const self = this;
            const data = {
                ul_id:ul_id
            }
            this.$http.post(`${this.$GLOBAL.path}/api/deleteLanguage`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` },params:{s_id:this.$route.params.s_id},})
            .then(function(response) {
                console.log(response.data)
                //對上層 home 取用戶資料
                self.$emit("update_userdata");
            
            }).catch(function(error) {
                console.log(error)
            });
        }
    },
}
</script>