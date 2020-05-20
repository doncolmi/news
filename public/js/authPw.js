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
        if(authPw.length > 0) {
            $.ajax({
                type: 'post',
                url: '/user/info',
                data: {pw : authPw}
            }).then(function(res) {
                if(res) {
                    $.ajax({
                        type: 'get',
                        url: '/user/info'
                    }).then(function (res) {
                        document.getElementById('contents').innerHTML= res;
                        changePw.init();
                    }), function (error) {
                        alert("오류잖아.");
                    }
                } else {
                    alert("비밀번호가 맞지 않습니다.");
                }
            }, function(error) {
                console.log(error);
            });
        } else {
            alert("비밀번호를 입력해주세요");
            authPw.focus();
        }

    }

}
authPw.init();

const changePw = {
    init : function() {
        const _this = this;
        document.getElementById('chgPw').onclick = function() {
            const pw = document.getElementById('pw');
            const pwc = document.getElementById('pwc');
            if(_this.chkPw(pw, pwc)) {
                _this.chgPw(pw);
            }
        }
    },
    chkPw : function(pw, pwc) {
        const pText = document.getElementsByClassName('elemText')[0];
        const cText = document.getElementsByClassName('elemText')[1];
        const pattern = /^[A-Za-z0-9_\-]{6,20}$/;
        if(pw.value === pwc.value) {
            pwc.style.border = "2px solid blue";
            cText.innerHTML = '';
            if(!pattern.test(pw.value)) {
                const text = "<small>비밀번호는 6~20자 이내의 영문 및 숫자를 혼용해 작성해야 합니다.</small>";
                pw.style.border = "2px solid red";
                pText.innerHTML = text;
                pw.focus();
                return false;
            } else {
                pw.style.border = "2px solid blue";
                pText.innerHTML = '';
                return true;
            }
        } else {
            const text = "<small>위 비밀번호와 일치하지 않습니다.</small>";
            pwc.style.border = "2px solid red";
            cText.innerHTML = text;
            pwc.focus();
            return false;
        }
    },
    chgPw : function (pw) {
        $.ajax({
            type: 'post',
            url: '/user/chgPw',
            data: {pw : pw.value}
        }).then(function(res) {
            if(res) {
                alert("비밀번호 변경이 완료되었습니다. 다시 로그인해주세요.")
                location.href = "/";
            } else {
                alert("오류 발생");
            }
        }, function(error) {
            console.log(error);
        });
    }
}