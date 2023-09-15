  
document.addEventListener("deviceready", onDeviceReady, false);
   function onDeviceReady() {
       checkConnection();
       appexit();
    }
    function callBack(){

    }
     function showAlert() {

     	navigator.notification.alert(
                    'Invalid username or password!',  // message
                    callBack,         // callback
                    'Login Error',            // title
                    'Done'                  // buttonName
                    );
     }

                $(document).on("pagecreate",function(){
							//location.href= "dashboard.html";
 								//alert(id);
                                                                
                                 $('#loginusername').keyup(function(){
                                   $(this).val($(this).val().toLowerCase()); 
                                     
                                 });
                                  var id =  localStorage.getItem("userid");
                                  
                                  if(id > 0)
                                      window.location.href = "dashboard_index.html";
                                     //$.mobile.changePage("dashboard.html",{transition:"flip"});
                                      
		$('#loginform').validate({
			errorLabelcontainer:".error",
			rules: {
				loginusername:{
						required: true
				},
				loginpassword:{
						required: true
				}
			},
			messages: {
				loginusername:{
					required:"Please enter your email."
				},
				loginpassword:{
					required:"Enter password"
				}
			},
			submitHandler:function(form){
                            $.mobile.loading( "show", {
                                  text: "loading..",
                                  textVisible: true,
                                  theme: "b",
                                  html: ""
                                });
                            
				//localStorage.setItem("fname","sujith");
				//var name  = localStorage.getItem("fname");
				//alert(name);
				//$.ajax({
				//	type: "POST",
				//	url: "http://127.0.0.1/infopark/showdata.php",
				//	dataType:'jsonp',
				//	jsonp:'jsoncallback',
				//	timeout: 5000,

				//}).done(function(msg){
					//alert(msg);
				//});
				//alert(SITEURL);
				var names = $('#loginusername').val();
				var pswd = $('#loginpassword').val();
				$.ajax({
					type: "POST",
					url:SITEURL+"index.php?r=Loginregister/LoginApp",
					dataType: "json",																
					data: {loginusername:names,loginpassword:pswd}
				}).done(function(msg){
				$.mobile.loading('hide');		
                                if(msg.login_status=="success")
                                {
                                        localStorage.setItem("name",msg.name);
                                        localStorage.setItem("userid",msg.id);
                                        localStorage.setItem("roleid",msg.user_role_id);
                                        localStorage.setItem("empno",msg.emp_number);
                                        localStorage.setItem("username",msg.user_name);
                                       // $.mobile.changePage("dashboard.html",{transition:"flip"});
                                       window.location.href = "dashboard_index.html";
                                }
                                else
                                {
                                	showAlert();
        					
                                }
				});
			}
			
	});
	
      
	
	
});


         
         function checkConnection() {
            var networkState = navigator.connection.type;
            
            var states = {};
//            states[Connection.UNKNOWN]  = 'Unknown connection';
//            states[Connection.ETHERNET] = 'Ethernet connection';
//            states[Connection.WIFI]     = 'WiFi connection';
//            states[Connection.CELL_2G]  = 'Cell 2G connection';
//            states[Connection.CELL_3G]  = 'Cell 3G connection';
//            states[Connection.CELL_4G]  = 'Cell 4G connection';
//            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';
                if(networkState == Connection.NONE)
                    alert(states[networkState]);
        }

function appexit()
{
     document.addEventListener('backbutton', function(e){
                      if (confirm("Exit HRM?"))
                      {
                     
                     navigator.app.exitApp();
                      }
                   
              }, false);
}

