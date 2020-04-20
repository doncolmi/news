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

function plus(name, item) {
    $.ajax({
        type:'get',
        url:'/press/add?name=' + name
    }).then(function(res) {
        if(res > 0) {
            item.classList.remove('fa-plus-square');
            item.classList.add('fa-minus-square');
            item.onclick = `minus(${name})`;
        } else {
            alert("추가 오류 입니다.");
        }
    }), function(err) {
        alert("추가 오류 입니다.");
    };
}

function minus(name, item) {
    $.ajax({
        type:'get',
        url:'/press/remove?name=' + name
    }).then(function(res) {
        if(res) {
            item.classList.remove('fa-minus-square');
            item.classList.add('fa-plus-square');
            item.onclick = `plus(${name})`;
        } else {
            alert("추가 오류 입니다.");
        }
    }), function(err) {
        alert("추가 오류 입니다.");
    };
}