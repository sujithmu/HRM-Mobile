var st = "";
jQuery(document).ready(function(){
                     
  var panel = '<div data-role="panel" id="mypanel"><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a><a data-mini="true" data-inline="true" data-role="button" href="#rightpanel3" class="ui-link ui-btn ui-btn-inline ui-shadow ui-corner-all ui-mini" role="button">Overlay</a></div>';
               

               jQuery('#example').on('click','.edit-user',function()                        
                {
                    
                    var empno = jQuery(this).attr('rel');

                    jQuery.ajax({
             type: "POST",             
             url:SITEURL+"index.php?r=Manageuser/View_app",
            
             data: {emp_number:empno}
         }).done(function(msg){
             
             splitval = msg.split('|');
            
            jQuery("#profile").html(splitval[0]);
            jQuery("#profile").prepend(panel);
            jQuery("#emergency").html(splitval[1]);
            jQuery("#emergency").prepend(panel);
            jQuery("#dependency").html(splitval[2]);
            jQuery("#dependency").prepend(panel);
            jQuery("#job").html(splitval[3]);
            jQuery("#job").prepend(panel);
            jQuery("#leavedays").html(splitval[4]);
            jQuery("#leavedays").prepend(panel);
            jQuery("#reportto").html(splitval[5]);
            jQuery("#reportto").prepend(panel);
            jQuery("#salary").html(splitval[6]);
            jQuery("#salary").prepend(panel);
            
            jQuery( "#mypanel" ).panel();
            jQuery.mobile.changePage('#profile',{transition:"slide"});
            
           
         });
                    
                
                
                
                });


        
                 jQuery('#addnew').click(function(){
                        


                       // location.href=SITEURL+"index.php?r=Manageuser/View_app";                 
                 });
                
                
               st =  jQuery('#example').dataTable( {                                        
                 
                ajax:        SITEURL+"index.php?r=Manageuser/Userdisplay_app",
                 
       "serverSide": true,
       "lengthChange": true,
        "searching": true
               
                });
                
                jQuery('.box-content').on('click','.empremove',function()                        
                {
        
              
                deleteuser(st, jQuery(this).attr("rel"));
                
                
                
                }
                        
            );

       jQuery('#userlist').on('click','.status_active',function(){

        jQuery.ajax({
        
            type: "POST",
            url: SITEURL+"index.php?r=Manageuser/StatusChange", 
            data: { status: "Y",userid:jQuery(this).attr('rel')}
        
        })
        .done(function( msg ) {
        
             st.fnDraw();
        
        });


    });

     jQuery('#userlist').on('click','.status_deactive',function(){

         jQuery.ajax({
        
            type: "POST",
            url: SITEURL+"index.php?r=Manageuser/StatusChange", 
            data: { status: "N",userid:jQuery(this).attr('rel')}
        
        })
        .done(function( msg ) {
        
             st.fnDraw();
        
        });

    });

         

                
 });
        function deleteuser(st,rel){
            
            jQuery.ajax({
                    
                    type: "POST",
                    url: SITEURL+"index.php?r=Manageuser/Userdelete_app",
                    data:{ empno:rel}, 
                    success:function(){
                        
                        st.fnDraw();
                    }
                });
        }


