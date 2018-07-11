$(function(){
    $("form").bootstrapValidator({
        fields: {
            username:{
                validators: {
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    callback: {
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    callback:{
                        message :"密码错误"
                    }
                }
            }
        }
    }) 
})
$("form").on("success.form.bv",function(e) {
    e.preventDefault();
    $.ajax ({
        type:"post",
        url:"/employee/employeeLogin",
        data:$("form").serialize(),
        success:function(x){
            if(x.success) {
                location.href = "index.html"
            }
            if(x.error===1000) {
                $("form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
            }
            if (x.error===1001) {
                $("form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
            }
        }
    })

    //重置功能
    $("[type='reset']").on("click", function () {

        //重置样式
        $("form").data("bootstrapValidator").resetForm();
    
      });

})