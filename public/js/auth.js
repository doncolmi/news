const main = {
    init : function() {
        const _this = this;
        document.querySelector('#mail').onclick = function() {
            _this.sendMail();
        }
    },
    sendMail : function () {
        const data = {email : document.querySelector('.bam').innerText};
        $.ajax({
            type: 'post',
            url: '/user/resend',
            data: data
        }).then(function(res) {
            if(res) {
                alert("재전송 되었습니다!");
            }
        }, function(error) {
            alert("서버 오류 입니다.");
        });
    }
}

main.init();