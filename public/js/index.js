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

const emCheck = (value) => {
    const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if(!(pattern.test(value))) {
        alert("이메일을 입력하지 않았습니다.");
        return false;
    } else {
        return true;
    }
};


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
        document.querySelector('#log').onclick = async function() {
            _this.login();
        };
        document.querySelector('#findIdBtn').onclick = async function() {
            await _this.emailForFindId(document.getElementById('findEmail').value);
        }
        document.querySelector('#joinBack').onclick = function() {
            move(document.getElementsByClassName('wrapper')[0]);
            clearData();
        };
        document.querySelector('#findIdBtn').onclick = function() {
            const email = document.getElementById('findId').value;
            const check = emCheck(email);
            if(check) {
                $.ajax({
                    type: 'get',
                    url: '/find/id?email=' + email,
                }).then(function(res) {
                    document.getElementById('findIdRes').innerHTML = res;
                }), function (error) {
                    alert("서버 오류입니다.");
                }
            }
        };
        document.querySelector('#findPwBtn').onclick = function() {
            const id = document.getElementById('findPwId').value;
            const email = document.getElementById('findPwEm').value;
            const pattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
            if (id.length > 0 && pattern.test(email)) {
                $.ajax({
                    type: 'get',
                    url: '/find/pw?email=' + email + '&id=' + id,
                }).then(function (res) {
                    document.getElementById('findPwRes').innerHTML = res;
                }), function (error) {
                    alert("서버 오류입니다.");
                }
            } else {
                alert("정보를 제대로 입력해주세요.");
            }
        },
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
            url: '/login',
            data: data,
        }).then(function (res) {
            console.log("에러인데엥");
            if(res) {
                location.href = "/main";
                alert("로그인완료");
            } else {
                alert("장난하냐?");
            }
        }), function (error) {
            alert("아이디 혹은 비밀번호가 맞지 않습니다.");
            clearData();
        };
    },
    emailForFindId : async function(email) {
        $.ajax({
            type: 'get',
            url: '/find/id?email=' + email,
        }).then(function(res) {
            document.getElementById('result').innerHTML = res;
            document.getElementById('findIdBtn').style.display = "none";
        }), function (error) {
            alert("서버 오류입니다.");
        }
    },
};
let idc = false; let pwc = false; let emailc = false;
clearData();
main.init();
