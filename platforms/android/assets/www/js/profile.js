
jQuery(document).ready(function(){
   
 
   

    jQuery.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please check your input."
               
        
);
    if(employeeno>0){
        
        jQuery('#profileform').validate({
            
                rules:{
                        fname:{
                                required:true,
                                regex:"^[a-zA-Z'.\\s]{1,40}$",
                            },
                        lname:{required:true,
                               regex:"^[a-zA-Z'.\\s]{1,40}$",
                            },
                                                
                        
                 
                    },
                
                messages:{
                        fname:"Please enter your firstname",
                        lname:"Please enter your lastname",
                        
                },
                      submitHandler: function(form)
                        {
                            jQuery('#sbtn').prop("disabled", true);
                            jQuery('#sbtn').val("Saving...");               
                            jQuery('#profileform').attr('action',SITEURL+'index.php?r=Manageuser/UserReg_app');
                            jQuery(form).ajaxSubmit({
                                    
                            success: function(empno){
                               

                                jQuery('#empnumber').val(empno);
                               
                               // var empno =   jQuery('#empnumber').val();
                                 jQuery('#disp_message').html('Profile information updated');
                                 jQuery('#profilealert').fadeIn();
                                 setTimeout(
                                 function(){
                                       jQuery('#sbtn').prop("disabled", '');
                                     jQuery('#sbtn').val("Save"); 
                                     jQuery('#profilealert').fadeOut();
                                 },3000
                                 
                
                 );
                                    
                            }  });
                       
                        
                        }
            
            });
    }
    else{
        
        jQuery('#profileform').validate({
            
                rules:{
                        fname:{
                                required:true,
                                regex:"^[a-zA-Z'.\\s]{1,40}$",
                            },
                        lname:{required:true,
                               regex:"^[a-zA-Z'.\\s]{1,40}$",
                            },
                        gender:{required:true},
                                                
                        uname:  {
                                required:true,
                                minlength:2,
                                remote:SITEURL+"index.php?r=Manageuser/Uservalidation_app",                                                                                     
                                },
                        pswd:{
                                required:true,
                                minlength:5,
                                },
                        cpswd:{
                                required:true,
                                minlength:5,
                                equalTo: "#pswd"
                                }, 
                 
                    },
                
                messages:{
                        fname:"Please enter your firstname",
                        lname:"Please enter your lastname",
                        gender:"Please select your gender",
                        uname:{
                                required: "Please enter a username",
                                minlength: "Your username must consist of at least 2 characters",
                                remote:"Username already taken"
                            },
                        pswd:{
                                 required: "Please provide a password",
                                 minlength: "Your password must be at least 5 characters long"   
                             },
                        cpswd:{
                                 required: "Please provide a password",
                                 minlength: "Your password must be at least 5 characters long",
                                 equalTo: "Please enter the same password as above"   
                        },
                },
                   
                errorPlacement: function (error, element) {
            if(element.attr("name") =='gender'){
            error.insertAfter(jQuery("#emp_gender"));
            error.css('padding-left','190px');
            }else{
           error.insertAfter(element);
            }
          
       
    
},
                      submitHandler: function(form) 
                        {
                             jQuery('#sbtn').prop("disabled", true);
                            jQuery('#sbtn').val("Saving..."); 
                            jQuery('#profileform').attr('action',SITEURL+'index.php?r=Manageuser/UserReg_app');                      
                            jQuery(form).ajaxSubmit({
                                    
                            success: function(empno){
                                
                                 
                                jQuery('#empnumber').val(empno);
                                 dep.fnDraw();
                               // var empno =   jQuery('#empnumber').val();
                                
                                 jQuery('#disp_message').html('User has been registered successfully');
                                 jQuery('#profilealert').fadeIn();
                                 setTimeout(
                                 function(){
                                      jQuery('#sbtn').prop("disabled", '');
                                     jQuery('#sbtn').val("Save"); 
                                     jQuery('#profilealert').fadeOut();
                                    
                                 },4000);
                                    
                                                                    

                            }  });
                       
                        
                        }
            
            });
        }
            
            jQuery('#sbtn').click(function(){
            
               jQuery('#profileform').submit();        
                  

            });
    
    $('#emp_dob').click(function()
    {
       $(this).blur(); 
    });
    

});





