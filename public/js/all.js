let page = 1;
const box = document.getElementById('boxs');
$.ajax({
    type: 'get',
    url: '/news?page=' + page
}).then(function (res) {
    box.innerHTML += res;
}), function (error) {
    alert("오류잖아.");
};