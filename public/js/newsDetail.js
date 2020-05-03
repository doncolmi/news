const newsJs = {
    init : function() {
        let rPage = 1;
        const _this = this;
        const newsNum = document.getElementById('newsIds').innerText;
        document.getElementById('replyFormBtn').onclick = function () {
            if(_this.vailReply()) {
                const data = {
                    contents : document.getElementById('replyForm').value
                }
                $.ajax({
                    type: 'post',
                    url: '/news/' + newsNum + '/reply',
                    data: data,
                }).then(function (res) {
                    document.getElementById('newsModalContent').innerHTML = res;
                    newsJs.init();
                }), function (error) {
                    alert("오류잖아.");
                };
            } else {
                alert("댓글의 내용이 너무 적습니다.");
            }
        }

        document.getElementById('replyPlus').onclick = function() {
            $.ajax({
                type: 'get',
                url: '/news/' + newsNum + '/reply?page=' + rPage,
            }).then(function (res) {
                document.getElementById('reply').innerHTML += res;
                const rCnt = document.getElementById('allReply').innerText * 1;
                const nowCnt = document.getElementsByClassName('reply').length;
                if(nowCnt >= rCnt) {
                    document.getElementById('replyPlus').style.display = 'none';
                } else {
                    document.getElementById('hel').innerHTML = nowCnt;
                }
            }), function (error) {
                alert("오류잖아.");
            };
            rPage++;
        }
    },
    vailReply : function() {
        return document.getElementById('replyForm').value.length > 20
    },
}

function modifyReply(id) {
    $.ajax({
        type : 'get',
        url : '/news/reply/' + id,
    }).then(function(res) {
        document.getElementById('reply' + id).innerHTML = res;
    }).catch(err => {
        console.log(err);
    });
}

function modifyContents(id) {
    $.ajax({
        type : 'patch',
        url : '/news/reply/' + id,
        data : {
            contents : document.getElementById('replyForm' + id).value,
        }
    }).then(function(res) {
        document.getElementById('reply' + id).innerHTML = res;
    }).catch(err => {
        console.log(err);
    });
}

function deleteReply(id) {
    const conf = confirm("댓글을 삭제하시겠습니까?");
    if(conf) {
        $.ajax({
            type : 'delete',
            url : '/news/reply/' + id,
        }).then(function(res) {
            document.getElementById('reply' + id).innerHTML = "삭제된 댓글입니다.";
        }).catch(err => {
            console.log(err);
        });
    }
}

function showThis() {
    document.getElementById('noReply').style.display = 'none';
    document.getElementById('replyBox').style.display = 'inherit';
}