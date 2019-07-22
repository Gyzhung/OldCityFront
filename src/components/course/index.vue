<style scoped>
.content {
  background-color: #d6cab7;
  height: 100%;
  padding-bottom: 2rem;
}
.table {
  margin: 0 auto;
}
.table td {
  vertical-align: middle;
}
.table th {
  vertical-align: middle;
}
.table-header {
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.btn-lightbrown {
  margin-top: 2rem;
  font-weight: 600;
  letter-spacing: 2px;
}
.btn-enter {
  float: right;
  background-color: #784a45;
  color: #ffffff;
}
.btn-enter:hover {
  background-color: rgb(126, 98, 71);
  color: #ffffff;
}
</style>

<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="table-header col-lg-6">課程列表</div>
      </div>
      <div class="row justify-content-center mb-2">
        <div class="col-lg-9 col-md-9 col-sm-10 col-12">
          <div style="float:left;" v-if="user.status ==4">
            <router-link to="createCourse" class="btn btn-success" style="color:white;">新增</router-link>
          </div>
          <div class="form-inline" style="float:right;align-items:flex-start">
            <div class="form-group pr-2">
              <input type="test" v-model="keyword" class="form-control" @keyup.enter="search" id="search_keyword" />
            </div>
            <button type="submit" class="btn btn-primary" @click="keyword_search">搜尋</button>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <table class="table col-lg-9 col-md-9 col-sm-10 col-12">
          <thead>
            <tr>
              <th width="25%">課程名稱</th>
              <th>課程簡介</th>
              <th width="8%">類別</th>
              <th width="10%"></th>
              <th width="10%" v-if="user.status ==4"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="course in courses" :key="course.c_id">
              <td>{{course.c_name}}</td>
              <td>{{course.introduce}}</td>
              <td>{{typetoString(course.type)}}</td>
              <td>
                <router-link
                  :to="{name:'Session',params:{c_id:course.c_id}}"
                  class="btn btn-enter"
                >查看</router-link>
              </td>
              <td v-if="user.status ==4"> 
                <button @click="delete_course(course.c_id)" class="btn btn-danger">刪除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- <div class="form session row">
      <div class="table-header col-lg-6">課程列表</div>
      <div class="col-lg-12 col-md-9 col-sm-6 col-12" style="margin: 0 auto;">
        <div style="float:left;" v-if="user.status ==4">
          <router-link to="createCourse" class="btn btn-success" style="color:white;">新增</router-link>
        </div>
        <div class="form-inline mb-2" style="float:right;">
          <div class="form-group mr-2">
            <input type="test" v-model="keyword" class="form-control" @keyup.enter="search" id="search_keyword" />
          </div>
          <button type="submit" class="btn btn-primary"  @click="keyword_search">搜尋</button>
        </div>
      </div>
      <table class="table col-lg-12 col-md-9 col-sm-6 col-12">
        <thead>
          <tr>
            <th>課程名稱</th>
            <th>課程簡介</th>
            <th width="8%">類別</th>
            <th width="10%"></th>
            <th width="10%" v-if="user.status ==4"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in courses" :key="course.c_id">
            <td>{{course.c_name}}</td>
            <td>{{course.introduce}}</td>
            <td>{{typetoString(course.type)}}</td>
            <td>
              <router-link
                :to="{name:'Session',params:{c_id:course.c_id}}"
                class="btn btn-enter"
              >查看</router-link>
            </td>
            <td v-if="user.status ==4"> 
              <button @click="delete_course(course.c_id)" class="btn btn-danger">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      keyword: "",
      courses: [],
      getRes: [],
      userStatus: "",
      typename: ""
    };
  },
  mounted: function() {
    const self = this;
    this.search(`all:`);
  },
  methods: {
    search(keyword) {
      const self = this;
      this.$http.post(`${this.$GLOBAL.path}/api/searchCourse`, {
        keyword: keyword
      })
      .then(function(response) {
        if ((status = 200)) {
          self.courses = response.data;
        }
      })
      .catch(function(error) {
        alert(error.response.data[0]);
      });
    },
    keyword_search:function() {
      this.search(this.keyword);
    },
    typetoString:function (type) {
      switch (type) {
        case 1:
          return "活動"
          break;
        case 2:
          return "課程"
          break;
        default:
          break;
      }
    },
    delete_course:function(c_id) {
      const data ={
        c_id :c_id
      }
      const self = this;
      if(confirm("確定刪除活動/課程?"))
      {
        if (c_id == 1 ) {
        
        }else{
          this.$http.post(`${this.$GLOBAL.path}/api/deleteCourse`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
          .then(function(response) {
            if ((status = 200)) {
              self.search(`all:`);
            }
          })
          .catch(function(error) {
            console.log(error.response)
          });
        }
      }
    }
  }
};
</script>
