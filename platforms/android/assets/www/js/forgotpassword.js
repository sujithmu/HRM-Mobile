document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
        // Empty
    }
    function forgotcallBack(){

    }
     function forgotshowAlert() {

     	navigator.notification.alert(
                    'Mail send successfully!',  // message
                    forgotcallBack,         // callback
                    'Recover password',            // title
                    'Done'                  // buttonName
                    );
     }
     
     function invalidusernameAlert() {

     	navigator.notification.alert(
                    'Mail not send!',  // message
                    forgotcallBack,         // callback
                    'Invalid username',            // title
                    'Done'                  // buttonName
                    );
     }

$(document).on("pagecreate",function(){
    
    $('#forgotpswdform').validate(
    {
       rules: {
           forgotloginusername:{
               required: true
           }
       },
       
       messages: {
           forgotloginusername:{
               required:"Please enter your email."
           }
       },
       submitHandler:function(form){
           var loginemail = $('#forgotloginusername').val();
           
           $.ajax({
               type: "POST",
               url:SITEURL+"index.php?r=Manageuser/Mailsend",
             
               data:{loginemail:loginemail}
           }).done(function(msg){
               if(msg==="Invalid")
                   invalidusernameAlert();
               else
                   forgotshowAlert();
           });
       }
       
    });
});