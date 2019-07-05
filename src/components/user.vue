
<style scoped>
.course {
  border: solid #000000 3px;
}
</style>

<template>
  <div >
    <table border="0" align="center">
      <tr>
        <router-view></router-view>

        <div v-if="isShow" >
          <p>有管理員權限的帳號</p>

          <router-link to="/createCourse">建立課程</router-link>
          <div class="course" :key="item" v-for="item in getCourse">
            <p>課程名稱:{{ item.c_name }}</p>
            <p>課程時間:{{ item.c_duration}}</p>
            <p>開始報名日期:{{ item.c_signUpTime_start}}</p>
            <p>結束報名日期:{{ item.c_signUpTime_end}}</p>
            <p>課程人數上限:{{ item.c_maxNum}}</p>
            <p>課程簡介:{{ item.c_introduce }}</p>
            <p>課程內容:{{ item.c_content }}</p>
          </div>
        </div>

        <div v-else>
          <p>一般使用者帳號</p>

          <!-- <div class="course" :key="item" v-for="item in getUserD">
            <p>帳號:</p>
            <p>身分證號碼:{{ item.identity_num}}</p>
            <p>性別:{{ item.gender}}</p>
            <p>電話:{{ item.tel}}</p>
            <p>電子郵件:{{ item.email}}</p>
            <p>生日:{{ item.birthday }}</p>
          </div>-->
        </div>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
export default {
  data() {
    return {
      isShow: false,
      getRes: [],
      getUserD: [],
      getCourse: []
    };
  },
  mounted: function() {
    this.getData();
    this.getUser();
  },
  methods: {
    getData() {
      const self = this;
      axios
        .get(`http://localhost/api/getMyData`, {
          headers: { authorization: `Bearer ${global_.login_token}` }
        })
        .then(function(response) {
          if ((status = 200)) {
            self.getRes = response.data;
            if (self.getRes.status == 3 || self.getRes.status == 4) {
              self.isShow = true;

              axios
                .get(`http://localhost/api/getCourses`)
                .then(function(response) {
                  if ((status = 200)) {
                    self.getCourse = response.data;
                  }
                })
                .catch(function(error) {
                });
            }
          }
        })
        .catch(function(error) {
        });
    },
    getUser() {
      const self = this;
      axios
        .get(`http://localhost/api/getMyData`, {
          headers: { authorization: `Bearer ${global_.login_token}` }
        })
        .then(function(getresponse) {
          if ((status = 200)) {
            self.getUserD = getresponse.data;
          }
        })
        .catch(function(error) {
        });
    }
  }
};
</script>