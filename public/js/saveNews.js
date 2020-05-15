var page = 0;

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
    const lastPage = res / 10;
    const ajax = () => {
        $.ajax({
            type: 'get',
            url: `/save?page=` + page
        }).then(function (res) {
            document.getElementById('boxs').innerHTML += res;
            page++;
            console.log("훔..." + page);
        }).catch(function (err) {
            console.log(err);
        });
    };
    const options = {threshold: 1.0};
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (page < lastPage) {
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
})
