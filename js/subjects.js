function start() {
    getAPIListSubject((subjects) => {
        renderListSubject(subjects);
    }, 0);
};

start();

function getAPIListSubject(callback, pagination) {
    var serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    const urlAPI = 'https://viennhagroup.com/php/admin_api.php';
    var config = {
        url: urlAPI,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: serialize({
            event: 'getDSMonHoc',
            page: pagination,
            record: 10
        })
    }

    axios(config)
        .then(res => {
            console.log(res.data);
            return res.data;
        })
        .then(callback)
        .catch(err => console.log(err));
}


function renderListSubject(subjects) {
    if (subjects) {
        var elList = document.querySelector('.navbar-subject__list');
        var elBtn = document.getElementById('btn-list-subject');
        var html = '';
        var listBtn = '';
        html = subjects.items.map(subject => {
            return `<li class="navbar-subject__item">
            <a href="#" class="navbar-subject__link">
                <i class="fas fa-book"></i>
             ${(subject.tenmon)}
            </a>
        </li>`
        })
        for (var i = 0; i < subjects.totalpage; i++) {
            listBtn += `<li class="page-item">
            <a onClick = "changePagination(${i})" class="page-link" href="#">${i + 1}</a>
        </li>`;
        }
        if (listBtn) {
            elBtn.innerHTML = listBtn;
        }
        elList.innerHTML = html.join('');
    }
}
function changePagination(index) {
    getAPIListSubject((subjects) => {
        renderListSubject(subjects)
    }, index);
    console.log(index)
}
// slick
var glide = new Glide('#intro', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    autoplay: 3000,
    breakpoints: {
        800: {
            perView: 2
        },
        480: {
            perView: 1
        }
    }
})

glide.mount({})