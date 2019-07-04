<script>
export default {
    // url,
    // api_url : `${url}/api`,
    login_token:'',
    userStatus:'',
    isShow:false,
    getCookie: function(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return (arr[2]);
        else
            return null;
    },
    setCookie: function (c_name, value, expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+";path=/";
    },
    delCookie: function (name) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate()-1);
        document.cookie = name + '=; expires='+exdate.toGMTString()+";path=/";
    },
    formatDate:function(d) {
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
}
</script>