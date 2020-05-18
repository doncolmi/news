const myPage = {
    init : function() {
        document.getElementById('myNews').classList.remove('activeMenu');
        const _this = this;
        document.getElementById('modPw').onclick = function () {
            location.href = '/main/authpw';
        }
    },
}

myPage.init();