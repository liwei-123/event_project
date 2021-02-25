$(function () {
    //获取文章的初始化列表
    const form = layui.form
    initArtCateList();
    //获取文章列表并渲染
    function initArtCateList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                const htmlStr = template("tpl-table", res);
                console.log(htmlStr);
                $('tbody').html(htmlStr)
            }
        })
    }

    //为添加类被按钮绑定事件
    let addIndex = null
    $("#btnAddCate").on("click", function () {
        addIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加类别',
            content: $("#dialog-add").html()
        })
    })
    //添加分类
    $("body").on("click", "#form-add", function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("添加分类成功")
                initArtCateList();
                layer.close(addIndex);
            }
        })
    })

    let editIndex = null
    $("tbody").on("click", ".btn-edit", function () {
        editIndex = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '编辑类别',
            content: $("#dialog-edit").html()
        })
    

        const id = $(this).data("id");
        console.log(id);

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success(res) {
                form.val("form-edit", res.data);
            }
        })
    })

    $('body').on("submit", "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败!')
                }
                layer.msg("更新分类数据成功!");
                layer.close(editIndex);
                initArtCateList();
            }
        })
    })

    //通过代理的形式
    $("tbody").on("click", '.btn-delete', function () {
        const id = $(this).data("id")
        layer.confirm("确认删除?", { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success(res) {
                    if (res.status !== 0) {
                        return layer.msg("删除分类失败!");
                    }
                    layer.msg('删除分类成功!')
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    

    })

   
})