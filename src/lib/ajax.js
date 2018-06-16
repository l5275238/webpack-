const HostAjax="/api"

const ajax=function (params) {
    return new Promise((res,ref)=>{
        params.data=params.method=="get"?params.data:JSON.stringify(params.data);

        $.ajax({
            url:(params.noHost?"":HostAjax)+params.url,
            contentType:"application/json;charset=UTF-8",
            dataType:"JSON",
            type:params.method||'POST',
            data:params.data,
            success:function (data) {
                if(data.status==0){
                    res(data.data)
                }

            }
        })
    })
}
export default ajax;