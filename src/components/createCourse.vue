<template>
  <div>
    <table border="0" align="center">
      <tr>
        <td>
          課程名稱:
          <input
            type="text"
            :c_name="courses.c_name"
            v-model="courses.c_name"
            autocomplete="on"
          >
        </td>
        <td>
          總時長:
          <input type="text" :c_duration="courses.c_duration" v-model="courses.c_duration">
        </td>
      </tr>

      <tr>
        <td>
          人數上限:
          <input type="text" :c_maxNum="courses.c_maxNum" v-model="courses.c_maxNum">
        </td>
        <td>
          課程簡介:
          <input type="text" :c_introduce="courses.c_introduce" v-model="courses.c_introduce">
        </td>
        <td>
          課程種類:
          <input type="text" :c_type="courses.c_type" v-model="courses.c_type">
        </td>
      </tr>


      <button @click="addCourse">建立課程</button>
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
      defaultData: "preview",
      courses: {
        c_name: "",
        c_duration: "",
        c_maxNum: "",
        c_introduce: "",
        c_content: "",
        c_type: "",
        c_require: ""
      }
    };
  },
  methods: {
    printv() {
      let html = this.$refs.editor.d_render;
    },
    addCourse() {
      let html = this.$refs.editor.d_render;
      this.courses.c_content = html;
      axios
        .post(
          `http://oldcity.southeastasia.cloudapp.azure.com/api/addCourse`,
          {
            c_name: this.courses.c_name,
            c_duration: this.courses.c_duration,
            c_maxNum: this.courses.c_maxNum,
            c_introduce: this.courses.c_introduce,
            c_type: this.courses.c_type,
          },
          { headers: { authorization: `Bearer ${global_.login_token}` } }
        )
        .then(function(response) {
          if ((status = 200)) {
            alert("建立成功");
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