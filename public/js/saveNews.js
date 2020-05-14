let page = 0;

document.getElementById('myNews').classList.remove('activeMenu');

$.ajax({
    type: 'get',
    url: '/news/save/cnt',
    beforeSend: () => {
        const img = `<img id="load" style="margin: 0 auto" src="/img/load.gif">`;
        document.getElementById('boxs').innerHTML += img;
    },
    complete : () => {
        document.getElementById('load').style.display = 'none';
    }
}).then(function(res) {
    const lastPage = res;

    const ajax = function() {
        $.ajax({
            type: 'get',
            url: '/news/save?page=' + page
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
                if(page < lastPage) {
                    ajax();
                } else {
                    observer.unobserve(entry.target);
                }
            }
        });
    }
    const observer = new IntersectionObserver(callback, options);
    observer.observe(
        document.getElementById('plus')
    );
}).catch(async err => {
    alert("헬로");
});