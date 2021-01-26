
function start() {
    GetAPINotification((data) => {
        renderListNotification(data);
    });
}

function GetAPINotification(callback) {
    var serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    }
    const urlAPI = 'https://viennhagroup.com/php/subjects.php';
    var config = {
        url: urlAPI,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: serialize({
            event: 'getDSNotify',
            page: 0,
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

function renderListNotification(data) {
    if (data) {
        const elListNotification = document.querySelector('.notification-list');
        let html = '';
        html = data.items.map(item => {
            return `<li class="notification-item">
            <span class="notification-item__icon">
                <i class="fas fa-bell"></i>
            </span>
            <a href="${'https://viennhagroup.com/upload/' + item.attachfile}" class="notification-link">
                <span>${item.content}
                </span>
            </a>
        </li>`
        })
        elListNotification.innerHTML = html.join('');
    }
}


start();