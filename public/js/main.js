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
    },
};

main.init();