$(function () {
    // Cấu trúc của JQuery: đợi cho đến khi trang load xong thì mới chạy
    AUTH.bindingEvent();
});

const AUTH = {
    bindingEvent: () => {

        $('#btn-login-submit').unbind();
        $('#btn-login-submit').click(function (e) {
            AUTH.action.signin();
        });
    },
    action: {
        
        signin: () => {
            let username = $('#username').val();
            let password = $('#password').val();

            // Validate

            // Call api signIn
            let url = 'http://localhost:3000/v2/api/auth/signin';
            fetch(
                url,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                }
            ).then(async (res) => {
                let responseBody = await res.json();
                let token = responseBody.data.token;
                // lưu token vào local storage
                localStorage.setItem('acess_token', token);
                Toastify({
                    text: 'Đăng nhập thành công',
                    duration: 2000
                }).showToast();
                setTimeout(() => {
                    // ridirect đến trang chủ
                    window.location = '/';
                }, 2010);
            })
        }
    }
}