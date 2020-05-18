var page = 1;


$.ajax({
    type:'get',
    url:'/news/recent'
}).then(function(res) {
    document.getElementById('recent').innerHTML += res;
}), function(err) {
    alert(err);
};

function pressFollow() {
    document.getElementsByClassName('type')[0].style.fontWeight = 'bold';
    document.getElementsByClassName('type')[0].style.color = 'black';
    document.getElementsByClassName('type')[1].style.fontWeight = 'normal';
    document.getElementsByClassName('type')[1].style.color = 'gray';
    $.ajax({
        type: 'get',
        url: '/main/cnt/press',
        beforeSend: () => {
            const img = `<img id="load" style="margin: 0 auto" src="/img/load.gif">`;
            document.getElementById('boxs').innerHTML += img;
        },
        complete : () => {
            document.getElementById('load').style.display = 'none';
        }
    }).then(function(res) {
        if(res === 0) {
            const html = `<div class="noNews">
    <div class="noNewsText">
        <h1>현재 팔로우 하는 언론사가 없습니다.</h1><a>언론사 리스트에 가셔서 좋아하는 언론사를 추가하시면 뉴스 컨텐츠가 표시됩니다.</a></div>
    <div class="noNewsBtns">
        <div class="noNewsBtn"><i class="fas fa-globe-asia fa-3x"></i>
            <div class="btnText">현재 올라온 모든 기사들을 보고싶으세요?</div>
            <div class="btn btn-primary w50" onclick="location.href='/main/news'">기사 전체보기</div>
        </div>
        <div class="noNewsBtn"><i class="far fa-newspaper fa-3x"></i>
            <div class="btnText">현재 등록된 모든 언론사 리스트를 보고싶으세요?</div>
            <div class="btn btn-info w50" onclick="location.href='/main/press'">언론사 전체보기</div>
        </div>
    </div>
</div>`;
            document.getElementById('boxs').innerHTML = html;
        } else {
            const lastPage = res;

            $.ajax({
                type: 'get',
                url: '/main/myNews?page=0'
            }).then(function (res) {
                document.getElementById('boxs').innerHTML = res;
            }), function (error) {
                alert("오류잖아.");
            }

            const ajax = function() {
                $.ajax({
                    type: 'get',
                    url: '/main/myNews?page=' + page
                }).then(function (res) {
                    document.getElementById('boxs').innerHTML += res;
                    page++;
                }), function (error) {
                    alert("오류잖아.");
                }
            };


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
        }
    }).catch(async err => {
        alert("헬로");
    });
};

function topicFollow() {
    document.getElementsByClassName('type')[1].style.fontWeight = 'bold';
    document.getElementsByClassName('type')[1].style.color = 'black';
    document.getElementsByClassName('type')[0].style.fontWeight = 'normal';
    document.getElementsByClassName('type')[0].style.color = 'gray';
    $.ajax({
        type: 'get',
        url: '/main/cnt/topic',
        beforeSend: () => {
            const img = `<img id="load" style="margin: 0 auto" src="/img/load.gif">`;
            document.getElementById('boxs').innerHTML += img;
        },
        complete : () => {
            document.getElementById('load').style.display = 'none';
        }
    }).then(async function(res) {
        if(res === 0) {
            const html = `<div class="noNews">
    <div class="noNewsText">
        <h1>현재 팔로우 하는 주제가 없습니다.</h1><a>주제 리스트에 가셔서 좋아하는 주제를 추가하시면 뉴스 컨텐츠가 표시됩니다.</a></div>
    <div class="noNewsBtns">
        <div class="noNewsBtn"><i class="fas fa-globe-asia fa-3x"></i>
            <div class="btnText">현재 올라온 모든 기사들을 보고싶으세요?</div>
            <div class="btn btn-primary w50" onclick="location.href='/main/news'">기사 전체보기</div>
        </div>
        <div class="noNewsBtn"><i class="fas fa-list fa-3x"></i>
            <div class="btnText">모든 주제 리스트를 보고싶으세요?</div>
            <div class="btn btn-info w50" onclick="location.href='/main/topic'">주제 전체보기</div>
        </div>
    </div>
</div>`;
            document.getElementById('boxs').innerHTML = html;
        } else {
            const lastPage = res;

            $.ajax({
                type: 'post',
                url: '/main/myNews',
                data: {page : 0},
            }).then(function (res) {
                document.getElementById('boxs').innerHTML = res;
            }), function (error) {
                alert("오류잖아.");
            }

            const ajax2 = function() {
                $.ajax({
                    type: 'post',
                    url: '/main/myNews',
                    data: {page : page},
                }).then(function (res) {
                    document.getElementById('boxs').innerHTML += res;
                    page++;
                }), function (error) {
                    alert("오류잖아.");
                }
            };


            const options = { threshold: 1.0 };
            const callback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if(page < lastPage) {
                            ajax2();
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
        }
    }).catch(async err => {
        alert("헬로");
    });
};

pressFollow();

document.getElementById('presss').onclick = async function () {
    page = 1;
    await pressFollow();
    console.log("실행");
};
document.getElementById('topics').onclick = async function () {
    page = 1;
    await topicFollow();
};