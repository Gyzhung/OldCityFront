<style scoped>
.photo_page{
    padding-top: 30px;
}
</style>
<template>
    <div class="content">
        <div class="container-fluid photo_page">
            <div class="row">
                <div class="col-4" v-for="photo in photos" :key="photo.bp_id">
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:["user"],
    data() {
        return {
            c_id:[],
            s_id:[],
            b_id:[],
            photos:[]
        }
    },
    mounted() {
        const self = this;
        this.$http.post(`http://163.17.145.142/api/searchCourse`, {
            keyword: `all:`
        })
        .then(function(response) {
            if ((status = 200)) {
                self.c_id = response.data.map(a=>a.c_id);
                self.c_id.forEach(c_id => {
                    self.$http.get(`http://163.17.145.142/api/getSessionListByc_id?c_id=${c_id}`)
                    .then(function(response) {
                        self.s_id = [...self.s_id,...response.data.map(a=>a.s_id)]
                        self.s_id.forEach(s_id => {
                            self.$http.get(`http://163.17.145.142/api/getBranchListBys_id`,{params:{ s_id:s_id}})
                            .then(function(response) {
                                self.b_id = [...self.b_id,...response.data.map(a=>a.b_id)];
                                console.log(self.b_id)
                                self.b_id.forEach(b_id => {
                                    self.$http.get(`http://163.17.145.142/api/getPicListByb_id`,{params:{ b_id:b_id}})
                                    .then(function(response) {
                                        self.photos = [... self.photos,...response.data];
                                        console.log(self.photos)
                                    })
                                    .catch(function(error) {
                                    });
                                });
                            })
                            .catch(function(error) {
                            });
                        });
                    })
                    .catch(function(error) {
                    });
                });
            }
        })
    },

}
</script>