//注意 每次条用$.get() 或 $.post 或 $.ajax()的时候 会先调用
// ajaxPrefilter 这个函数 在这个函数找那个可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax请求前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})