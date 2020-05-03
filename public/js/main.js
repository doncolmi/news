document.getElementById('myNews').classList.add('activeMenu');

const main = {
    init : function() {
        const _this = this;
        document.getElementById('logout').onclick = function() {
            location.href = '/logout';
        }
        document.getElementById('news').onclick = function() {
            location.href = '/main/news'
        }
        document.getElementById('myNews').onclick = function() {
            location.href = '/main';
        }
        document.getElementById('press').onclick = function() {
            location.href = '/main/press';
        }
        document.getElementById('topic').onclick = function() {
            location.href = '/main/topic';
        }
        document.getElementById('commentSet').onclick = function () {
            _this.commentSet();
        }
        document.getElementById('setIcon').onclick = function() {
            _this.checkSet();
        }
    },
    commentSet : function() {
        const now = document.getElementById('commentSet').checked;
        if(now){
            document.getElementById('commentSetLabel').innerHTML = "기사 댓글이 표시됩니다.";
        } else {
            document.getElementById('commentSetLabel').innerHTML = "기사 댓글이 표시되지 않습니다.";
        }
        $.ajax({type: 'get', url : '/set/comment',});
    },
    checkSet : function() {
        $.ajax({
            type: 'get',
            url : '/set',
        }).then(function(res) {
            if(res) {
                document.getElementById('commentSet').checked = true;
                document.getElementById('commentSetLabel').innerText = "기사 댓글이 표시됩니다."
            } else {
                document.getElementById('commentSet').checked = false;
                document.getElementById('commentSetLabel').innerText = "기사 댓글이 표시되지 않습니다."
            }
        }), function(err) {
            console.log(err);
        }
    },
    whiteBoard : function() {
        document.getElementById('newsModalContent').innerHTML = '';
    }
};

main.init();

function getNewsBoard(id) {
    document.getElementById('newsModalContent').innerHTML = '';
    $.ajax({
        type : 'get',
        url : '/news/' + id,
    }).then(function(res) {
        document.getElementById('newsModalContent').innerHTML = res;
        newsJs.init();
    });
};

