const main = {
    init : function() {
        const _this = this;
        document.querySelector('#send').onclick = function() {
            _this.logout();
        }
    },
    logout : function() {
        const data = {
            "UID" : document.getElementById('UID').value,
            "PASSWORD": document.getElementById('PASSWORD').value,
            "EMAIL": document.getElementById('EMAIL').value,
        }
        console.log(data);
        const url = "http://localhost:8080/user";
        $.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).then(function(res) {
            console.log(res);
            alert("안녕!");
            location.href="/";
        }, function(error) {
            console.log(error);
            alert("실패");
        });
    }
};
main.init();
console.log("헬로");