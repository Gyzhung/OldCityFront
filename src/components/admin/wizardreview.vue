<style scoped>

</style>
<template>
    <div>
        
    </div>
</template>
<script>
export default {
    mounted() {
        const self = this;
        this.$http.get(`${this.$GLOBAL.path}/api/getUserCompletedListBys_id`,{
        headers:{ 
            authorization: `Bearer ${this.$GLOBAL.login_token}`
        },
        params:{
            s_id:this.$route.params.s_id,
        }})
        .then(function(response) {
            console.log(response)
        })
        .catch(function(error) {
            console.log(error.response)
        });
    },
}
</script>