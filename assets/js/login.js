$(function () {
    //给#link_reg绑定点击事件,点击.login-box隐藏,.reg-box显示
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    //给#link_login绑定点击事件,点击.login-box显示,.reg-box隐藏
    $("#link_login").on("click", function () {
        $(".reg-box").hide()
        $(".login-box").show()
    })

    var form = layui.form
    //通过form.verify()函数自定义校验规则

    form.verify({
        //自定义了一个叫做pwd校验规则
        
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
        repwd: function (value) {
            const password = $(".reg-box [name=password]").val();
            if (password !== value) {
                return '两次输入的密码不一致'
            }
        }
    })


   // 监听 注册 表单的提交事件
$('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
   layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
})
    
    
   // 监听 登录 表单的提交事件
$('#form_login').submit(function(e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
})
})