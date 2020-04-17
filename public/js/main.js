const main = {
    init : function() {
        const _this = this;
        document.getElementById('logout').onclick = function() {
            location.href = '/logout';
        }
    },
};

main.init();

function menu(elem) {
    const menus = document.getElementsByClassName('elem');
    for(const item of menus) {
        item.classList.remove('activeMenu');
    }
    elem.classList.add('activeMenu');
}