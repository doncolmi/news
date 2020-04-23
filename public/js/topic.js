document.getElementById('myNews').classList.remove('activeMenu');
document.getElementById('topic').classList.add('activeMenu');
document.getElementById('poli').onclick = function() {
    location.href='/main/topic/정치';
};
document.getElementById('poliImg').onclick = function() {
    location.href='/main/topic/정치';
};
document.getElementById('fina').onclick = function() {
    location.href='/main/topic/경제';
};
document.getElementById('finaImg').onclick = function() {
    location.href='/main/topic/경제';
};
document.getElementById('soci').onclick = function() {
    location.href='/main/topic/사회';
};
document.getElementById('sociImg').onclick = function() {
    location.href='/main/topic/사회';
};
document.getElementById('it').onclick = function() {
    location.href='/main/topic/IT';
};
document.getElementById('itImg').onclick = function() {
    location.href='/main/topic/IT';
};
document.getElementById('opin').onclick = function() {
    location.href='/main/topic/칼럼';
};
document.getElementById('opinImg').onclick = function() {
    location.href='/main/topic/칼럼';
};

function plus(name) {
    $.ajax({
        type:'get',
        url:'/topic/add?name=' + name
    }).then(function(res) {
        if(res > 0) {
            location.reload();
        } else {
            alert("추가 오류 입니다.");
        }
    }), function(err) {
        alert("추가 오류 입니다.");
    };
}

function minus(name) {
    $.ajax({
        type:'get',
        url:'/topic/remove?name=' + name
    }).then(function(res) {
        if(res) {
            location.reload();
        } else {
            alert("추가 오류 입니다.");
        }
    }), function(err) {
        alert("추가 오류 입니다.");
    };
}