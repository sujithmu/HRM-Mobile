jQuery(document).ready(function(){
   
    
     jQuery("#country").change(function () {
                
              
                var coid = jQuery('#country option:selected').val();
                
                
                
                jQuery.ajax({
                        type: "POST",
                        url: baseurl+"/index.php?r=Manageuser/Dynamicstates",
                        data: { countryid: coid}
                    })
                        .done(function(msg) {
                            
                           jQuery('#state').html(msg);
                
                       });
                      
              });                 
            
            
            
            
            jQuery('#contact').validate({
                
                rules:{
                    name:"required",
                    address:"required",
                    state:"required",
                    pincode:"required",
                    relation:"required",
                    hnumber:"required",
                    mnumber:"required",
                    },
                messages:{
                    name:"Please enter a valid contact person name",
                    address:"Add your address",
                    state:"Add state",
                    pincode:"Valid pincode required",
                    relation:"Add relationship",
                    hnumber:"Home number required",
                    mnumber:"Add mobile number 10 digits",
                    },
                    
                    submitHandler: function(form) 
                        {   
                            
                            var action = jQuery("#contact").attr('action');                            
                            $('#sbutton').prop("disabled", true);
                            $('#sbutton').val("Saving...");
                            jQuery.ajax({
                        type: "POST",
                        url: SITEURL+'index.php?r=Manageuser/Econtact_app',
                        data:{"params":jQuery(form).serialize(),empnumber:employeeno}
                    })
                        .done(function(msg) {
                            
                            
                              $('#contact_message').html('Contacts updated');
                              $('#contactalert').fadeIn();
                                 setTimeout(
                                 function(){
                                     
                                     
                                      jQuery('#sbutton').prop("disabled", false);
                                     jQuery('#sbutton').val("Save");
                                     jQuery('#contactalert').fadeOut();
                                 },3000
                                                
                                     );
                
                       });




                           
                       
                        
                        }
                    
            });
            
       
            
    
    
});