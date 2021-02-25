$(function () {
    const form = layui.form
    initCate();
    initEditor()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg("初始化文章失败!")
                }

                //调用模板引擎,渲染分类的下拉菜单
                var htmlStr = template("tpl-cate", res)

                $("[name=cate_id]").html(htmlStr)
                //一定要记得调用form.render方法
                form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on("click", function () {
        $("#coverFile").click()
    })

    //监听coverFile的change事件

    $("#coverFile").on("change", function (e) {
        var file = e.target.files

        if (file.length === 0) {
            return
        }

        var newImageUrl = URL.createObjectURL(file[0])
        //插件的方法
         $image
            .cropper('destroy')//销毁旧的裁剪区域
            .attr("src", newImageUrl)//重新设置图片路径
            .cropper(options);//重新初始化裁剪区域
    })

    //定义文章的发布状态
    var art_state = '已发布'
    //为存为草稿按钮绑定一个点击事件
    $("#btnSave2").on("click", function () {
        art_state = '草稿'
    })

    $("#form-pub").on("submit", function (e) {
        e.preventDefault();

        var fd = new FormData(this)
        fd.append("state", art_state)
        $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 400,
          height: 280
        })
        .toBlob(function(blob) {
          // 将 Canvas 画布上的内容，转化为文件对象
          // 得到文件对象后，进行后续的操作
          // 5. 将文件对象，存储到 fd 中
          fd.append('cover_img', blob)
          // 6. 发起 ajax 数据请求
          publishArticle(fd)
        })



        
    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败!')
                }
                location.href = '/article/art_list.html'
            }
        })
    }
})