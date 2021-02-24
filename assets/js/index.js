$(function () {
    getUserInfo();

    //给退出按钮添加一个绑定事件
    $("#btnLogOut").on("click", function () {
        layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem("token")
            location.href = '/login.html'

            layer.close(index);
          });
    })
})
//这个函数写在外面的原因，在全局作用域里面可以被其他脚本文件调用
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        
        success(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            
            renderAvatar(res.data);
        },
       
    })
}

//渲染用户信息函数

function renderAvatar(user) {
    const username = user.nickname || user.username;
    $("#welcome").html(username);

    //渲染文本头像和图片头像

    if (user.user_pic) {
        //渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        //渲染文字图像
        $(".layui-nav-img").hide();
        const firstName = username[0].toUpperCase();

        $(".text-avatar").html(firstName).show();
    }
}