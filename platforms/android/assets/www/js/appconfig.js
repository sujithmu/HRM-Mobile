//var SITEURL="http://www.voicevosa.com/hrm/";
//var SITEURL="http://208.85.2.78/hrm/";
//var SITEURL="http://10.0.2.2/hrmnetstratum/";
var SITEURL="http://localhost/hrmnetstratum/";
//var SITEURL="http://hrm.com/";
//var SITEURL="http://192.168.1.11/hrmnetstratum/";
//var SITEURL="http://netstratum.com/lab/hrm/";
//var SITEURL="http://66.6.131.39/hrm/";
       
        var name =  localStorage.getItem("name");
        var userid = localStorage.getItem("userid");
        var roleid = localStorage.getItem("roleid");
        var employeeno = localStorage.getItem("empno");
        var pushNotification;
        var android_reg_id="";
        
        $(document).ready(function(){
            var hei = window.innerHeight;
             $('.content-height').attr('style','min-height:'+hei+'px !important');
        
//        var imgurl = SITEURL+'profilepictures/thumbimg-'+userid+".jpg";
//        var defimg = SITEURL+'profilepictures/default.jpg';
        
//        if(imgurl)
           // jQuery('#userprofimg').attr('src',SITEURL+'profilepictures/thumbimg-'+userid+".jpg");
//        else
//            jQuery('#userprofimg').attr('src',SITEURL+'profilepictures/default.jpg');
        
        
        jQuery('#dispname').html(name);
        
        
        jQuery('#logout_app').click(function()
                       {                        
                        localStorage.removeItem("empno");
                        localStorage.removeItem("name");
                        localStorage.removeItem("length");
                        localStorage.removeItem("roleid");
                        localStorage.removeItem("userid");
                        localStorage.removeItem("username");
                        window.location.href = "index.html";
                       });
                       
                     
        
        });
      
        
        function getMenu(selection)
        {

            jQuery.ajax({
                    method: "POST",
                    url: SITEURL+"index.php?r=Manageuser/shoappmenu",
                    data: {employeeno: employeeno,roleid:roleid,selected:selection,userid:userid}
            })
            .done(function( msg ) {
                var splitvar = msg.split("|");
                
                jQuery('#main-menu').append(splitvar[0]);
                $('.nav-item-submenu').each(function(){
                           //alert($(this).attr('style'));
                           
                        if($(this).parent().children('.submenu-deploy').text()=== "Manage Leave")
                        {
                              $(this).parent().children('.submenu-deploy').trigger("click");
                              $(this).parent().children('.submenu-deploy').trigger("click");
                         
                        }
                        
                       });
                         $('.nav-item-submenu').each(function(){
                           //alert($(this).attr('style'));
                           
                    
                             $(this).parent().children('.submenu-deploy').trigger("click");
                             $(this).parent().children('.submenu-deploy').trigger("click");
                        
                        
                        
                       });
                      
                       if(splitvar[1]=="yes")
                           $('#userprofimg').attr('src',SITEURL+'profilepictures/thumbimg-'+userid+".jpg");
                       else
                           $('#userprofimg').attr('src',SITEURL+'profilepictures/default.jpg');
                       
            });

        } 
        
        
        function onDeviceReady() {
            checkConnection();
            appexit();
            //forbackgroundapp();
            try 
                {
                          pushNotification = window.plugins.pushNotification;
                  jQuery("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                          if (device.platform == 'android' || device.platform == 'Android' ||
                                    device.platform == 'amazon-fireos' ) {
                pushNotification.register(successHandler, errorHandler, {"senderID":"267638441445","ecb":"onNotification"});    // required!
                  } else {
                              pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});  // required!
                          }
                }
            catch(err) 
                { 
                  txt="There was an error on this page.\n\n"; 
                  txt+="Error description: " + err.message + "\n\n"; 
                  alert(txt); 
                } 
            }
            
            
//          function forbackgroundapp()
//            {
//               cordova.plugins.backgroundMode.enable();
//               cordova.plugins.backgroundMode.onactivate = function (){
//                 setTimeout(function () {
//                      cordova.plugins.backgroundMode.configure({
//               
//            });
//                 },3000);  
//               };
//           }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     jQuery("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     // showing an alert also requires the org.apache.cordova.dialogs plugin
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    // playing a sound also requires the org.apache.cordova.media plugin
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotification(e) {
                
                switch( e.event )
                {
                    case 'registered':


          if ( e.regid!='' )
          {

               android_reg_id =  e.regid;
               
               
              jQuery.ajax({
                type:"POST",
                url:SITEURL+"index.php?r=Manageuser/App_Reg_Android",
                data:{regid: android_reg_id,employeeno:employeeno}
            }).done(function(msg) {

            });             
            
          }
                    break;                    
                    case 'message':
                      // if this flag is set, this notification happened while we were in the foreground.
                      // you might want to play a sound to get the user's attention, throw up a dialog, etc.
//                      if (e.foreground)
//                      {                      
                   //jQuery("#app-status-ul").html('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                    // on Android soundname is outside the payload. 
                          // On Amazon FireOS all custom attributes are contained within payload
                          var soundfile = e.soundname || e.payload.sound;
                          // if the notification contains a soundname, play it.
                          // playing a sound also requires the org.apache.cordova.media plugin
                          var my_media = new Media("/www/"+ soundfile);

                          my_media.play();
                      // }
//            else
//            {
                
                  
                   if (e.coldstart)
                        $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
//                   else
//                        $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>'); 
                        //location.href = e.payload.redid;
            // otherwise we were launched because the user touched a notification in the notification tray.
             
           // }
              
              jQuery("#app-status-ul").html('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');        
            //window.localStorage.setItem("push_que", e.payload.redid);
            //location.href = e.payload.redid;
           
            break;
                    
                    case 'error':
            jQuery("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
            jQuery("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                jQuery("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
      
            function successHandler (result) {
                jQuery("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                jQuery("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            
           
            
        document.addEventListener('deviceready', onDeviceReady, true);
        
         //document.addEventListener("deviceready", hrmDeviceReady, false);
         
       
         
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
                 
                 if(window.location.href=="file:///android_asset/www/dashboard_index.html")
                 {
                    navigator.app.exitApp();
                }
                 else
                    parent.history.back();
                              
                      }, false);
        }