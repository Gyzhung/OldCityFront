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
}
</script>