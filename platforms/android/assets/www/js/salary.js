jQuery(document).ready(function(){
    
    jQuery('#salaryform').validate({
        
        rules:{
                    pgrade:"required",                                       
                    amount:"required",
                    
                    },
                messages:{
                    pgrade:"please provide a pay grade",
                    amount:"provide salary",                    
                    
                    },
                    
                    submitHandler: function(form) 
                        {
                                              
                            jQuery(form).ajaxSubmit({
                                    
                            success: function(){
                                 jQuery('#salaryalert').fadeIn();
                                 setTimeout(
                                 function(){
                                     
                                     jQuery('#salaryalert').fadeOut();
                                 },3000
                                                
                                     );
                                     }  });
                       
                        
                        }
        
    });
    jQuery('#salarybutton').click(function(){
                jQuery('#salaryform').submit();
              });
    
    
    
});