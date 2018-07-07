import ajax from './ajax'
class server{

    constructor(){
     this.ajaxLength=0;
     this.onAjax=false;

    }
    _beforAjax(params){
        this.ajaxLength++;
        if(this.onAjax){
            return
        }
        this.onAjax=true;
        if(typeof params.beforAjax =='function'){
            params.beforAjax()
        }
        else {
            this.beforAjax()
        }
    }
    beforAjax(){

    }
    _afterAjax(param){
        this.ajaxLength--;
        if(this.ajaxLength==0){
            this.onAjax=false;
            if(typeof params.afterAjax =='function'){
                params.afterAjax()
            }
            else {
                this.afterAjax()
            }
        }


    }
    afterAjax(){


    }
    erroFn(){
        $.alert("出错啦")
    }

    ajax(params){

        ajax(params).then(data=>{
            if(typeof params.success =='function'){
               if(data.status==200){
                   params.success(data)
               }
            }

        }).catch(data=>{
            if(typeof params.success =='function'){
                params.error(data)
            }


        })
    }

}