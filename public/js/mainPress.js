document.getElementById('myNews').classList.remove('activeMenu');
document.getElementById('press').classList.add('activeMenu');

$.ajax({
    type:'get',
    url:'/press'
}).then(function(res) {
    document.getElementById('presses').innerHTML = res;
}), function(err) {
    alert(err);
};

function plus(name) {
    $.ajax({
        type:'get',
        url:'/press/add?name=' + name
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
        url:'/press/remove?name=' + name
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

document.getElementById('followSort').onclick = function () {
    $.ajax({
        type:'get',
        url:'/press/follow'
    }).then(function(res) {
        document.getElementById('nameSort').style.fontWeight = 'normal';
        document.getElementById('followSort').style.fontWeight = 'bold';
        document.getElementById('presses').innerHTML = res;
    }), function(err) {
        alert(err);
    };
}

document.getElementById('nameSort').onclick = function () {
    location.reload();
}