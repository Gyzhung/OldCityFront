<style scoped>
.form {
  padding-top: 2rem;
  width: 90%;
  margin: 0 auto;
}
.add {
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
.form-control {
  width: 80%;
}
.btn-lightbrown {
  font-weight: 700;
}
</style>

<template>
  <div class="content">
    <div class="form add">
      <div class="form-header">新增場次</div>
      <div class="card-body">
        <div>
          <div class="row justify-content-center">
            <div class="col-6 offset-3 row">
              <label for="account" class="col-md-4 col-form-label">場次名稱:</label>
              <div class="col-md-8">
                <input type="text" v-model="name" class="form-control" />
              </div>
            </div>
          </div>
          <div class="text-center mt-5">
              <button type="button" class="btn btn-lightbrown" @click="create">建立場次</button>
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
      c_id: this.$route.params.c_id,
      name: ""
    };
  },
  methods: {
    create() {
      const self = this;
      const data = {
        c_id: this.c_id,
        session_name: this.name
      }
      this.$http.post(`${this.$GLOBAL.path}/api/addSession`,data,{ headers: { authorization: `Bearer ${this.$GLOBAL.login_token}` } })
        .then(function(response) {
          if ((status = 200)) {
            alert("建立成功");
            self.$router.push(`Session/${self.$route.params.c_id}`);
          }
        })
        .catch(function(error) {
          alert(error.response.data[0])
        });
    }
  }
};
</script>