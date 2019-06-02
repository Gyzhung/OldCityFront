<template>
  <div>
  <table border="0" align="center">
    <tr>
      <td>
        課程名稱:
        <input type="text" :c_name="courses.c_name" v-model="courses.c_name" autocomplete="on">
      </td>
      <td>
        總時長:
        <input type="text" :c_duration="courses.c_duration" v-model="courses.c_duration">
      </td>
    </tr>
    <tr>
      <td>
        報名開始日期:
        <input
          type="text"
          :c_signUpTime_start="courses.c_signUpTime_start"
          v-model="courses.c_signUpTime_start"
        >
      </td>
      <td>
        報名結束日期:
        <input
          type="text"
          :c_signUpTime_end="courses.c_signUpTime_end"
          v-model="courses.c_signUpTime_end"
        >
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
    </tr>
    <tr>
      <td>
        課程內容:
        <input type="text" :c_content="courses.c_content" v-model="courses.c_content">
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
export default {
  data() {
    return {
      courses: {
        c_name: "",
        c_duration: "",
        c_signUpTime_start: "",
        c_signUpTime_end: "",
        c_maxNum: "",
        c_introduce: "",
        c_content: "",
        c_type: ""
      }
    };
  },
  methods: {
    addCourse() {
      const header = `authorization: Bearer ${global_.login_token}`;

      axios
        .post(
          `http://localhost/api/addCourse`,
          {
            c_name: this.courses.c_name,
            c_duration: this.courses.c_duration,
            c_signUpTime_start: this.courses.c_signUpTime_start,
            c_signUpTime_end: this.courses.c_signUpTime_end,
            c_maxNum: this.courses.c_maxNum,
            c_introduce: this.courses.c_introduce,
            c_content: this.courses.c_content,
            c_type: this.courses.c_type
          },
          {headers: {"authorization" : `Bearer ${global_.login_token}`}}
        )
        .then(function(response) {
          if ((status = 200)) {
            alert('建立成功');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>