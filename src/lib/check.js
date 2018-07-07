let rules=(function () {
    var  isEmpty =function (str){

        if($.type(str)!='string') return true;
        return str.length <= 0;
    }
    //正则判定
    var _validateByReg = function (str,sRegexp){
        str = str?str.trim():'';
        if(isEmpty(str)) return true;
        if(str && (new RegExp (sRegexp) ) && (new RegExp (sRegexp)).test(str)) return true ;
        return false;
    };
    return {
        /**
         * 是否不为空
         * @param {String} str
         * @return {Boolean}
         */
        isNotEmpty :function (str){
            if(!str || $.type(str)!='string') return false;
            return str.length > 0;
        },
        /**
         * 是否为空
         * @param {String} str
         * @return {Boolean}
         */
        isEmpty:isEmpty,
        /**
         * 是否为手机号码
         * @param {String} str
         * @return {Boolean}
         */
        isTel:function (str) {
            return _validateByReg(str,/^[1][3,4,5,7,8,6,9][0-9]{9}$/)
        },
        /**
         * 邮箱校验
         * @param {String} str
         * @return {Boolean}
         */
        isEmai:function (str) {
            return _validateByReg(str,/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
        },
        minLengh:function(str,lenght){
           return str.length>lenght;
        },

        ajax:function (api,key,str,dataFn) {
            var item=false
                $.ajax({
                    type: 'post',
                    url:api,
                    data:{
                        [key]:str
                    },
                    async:false,
                    success:function (data) {
                        console.log(typeof dataFn);
                        if (typeof dataFn =="function"){
                        item= dataFn(data)
                    }

                    },
                })
            return item;

        }

    }
})()
let messges={
    isNotEmpty:'请输入',
    isTel:"请输入正确的手机号码",
    isEmai:"请输入正确的邮箱",
    ajax:"已存在",
    minLengh:"最小长度"

}

var ajax=function (data) {
    return data
}


class check{
    constructor(){
            this.Messge={}
            this.ajaxFn={}
    }
    init(ele,rules,name,keyMessge){

        $(ele).attr('data-rule',rules.join(","))
        $(ele).attr('data-valide','true')
        $(ele).attr('keyMessge',keyMessge)
        $(ele).attr('data-name',name)

        this.bindFocus(ele)
        this.bindBlur(ele)
            this.setDom&& this.setDom($(ele))
    }
    setMessge(keyMessge,msg){
        this.Messge[keyMessge]=msg
    }
    setIntDow(fn){
      this.setDom=fn
    }
    setAjax(keyMessge,fn){
        this.ajaxFn[keyMessge]=fn
    }
    check(ele){
        var obj=this.checkRule(ele)
        if(obj.isErro){
           this.error&&this.error(ele,obj.mesg)
            return {erro:obj.mesg}

        }

        this.success&&this.success(ele,obj.mesg)
    }
    checkRule(ele){
        let eleRules=$(ele).attr("data-rule").split(',')
        let KeyMessge=$(ele).attr('keyMessge')
        let name =$(ele).attr('data-name')
        var eleValue=ele.value

        for(let value of eleRules){
            var resolet;
            let arr=value.replace('#','')
            let key= arr.split('?')
            if(value[0]=="#"){
                resolet=true


                let dataFn=KeyMessge&&this.ajaxFn[KeyMessge]?this.ajaxFn[KeyMessge]:ajax
                fn= rules.ajax(key[0],key[1],eleValue,dataFn)

            }

            else {
                fn=rules[key[0]](eleValue,key[1],this.error)
            }

            if(!fn){
             value=resolet?"ajax":value;
                let meg=KeyMessge&&this.Messge[KeyMessge]?this.Messge[KeyMessge]:messges[value]

                return {

                        isErro:true,
                        mesg:meg+name

                }
            }


        }
        return {
            isErro:false,
        }
    }
    bindBlur(ele){
        var that =this;
        $(ele).on("blur",  function () {

                that.check(this)
        })
    }
    bindFocus(ele){
        var that =this;
        $(ele).on("focus",function () {

            that.clean&&that.clean(this)

        })
    }
    checkFrom(fromId){
      var from= document.getElementById(fromId).elements

let msg=[]
        for(var i=0;i<from.length;i++){
                let value=from[i]
            if($(value).attr('data-valide')){

                var obj=this.check(value)

                if(obj){
                    msg.push(obj.erro)
                }



            }
        }

        if(msg.length>0){
          return msg[0]
        }
        return false
    }

}
export default check;