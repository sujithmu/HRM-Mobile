jQuery(document).ready(function(){
    jQuery('#joindate').datepicker();
    jQuery('#jobform').validate({
        
        rules:{
                    joindate:"required",
                    jobtitle:"required",
                    jobcategory:"required",
                    
                    
                    },
                messages:{
                    joindate:"please enter date of joining",
                    jobtitle:"select a title",
                    jobcategory:"select category",
                    },
                    
                    submitHandler: function(form) 
                        {
                            
                            jQuery('#jobbutton').prop("disabled", true);
                            jQuery('#jobbutton').val("Saving...");
                                              
                            jQuery(form).ajaxSubmit({
                                
                            data:{empnumber:employeeno},
                                    
                            success: function(){
                                $('#jobalert').fadeIn();
                                
                                $('#job_message').html('Job information updated successfully');
                                 
                                 setTimeout(
                                 function(){
                                     jQuery('#jobbutton').prop("disabled", false);
                                     jQuery('#jobbutton').val("Save");  
                                     jQuery('#jobalert').fadeOut();
                                 },3000
                                                
                                     );
                                     }  });
                       
                        
                        }
        
    });
    $('#jobbutton').click(function(){
                jQuery('#jobform').submit();
              });
    
    $('#joindate').click(function(){
       $(this).blur(); 
    });
    
});