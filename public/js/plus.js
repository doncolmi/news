var page = 0;
const ajax = function() {$.ajax({
    type: 'get',
    url: '/news?page=' + page
}).then(function (res) {
    document.getElementById('boxs').innerHTML += res;
    page++;
}), function (error) {
    alert("오류잖아.");
}};

const options = { threshold: 1.0 };
const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            ajax();
        } else {
            console.log('화면에서 제외됨');
        }
    });
}
const observer = new IntersectionObserver(callback, options);
observer.observe(
    document.getElementById('plus')
);