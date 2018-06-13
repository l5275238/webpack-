const HostAjax="http://nonghe.vaovao.cn:8080/despatch"

const ajax=function (params) {
    return new Promise((res,ref)=>{
        $.ajax({
            url:HostAjax+params.url,
            contentType:"application/json;charset=UTF-8",
            dataType:"JSON",
            type:params.method||'POST',
            data:JSON.stringify(params.data),
            success:function (data) {
                res(data.data)
            }
        })
    })
}
export default ajax;