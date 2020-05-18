const authPw = {
    init : function() {
        document.getElementById('myNews').classList.remove('activeMenu');
        const _this = this;
        document.getElementById('modPw').onclick = function () {
            location.href = '/main/authpw';
        }
    },
}
// todo : 여기 작성해야댐
authPw.init();