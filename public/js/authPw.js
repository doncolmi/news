const authPw = {
    init : function() {
        document.getElementById('myNews').classList.remove('activeMenu');
        const _this = this;
        document.getElementById('modPw').onclick = function () {
            _this.authPwCheck();
        };
    },
    authPwCheck : function() {
        const authPw = document.getElementById('authPw').value;
        $.ajax({
            type: 'post',
            url: '/user/info',
            data: {pw : authPw}
            // todo : 딱 여기까지 했습니다.
            // todo : /user/info에 대한 controller부분하고 java부분 그리고 아래 then 부분도 완성해야합니다.
        }).then(function(res) {
            if(res === 0) {
                id.style.border = "2px solid blue";
                document.getElementsByClassName('joinText')[0].innerHTML = ``;
                idc = true;
            } else {
                const text = "<small>중복된 아이디 입니다.</small>";
                warn(id, 0, text);
                idc = false;
            }
        }, function(error) {
            idc = false;
        });
    }

}
authPw.init();