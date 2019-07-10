<style scoped>
.photo_page{
    padding-top: 50px;
}
</style>

<template>
    <div class="content">
        <div class="container-fluid photo_page">
            <div class="row">
                <div class="col-2">
                    <router-link class="btn btn-primary" style="color:white;" :to="{name:'upload',params:{b_id:$route.params.b_id}}">新增</router-link>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-4" v-for="photo in photos" :key="photo.bp_id">
                    <div class="card">
                        
                        <div class="card-body">
                            <img :src="`http://163.17.145.142/images/OriginalImage/${photo.b_picName}`" width="100%" alt="">
                        </div>
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
            photos:[]
        }
    },
    mounted() {
        const self = this;
        this.$http.get(`http://163.17.145.142/api/getPicListByb_id`,
            {
                params:{ b_id:this.$route.params.b_id}
            }
        )
        .then(function(response) {
            self.photos = response.data;
        })
        .catch(function(error) {
            alert(error.response.data);
        });
    },
}
</script>