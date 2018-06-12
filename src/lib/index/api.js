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
           url:"/manager/productpage/queryForPage",
           data:data,
       })
    }


}
export default  Servers;