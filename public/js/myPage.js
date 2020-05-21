const myPage = {
    init : function() {
        document.getElementById('myNews').classList.remove('activeMenu');
        const _this = this;
        document.getElementById('modPw').onclick = function () {
            location.href = '/main/authpw';
        };
        document.getElementById('bye').onclick = function () {
            const condition = confirm("정말 탈퇴하시겠습니까?");
            if(condition) {
                alert("탈퇴 되었습니다.");
                location.href = '/bye';
            };
        }
    },
}

myPage.init();