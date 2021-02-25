$(function () {
    const form = layui.form
    const laypage = layui.laypage
    // 定义美化时间的过滤器
template.defaults.imports.dataFormat = function(date) {
    const dt = new Date(date)
  
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
  
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
  
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }
  
  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n
  }
    const q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable();
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败!")
                }

                var htmlStr = template('tpl-table', res)
                $("tbody").html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initCate();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("res.message")
                }
                const htmlStr = template("tpl-cate", res)
                $("[name=cate_id]").html(htmlStr)
                form.render();
              
            }
        })
    }

    $('#form-search').on('submit', function(e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
//渲染分页的方法
    function renderPage(total) {
        //total总的数据条数
        laypage.render({
            elem: 'pageBox',//分页容器的id
            count: total,//总数据条数
            limit: q.pagesize,//每页显示几天数据
            curr: q.pagenum,//设置默认选中的分页
            layout: ['count','limit','prev','page','next','skip'],
            jump: function (obj, first) {
                //把当前的页面赋值到q.pagenum上面去
                q.pagenum = obj.curr
                //把最新的条目数赋值到q.pagesize上面去

                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //通过代理的形式绑定删除事件
    $("tbody").on("click", '.btn-delete', function () {
        var id = $(this).data("id")
        var len = $(".btn-delete").length
        layer.confirm("确认删除?", { icon: 3, title: '提示' }, function (index) {
            
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("res.message")
                    }
                    layer.msg('删除成功!')
                    //当数据删除完成后,判断当前页是否还有剩余数据
                    //如果没有数据,让页码-1后再调用initTable函数
                    if (len === 1) {
                        //如果len的值等于1,证明删除完毕后,页面上没有任何数据了
                       q.pagenum   = q.pagenum === 1 ? 1 : q.pagenunm - 1
                       
                    }

                    initTable();
                }
            })
        })
    })
    
})