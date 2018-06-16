import '../css/index.less'
import 'video.js/dist/video-js.css';
import videojs from 'video.js'
import server from '../lib/index/api'
import '../../node_modules/jquery-weui/dist/js/jquery-weui.js'

import soshm from 'soshm'
window.videojs=videojs
window.onload = () => {
    server.getCode()
    var width=$(window).width();
    var domObj={}
// server.getToken().then()
    // wx.config({
    //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: 'wxa55d67c39e421f09', // 必填，公众号的唯一标识
    //     timestamp: , // 必填，生成签名的时间戳
    //     nonceStr: '', // 必填，生成签名的随机串
    //     signature: '',// 必填，签名
    //     jsApiList: [] // 必填，需要使用的JS接口列表
    // });
    var myPlayer = videojs("example_video_1");
    myPlayer.width(width);
    myPlayer.ready(function(){

        // myPlayer.play();
    });
    server.getShop().then(data=>{
        domObj=data.list[0];
        domObj.noPrice=domObj.unitSalePrice;
        $('#productName').val(domObj.productName)
        $('#detail').html(domObj.productDesc)
        $('#price').val(domObj.noPrice)
        active(domObj.productRelationDTOList)
    })

    function active(list) {
        let html=""
        if(list.length>0){

            for(let value of list){
                html+="满"+value.num+"价格："+value.price+"元赠送"+value.remark+";";
            }
        }
        $('#acitive').html(html)
    }
    function add() {
        let data={
            productId: domObj.id,
            num:$('#num').val(),
            linkMan:$('#linkMan').val(),
            phone:$('#phone').val(),
            address:$('#address').val(),
            price:domObj.noPrice
        }
        server.addShop(data).then(function () {
            alert('下单成功')
        })

    }


    $('#pay').on('click',function () {

        $.actions({
            actions: [
                {
                    text: "发布",
                    className: "color-primary",
                }]
        });
        debugger
        add()
    })
};