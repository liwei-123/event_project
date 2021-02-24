$.ajaxPrefilter(function (options) {
    
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    console.log(options.url);

    //给/my/的接口统一添加请求头

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || '',
            //Authorization: localStorage.getItem('token') || '',和上行代码同样效果
        }
    }
    options. complete = function (response) {
        const { message, status } = response.responseJSON;

        if (message === '身份认证失败！' && status === 1) {
            localStorage.removeItem("token");
            location.href = '/login.html'
        }
    }
})