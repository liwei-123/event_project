$(function () {
    const {form,layer} = layui

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在1~6个字符之间'
            }
        }
    })

    initUserInfo();
    //初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }

                form.val("formUserInfo",res.data)
                console.log(res);
            }
        })
    }

    $("#btnReset").on("click", function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //监听表单的提交事件

    $(".layui-form").on('submit', function (e) {
        //阻止表单的默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败")
                }
                layer.msg("更新用户信息成功!")
                //调用父页面中的方法,重新渲染用户头像和用户名称
                window.parent.getUserInfo()
            }
        })
    })
})