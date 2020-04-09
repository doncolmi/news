const move = (elem) => {window.scroll({behavior:"smooth", left : 0, top : elem.offsetTop})};

const clearData = () => {
    const inputs = document.getElementsByTagName('input');
    console.log(inputs.length);
    for(const item of inputs) {
        item.value = '';
    }
};

const val = (id, code) => {
    if(code.test(id)) {
        return true;
    } else {
        return false;
    }
}

const main = {
    init : function() {
        const _this = this;
        document.querySelector('#downInfo').onclick = function() {
            move(document.getElementsByClassName('welcome')[0]);
        };
        document.querySelector('#upLogin').onclick = function() {
            move(document.getElementsByClassName('wrapper')[0]);
        };
        document.querySelector('#goJoin').onclick = function() {
            move(document.getElementsByClassName('welcomes')[0]);
        };
        document.querySelector('#joinBack').onclick = function() {
            move(document.getElementsByClassName('wrapper')[0]);
            clearData();
        };

        document.querySelector('#join').onclick = function() {
            _this.join();
        }
    },
    join : function() {
        const id = document.getElementById('jId');
        const pw = document.getElementById('jPw');
        const pwCheck = document.getElementById('jPwCheck');
        const email = document.getElementById('jEmail');
        const joinText = document.getElementsByClassName('joinText');

        if (!val(id.value, /^[A-Za-z0-9_\-]{6,20}$/)) {
            id.style.border = "2px solid red";
            id.focus();
            joinText[0].innerHTML = `<small>아이디는 6~20자 이내의 영문 및 숫자만 작성해야 합니다.</small>`;
        } else {
            id.style.border = "1px solid blue";
            joinText[0].innerHTML = ``;
        }

        if (pw.value === pwCheck.value) {
            pwCheck.style.border = `1px solid blue`;
            joinText[2].innerHTML = ``;
            if (!val(pw.value, /^[A-Za-z0-9_\-]{6,20}$/)) {
                pw.style.border = "2px solid red";
                pw.focus();
                joinText[1].innerHTML = `<small>비밀번호는 6~20자 이내의 영문 및 숫자를 혼용해 작성해야 합니다.</small>`;
            } else {
                pw.style.border = `1px solid blue`;
                joinText[1].innerHTML = ``;
            }
        } else {
            pwCheck.style.border = `2px solid red`;
            pwCheck.focus();
            joinText[2].innerHTML = `<small>비밀번호가 일치하지 않습니다.</small>`;
        }

        if (!val(email.value, /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/)) {
            email.style.border = `2px solid red`;
            email.focus();
            joinText[3].innerHTML = `<small>이메일 형식이 아닙니다.</small>`;
        } else {
            email.style.border = `1px solid blue`;
            joinText[3].innerHTML = ``;
        }

        if(val(id.value, /^[A-Za-z0-9_\-]{6,20}$/) && val(pw.value, /^[A-Za-z0-9_\-]{6,20}$/) &&
            val(email.value, /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/) &&
            pw.value === pwCheck.value && chk(email.value, 'email') && chk(id.value, 'id')) {
            const data = {
                id : id.value,
                pw : pw.value,
                email : email.value
            }
            $.ajax({
                type: 'post',
                url: '/user',
                data: data,
            }).then(function(res) {
                console.log(res + "...");
                if(res > 0) {
                    location.href = "/";
                    alert("회원가입 완료되었습니다.");
                } else {
                    alert("서버 오류입니다.");
                    console.log(res);
                }
            }, function(error) {
                alert("서버 오류입니다.");
                console.log(error);
            });
        }
    }
};
// todo : 중복 검사 만들어야합니다...

clearData();
main.init();

// const main = {
//     init : function() {
//         const _this = this;
//         document.querySelector('#send').onclick = function() {
//             _this.logout();
//         }
//     },
//     logout : function() {
//         const data = {
//             "UID" : document.getElementById('UID').value,
//             "PASSWORD": document.getElementById('PASSWORD').value,
//             "EMAIL": document.getElementById('EMAIL').value,
//         }
//         console.log(data);
//         const url = "http://localhost:8080/user";
//         $.ajax({
//             type: 'POST',
//             url: url,
//             dataType: 'json',
//             contentType: 'application/json; charset=utf-8',
//             data: JSON.stringify(data)
//         }).then(function(res) {
//             console.log(res);
//             alert("안녕!");
//             location.href="/";
//         }, function(error) {
//             console.log(error);
//             alert("실패");
//         });
//     }
// };
// main.init();
// console.log("헬로");