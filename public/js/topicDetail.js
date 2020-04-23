var page = 0;
document.getElementById('myNews').classList.remove('activeMenu');
document.getElementById('topic').classList.add('activeMenu');

$.ajax({
    type: 'get',
    url: '/topic/' + document.getElementById('pName').innerText + '/cnt',
    beforeSend: () => {
        const img = `<img id="load" style="margin: 0 auto" src="/img/load.gif">`;
        document.getElementById('box').innerHTML += img;
    },
    complete : () => {
        document.getElementById('load').style.display = 'none';
    }
}).then(function(res) {
    const lastPage = res / 10;

    const ajax = () => {
        $.ajax({
            type:'get',
            url:'/topic/' + document.getElementById('pName').innerText + '/news?page=' + page,
        }).then(function(res) {
            document.getElementById('box').innerHTML += res;
            page++;
        }), function(err) {
            document.getElementById('box').innerHTML = `<div style="text-align:center; width: 100%;">오류인데용.</div>`
        };
    } ;


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
    console.log(err);
    alert("헬로");
});