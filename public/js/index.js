const move = (elem) => {window.scroll({behavior:"smooth", left : 0, top : elem.offsetTop})};

const clearData = () => {
    const inputs = document.getElementsByTagName('input');
    console.log(inputs.length);
    for(const item of inputs) {
        item.value = '';
    }
};

const warn = (item, i, text) => {
    item.style.border = "2px solid red";
    item.focus();
    document.getElementsByClassName('joinText')[i].innerHTML = text;
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
        document.querySelector('#log').onclick = function() {
            _this.login();
        };
        document.querySelector('#joinBack').onclick = function() {
            move(document.getElementsByClassName('wrapper')[0]);
            clearData();
        };

        document.querySelector('#join').onclick = async function() {
            await _this.idCheck();
            await _this.pwCheck();
            await _this.emailCheck();
            if(idc && pwc && emailc) {
                await _this.join();
            }
        }
    },
    idCheck : async function() {
        const id = document.getElementById('jId');
        const pattern = /^[A-Za-z0-9_\-]{6,20}$/;
        if(!(pattern.test(id.value))) {
            const text = "<small>아이디는 6~20자 이내의 영문 및 숫자만 작성해야 합니다.</small>";
            warn(id, 0, text);
            idc = false;
        } else {
            await $.ajax({
                type: 'get',
                url: '/user?data=' + id.value +"&type=id",
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
    },
    pwCheck : async function() {
        const pw = document.getElementById('jPw');
        const pwCh = document.getElementById('jPwCheck');
        const pattern = /^[A-Za-z0-9_\-]{6,20}$/;

        if(pw.value === pwCh.value) {
            pwCh.style.border = "2px solid blue";
            document.getElementsByClassName('joinText')[2].innerHTML = ``;
            if(!pattern.test(pw.value)) {
                const text = "<small>비밀번호는 6~20자 이내의 영문 및 숫자를 혼용해 작성해야 합니다.</small>";
                warn(pw, 1, text);
                pwc = false;
            } else {
                pw.style.border = "2px solid blue";
                document.getElementsByClassName('joinText')[1].innerHTML = ``;
                pwc = true;
            }
        } else {
            const text = "<small>위 비밀번호와 일치하지 않습니다.</small>";
            warn(pwCh, 2, text);
            pwc = false;
        }
    },
    emailCheck : async function() {
        const email = document.getElementById('jEmail');
        const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(!(pattern.test(email.value))) {
            const text = "<small>올바른 이메일 형식이 아닙니다.</small>";
            warn(email, 3, text);
            emailc = false;
        } else {
            await $.ajax({
                type: 'get',
                url: '/user?data=' + email.value +"&type=email",
            }).then(function(res) {
                if(res === 0) {
                    email.style.border = "2px solid blue";
                    document.getElementsByClassName('joinText')[3].innerHTML = ``;
                    emailc = true;
                } else {
                    const text = "<small>중복된 이메일 입니다.</small>";
                    warn(email, 3, text);
                    emailc = false;
                }
            }, function(error) {
                emailc = false;
            });
        }
    },
    join : async function() {
        const data = {
            id : document.getElementById('jId').value,
            pw : document.getElementById('jPw').value,
            email : document.getElementById('jEmail').value
        }
        $.ajax({
            type: 'post',
            url: '/user',
            data: data,
        }).then(function(res) {
            if(res > 0) {
                location.href = "/";
                alert("회원가입 완료 되었습니다.");
            } else {
                alert("서버 오류 입니다.");
                console.log(res);
            }
        }, function(error) {
            alert("서버 오류 입니다.");
            console.log(error);
        });
    },
    login : async function() {
        const data = {
            id : document.getElementById('id').value,
            pw : document.getElementById('pw').value
        }
        $.ajax({
            type: 'post',
            url: '/user/login',
            data: data,
        }).then(function (res) {
            console.log("에러인데엥");
            if(res) {
                location.href = "/";
                alert("로그인완료");
            } else {
                alert("장난하냐?");
            }
        }), function (error) {
            alert("아이디 혹은 비밀번호가 맞지 않습니다.");
            clearData();
        };
    }
};
let idc = false; let pwc = false; let emailc = false;
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