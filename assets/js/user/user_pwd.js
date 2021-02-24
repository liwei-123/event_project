$(function () {
    const { form, layer } = layui
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6~12位,且不能为空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '确认密码与新密码不一致'
            }
        }
    })

    $(".layui-form").on("submit", function (e) {
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("更新密码失败!")
                }
                layer.msg("更新密码成功!")
                $(".layui-form")[0].reset();
            }
        })
    })
})