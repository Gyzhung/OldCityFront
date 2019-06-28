<style>
.itemcontent {
  width: 500 dw;
  height: 500dh;
}
</style>


<template>
  <div>
    <div class="itemcontent">
       <button @click="deleteCourse" v-if="isShow">刪除課程</button>
      <p>課程名稱:{{ getRes.c_name }}</p>
      <p>總時長:{{ getRes.c_duration }}</p>
      <p>人數上限:{{ getRes.c_maxNum }}</p>
      <p>課程簡介:{{ getRes.c_introduce }}</p>
      <p>課程種類:{{ getRes.c_type }}</p>
     
    </div>
    <div v-html="c_content"></div>
    
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";

export default {
  data() {
    return {
      c_id: this.$route.params.c_id,
      getRes: [],
      getDataRes:[],
      userStatus:[],
      // c_content: "",
      isShow:false,
    };
  },
  mounted: function() {
    this.isAdmin();
    this.getCourse();
  },
  methods: {
    getCourse() {
      const self = this;
      axios
        .get(
          `http://163.17.145.142/api/api/getCourseData?c_id=${
            this.c_id
          }`
        )
        .then(function(response) {
          self.getRes = response.data;
          // self.c_content = response.data.c_content;
          console.log(self.c_content);
        })
        .catch(function(error) {});
    },
    isAdmin() {
      if (global_.userStatus == 4||global_.userStatus == 3) {
            self.isShow = true;
            console.log(self.isShow);
          }
    },
    deleteCourse(){
        axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/deleteCourse`,
          {
            c_id:this.c_id,
          },
          { headers: { authorization: `Bearer ${global_.login_token}` } }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("刪除成功");
          }
        })
        .catch(function(error) {
         
        });
    }
  }
};
</script>