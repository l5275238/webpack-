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
    var domObj={};
   var  selectActive;

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
        $('#productName').html(domObj.productName)
        $('#cetent').html(domObj.productDesc)
        $('#price').html(domObj.noPrice+'元')
        active(domObj.productRelationDTOList)
    })

    function active(list) {
        let html=""
        if(list.length>0){

            for(var i =0;i<list.length;i++){
                let value =list[i];
                if(i==0){
                    selectActive=domObj.productRelationDTOList[i];
                    setDetail(value)
                }
              let div= ` <div  data-type=${i} class=${i==0?'select':''}>${value.num*value.price}元</div>`

                $('#activeList').append(div)
            }
        }

    }
function setDetail(bin) {
    $('#youhuiDetail').html(`数量${bin.num},单价${bin.price},赠送:${bin.remark}`)
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


    $('#activeList').on('click','div',function () {

    $('#activeList>div').removeClass('select');
    $(this).addClass('select')
    selectActive=domObj.productRelationDTOList[$(this).attr('data-type')];

        setDetail(selectActive)
        $.confirm("前往支付？", function() {
            location.href=`/index.html?selectActive=${selectActive}`
        }, function() {
            //点击取消后的回调函数
        });

    }
)
    $('#pay').on('click',function () {
       show()


    })
    $('#hide').on('click',function () {
        hide()
    })
};
function show() {
    $('.isShow').show();
    $('#activShow').addClass('showSecion')
    $('.disNom > .bagornnd').show()
}
function hide() {
    $('#activShow').removeClass('showSecion')
    $('.disNom > .bagornnd').hide()
    setTimeout(function () {
        $('.isShow').hide();
    },1000)


}