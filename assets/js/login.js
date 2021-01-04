$(function() {
    // 去注册页面的代码
    $('#link_reg').on('click', function() {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    $('#link_login').on('click', function() {
        $('.reg_box').hide();
        $('.login_box').show();
    })

    // 从layui中获得form对象
    var form = layui.form;
    // var layer = layui.layer;
    // 通过 form.verify函数 自定义校验规则
    form.verify({
            // 自定义了一个叫pwd的校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            //再次自定义了个自定义规则
            rpwd: function(value) {
                //通过形参value 拿到在此确认密码中的内容
                // 还需要拿到密码框中的内容，二者进行一次
                // 判断，如果不相等，return一个提示信息就行了
                var pwd = $('.reg_box [name=password]').val();
                if (pwd !== value) {
                    return '两次结果不一致';
                }
            }
        })
        //调用接口 注册用户的请求
        //首先阻止form表单 的提交行为 再使用ajax的post提交
        //监听表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功，请登录！');
                //模拟人的点击行为
                $('#link_login').click();
            })

    })

    //调用接口发起登录请求
    //监听登录表单的默认提交
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: "/api/login",
            method: "Post",
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('登录成功');
                //将登录成功后返回的token 字符串保存道浏览器localStorage中
                localStorage.setItem('token', res.token);
                location.href = "/index.html";

            }
        });
    })
})