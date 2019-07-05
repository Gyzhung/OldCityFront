<template>
  <div>
    
    <div v-html="c_content_get"></div>

    <table border="0" align="center">
      <tr>
        <td>
          課程名稱:
          <input
            type="text"
            :c_name="courses.c_name"
            v-model="courses.c_name"
            :placeholder="getRes.c_name"
            autocomplete="on"
          >
        </td>
        <td>
          總時長:
          <input type="text" :c_duration="courses.c_duration" v-model="courses.c_duration" :placeholder="getRes.c_duration">
        </td>
      </tr>

      <tr>
        <td>
          人數上限:
          <input type="text" :c_maxNum="courses.c_maxNum" v-model="courses.c_maxNum" :placeholder="getRes.c_maxNum">
        </td>
        <td>
          課程簡介:
          <input type="text" :c_introduce="courses.c_introduce" v-model="courses.c_introduce" :placeholder="getRes.c_introduce">
        </td>
        <td>
          課程種類:
          <input type="text" :c_type="courses.c_type" v-model="courses.c_type" :placeholder="getRes.c_type">
        </td>
        <td>
          修課種類:
          <input type="text" :c_require="courses.c_require" v-model="courses.c_require" :placeholder="getRes.c_require">
        </td>
      </tr>
      <tr>
        <td>
          課程內容:
          <div>
            <mavon-editor ref="editor" v-model="value"/>
          </div>
        </td>
      </tr>

      <button @click="editCourse">修改課程</button>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import global_ from "@/components/Global/global";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  components: {
    mavonEditor
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      value: "",
      html: "",
      getc_id: this.$route.params.c_id,
      getRes:"",
      c_content_get: "",
      defaultData: "preview",
      courses: {
        c_id: "",
        c_name: "",
        c_duration: "",
        c_maxNum: "",
        c_introduce: "",
        c_content: "",
        c_type: "",
        c_require: ""
      }
    };
  },mounted:function(){
    this.getCourse();
  },
  methods: {
    getCourse() {
      const self = this;
      const past_cid=this.getc_id;
      axios
        .get(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/getCourseData?c_id=${
           past_cid
          }`
        )
        .then(function(response) {
          self.getRes = response.data;
          self.c_content_get = response.data.c_content;
        })
        .catch(function(error) {});
    },
    editCourse() {
      let html = this.$refs.editor.d_render;
      this.courses.c_content = html;
      this.courses.c_id = this.getc_id;
      const past_cid=this.getc_id;
      axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/editCourse`,
          {
            c_id:this.courses.c_id,
            c_name: this.courses.c_name,
            c_duration: this.courses.c_duration,
            c_maxNum: this.courses.c_maxNum,
            c_introduce: this.courses.c_introduce,
            c_content: this.courses.c_content,
            c_type: this.courses.c_type,
            c_require: this.courses.c_require
          },
          { headers: { authorization: `Bearer ${global_.login_token}` } }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("修改成功");
            // routerr.push({ name: 'getCourse', params: { past_cid }})
          }
        })
        .catch(function(error) {
        });
    }
  }
};
</script>
<style scoped>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>