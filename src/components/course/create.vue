<style scoped>
.form {
    padding-top: 2rem;
  width: 90%;
  margin: 0 auto;
}
.add{
  
  min-height: 70vh;
}
.form-header {
  text-align: center;
  color: #784a45;
  font-size: 28px;
  font-weight: 700;
}
.form-control:focus {
  border-color: #ab8a6b;
  box-shadow: 0 0 5px rgba(171, 138, 107, 1);
}
.form-control{
  width: 80%;
}
.btn-lightbrown{
  font-weight: 700;
}
</style>
<template>
  <div class="content">
    <div class="form add">
      <div class="form-header">新增課程/活動</div>
      <div class="card-body">
        <div>
          <div class="row">
            <div class="col-6 row">
              <label for="account" class="col-md-4 col-form-label">標題:</label>
              <div class="col-md-8">
                <input type="text" v-model="c_name" class="form-control" />
              </div> 
              <label for="account" class="col-md-4 col-form-label">分類:</label>
              <div class="col-md-8">
                <select class="form-control" v-model="type" >
                  <option value="1">活動</option>
                  <option value="2">課程</option>
                </select>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group row">
                <label for="account" class="col-md-4 col-form-label">課程簡介(200字內):</label>
                <div class="col-md-8">
                  <textarea class="form-control" v-model="introduce"  id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 offset-md-5 mt-5">
            <button type="button" class="btn btn-lightbrown" @click="create">建立活動/課程</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      c_name: "",
      introduce: "",
      type: ""
    };
  },
  methods: {
    create() {
      const data ={
        c_name:this.c_name,
        introduce:this.introduce,
        type:this.type,
      } 
      const self = this;
      this.$http.post(`${this.$GLOBAL.path}/api/addCourse`,data,{headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` }})
      .then(function(response) {
        if ((status = 200)) {
          alert("建立成功");
          self.$router.push("/Course");
        }
      })
      .catch(function(error) {
        console.log(error.response)
      });

    }
  }
};
</script>
