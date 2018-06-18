import ajax from '../ajax'
const Servers={
    getShop:function () {
       return ajax({
            url:"/manager/productpage/queryForPage",
            data:{
                page: {
                    pageNo: 1,
                    pageSize: 10
                }
            }
        })
    },
    addShop:function (data) {
       return ajax({
           url:"/manager/orderpage/orderap",
           data:data,
       })
    },
    getCode:function () {
      return ajax({
          url:"/manager/orderpage/redirect",
          method:'get',
        })
    },
    setCode:function (code) {
      return ajax({
          url:"/manager/orderpage/orders",
          method:"get",
          data:{
              code:code
          }
      })
    },
    getToken:function () {
        return ajax({
            url:"https://api.weixin.qq.com/cgi-bin/token",
            method:'get',
            noHost:true,
            data:{
                grant_type:"client_credential",
                appid:"wxa55d67c39e421f09",
                secret:"f38350b1a24388e1bc694d48c60ee84a"
            }
        })
    }


}
export default  Servers;