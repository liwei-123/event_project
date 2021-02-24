$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
    $image.cropper(options)
    
//点击上传按钮,弹出file文件选择框
    $("#btnChooseImage").on('click', function () {
        $("#file").click();
    })

    $("#file").on("change", function (e) {
        const fileList = this.files;
        if (fileList.length === 0) {
            return layer.msg("请选择文件")
        }

        const file = fileList[0];

        const imgUrl = URL.createObjectURL(file);


        $image
            .cropper('destroy')
            .attr("src", imgUrl)
            .cropper(options);
    })

    //为确定按钮绑定点击事件 
    $("#upload").on("click", function () {
        //获取用户选择的图片
        var dataURL = $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
            .toDataURL('image/png')
        
        //图片上传到服务器

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
              avatar: dataURL
            },
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('更换头像失败！')
              }
              layer.msg('更换头像成功！')
              window.parent.getUserInfo()
            }
          })
    })
})