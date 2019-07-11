
<style scoped>
#profile{
  float:right;
  background-color: rgba(240, 231, 208, 0.938);
  border:2px burlywood;
  padding-bottom: 20px;
    
    
    
}
.profilebutton{
  float:left;
  background-color: rgb(255, 255, 255);
  
  padding: bottom 85px;
}
.title{
  font-size: 34px;
  color: #94693F;
  font-weight:bold;
  font-family: Microsoft JhengHei;
}
.profilebutton label{
  padding-bottom:  55px;
  margin-left: 50px;
  margin-top: 50px;
}
.profilebutton img{
  padding-bottom:  55px;
}
.search{
  padding-right: 50px;
  padding-top: 50px;
  padding-bottom: 50px;
}
.newsText{
  margin-top: 5px;
  margin-left: 10px;
  font-family: Microsoft JhengHei;
  font-size: 15px;
  border:3px burlywood;
}
p{
  font-family: Microsoft JhengHei;
  font-size: 18px;
  color:#94693F;
  font-weight:bold;
  
  
}

.profileDetail input{
  margin-top: 5px;
  margin-bottom: 10px;
}
.profileDetail select{
  margin-top: 5px;
  margin-bottom: 10px;
}

</style>


<template>
  <div class="content">
    <div class="container">
      <div id ="profile" class="col-lg-12 col-xs-12" align="center" >
        <label class="title">會員註冊</label>
      <div class="profileDetail" >
        <br>
        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="account">會員帳號: </label>
          </div>
          <div class="col-4">
            <input id="account" class="form-control" v-model="users.account"  type="text">
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="password">會員密碼: </label>
          </div>
          <div class="col-4">
            <input id="password" class="form-control" v-model="users.password" type="password">
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="name">使用者名稱: </label>
          </div>
          <div class="col-4">
            <input id="name" class="form-control"  v-model="users.name" type="text">
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="identity_num">身分證號碼: </label>
          </div>
          <div class="col-4">
            <input id="identity_num" class="form-control" v-model="users.identity_num" type="text">
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="account">性別: </label>
          </div>
          <div class="col-4">
            <select id="select_option" class="form-control" name="select_option" v-model="users.gender">
              <option value="0">女</option>
              <option value="1">男</option>
              <option value="2">其他</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="address">通訊地址: </label>
          </div>
          <div class="col-4">
            <input id="address" class="form-control" v-model="users.address" type="text">
          </div>
        </div>

        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="address">家用電話: </label>
          </div>
          <div class="col-4">
            <input id="tel" class="form-control" v-model="users.tel" type="tel">
          </div>
        </div>
        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="cel">行動電話: </label>
          </div>
          <div class="col-4">
            <input id="cel" class="form-control" v-model="users.cel" type="cel">
          </div>
        </div>
        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="email">Email: </label>
          </div>
          <div class="col-4">
            <input id="email" class="form-control" v-model="users.email" type="email">
          </div>
        </div>
        <div class="row">
          <div class="text-md-right offset-1 col-2">
            <label class="col-form-label" for="birthday">生日: </label>
          </div>
          <div class="col-4">
            <input id="birthday" class="form-control" v-model="users.birthday" type="date">
          </div>
        </div>     
        <br><br>
        <div>
          <p>蒐集個人資料告知事項:</p>
          <textarea name="" id="" cols="70" rows="10" disabled>
            本網站為遵守個人資料保護法規定，在您提供個人資料予本司前，依法 告知下列事項：
一、本網站因協助台中學習型城市計畫等目的而獲取您下列 個人資料類別：姓名、出生年月日、國民身分證統一編號、性別、職業、 教育、連絡方式(包括但不限於電話號碼、E-MAIL、居住或工作地址)等， 或其他得以直接或間接識別您個人之資料。 
二、本網站將依個人資料保護法及相關法令之規定下，依本司隱私權保護政策， 蒐集、處理及利用您的個人資料。 
三、本網站將於蒐集目的之存續期間合理利用您的個人資料。 
四、除蒐集之目的涉及國際業務或活動外，本網站僅於中華民國領域內利用您的 個人資料。 
五、本網站將於原蒐集之特定目的、本次以外之產業之推廣、宣導及輔導、以及 其他公務機關請求行政協助之目的範圍內，合理利用您的個人資料。 
六、您可依個人資料保護法第 3 條規定，就您的個人資料向本網站行使之下列權 利： (一)查詢或請求閱覽。 (二)請求製給複製本。 (三)請求補充或更正。 (四)請求停止蒐集、處理及利用。 (五)請求刪除。 您因行使上述權利而導致對您的權益產生減損時，本司不負相關賠償責任。 另依個人資料保護法第 14 條規定，本網站得酌收行政作業費用。 
七、若您未提供正確之個人資料，本網站將無法為您提供特定目的之相關業務。 
八、本網站因業務需要而委託其他機關處理您的個人資料時，本網站將會善盡監督 之責。 
九、您瞭解此一同意書符合個人資料保護法及相關法規之要求，且同意本網站留 存此同意書，供日後取出查驗。 
個人資料之同意提供 
一、本人已充分知悉貴網站上述告知事項。 
二、本人同意貴網站蒐集、處理、利用本人之個人資料，以及其他公務機關請求 行政協助目的之提供。
          </textarea>
          <br>
          <input v-model="check" type="checkbox" value="1">同意
        </div>
        <br><br>
        <button type="button" @click="register" class="btn btn-primary">確認註冊</button>
        
        </div>
      </div><!-- 8 -->
    </div>
    <div style="clear:both;"></div><!--這是用來清除上方的浮動效果-->

 
      <!-- <td>
        <p>簡單自介:</p>
        <textarea type="text" :status="users.selfIntroduction" v-model="users.selfIntroduction"></textarea>
      </td> -->
    <!-- <tr>
      <td>
        <h2>有無以下志工經驗?</h2>
        <br>第二市場
        <input
          type="checkbox"
          :is_secondMarket="users.is_secondMarket"
          v-model="users.is_secondMarket"
          value="true"
        >
        <br>台灣文學館
        <input
          type="checkbox"
          :is_NMoTL="users.is_NMoTL"
          v-model="users.is_NMoTL"
          value="true"
        >
        <br>文資園區
        <input type="checkbox" :is_MoC="users.is_MoC" v-model="users.is_MoC" value="true">
        <br>
        <br>
      </td>
    </tr> -->
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  name: "HelloWorld",

  data() {
    return {
      check:0,
      users: {
        account: "",
        password: "",
        identity_num: "",
        name: "",
        address: "",
        gender: "",
        tel: "",
        cel:"",
        email: "",
        // profile_pic:"",
        birthday: "",
        tokenStr: "",
        status: "",
        selfIntroduction: "",
        is_secondMarket: false,
        is_NMoTL: false,
        is_MoC: false
        // other:""
      }
    };
  },
  methods: {
    register() {
      if (this.check == 1) {
        const self = this;
        axios 
          .post(`${this.$GLOBAL.path}/api/register`, {
            account: this.users.account,
            password: this.users.password,
            identity_num: this.users.identity_num,
            name: this.users.name,
            gender: this.users.gender,
            tel: this.users.tel,
            cel:this.users.cel,
            email: this.users.email,
            birthday: this.users.birthday,
            status: this.users.status,
    
          })
          .then(function(response) {
            if ((status = 200)) {
              alert("成功註冊");
              self.$router.push({ path: `/index` });
            }
          })
          .catch(function(error) {
            console.log(error.response)
            alert(error.response.data[0])
        });
      }else{
        alert("請先同意蒐集個人資料告知事項")
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
