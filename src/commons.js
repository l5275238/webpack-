import './lib/rem'
import fastclick from 'fastclick'
import './css/index.less'
import '@static/jquery-weui'

window.onload=function(){

    $.alert("自定义的消息内容");
}

fastclick.attach(document.body);