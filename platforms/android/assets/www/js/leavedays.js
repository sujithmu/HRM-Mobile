jQuery(document).ready(function(){
  
    
    jQuery('#leavedayform').validate({
        rules:{
            leavelistbox:"required",
        },
        messages:{
            leavelistbox:"Select day"
        },
        submitHandler: function(form) 
                        {
                            
                            jQuery('#leavebtn').prop("disabled", true);
                            jQuery('#leavebtn').val("Saving...");   

                            jQuery(form).ajaxSubmit({
                                data:{empnumber:jQuery('#empnumber').val()},
                                
                                success: function(){
                                    jQuery('#leaveday_message').html('Week holiday(s) updated successfully');
                                    jQuery('#leaveformalert').fadeIn();
                                 setTimeout(
                                 function(){
                                     jQuery('#leavebtn').prop("disabled", '');
                                     jQuery('#leavebtn').val("Save");  
                                     jQuery('#leaveformalert').fadeOut();
                                 },3000
                                                
                                     );
                                
                                }
                            });
                        }
    });
    
     jQuery('#leavebtn').click(function(){
                jQuery('#leavedayform').submit();
              });
    
});