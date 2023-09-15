jQuery(document).ready(function(){
        
            depTable =  jQuery('#dependent_table').DataTable( {                                        
                 
                ajax:        {"url":SITEURL+"index.php?r=Manageuser/Dependentlist_app",
                               "data":  function ( d ) {
                              
                                 d.emp_number = employeeno;
                                 d.roleid = roleid;

                                // etc
                                 } 
                               },
              
                "serverSide": true,
                  "lengthChange": false,
                  "bInfo": false,
        responsive: true,
        "searching":false,
          "sPaginationType": "four_button"
                });



    var d = new Date();
    var n = d.getFullYear(); 
     jQuery('#dateofbirth').datepicker({ changeMonth: true,changeYear: true,yearRange: '1920:'+n});
     jQuery('#dateofbirth').click(function(){
        jQuery('.ui-datepicker-year').css( 'width','80px');

     });
     

    jQuery("#relationship").change(function () {
        
        var va = jQuery("#relationship option:selected").val();
        if(va ==='other'){
            
            jQuery('#otherdep').fadeIn();
        }
        else{
            jQuery('#otherdep').fadeOut();
        }
    
    });
    
    

    jQuery('#dependent_div').on('click','.depremove',function(){


       jQuery.ajax({
         type:"POST",
         url:SITEURL+"index.php?r=Manageuser/DeleteDependent_app",
         data:{dp_id:jQuery(this).attr('rel')}
       }).done(function(msg)
       {
           
           depTable.draw();
                             
       });  

     });

    jQuery('#dependentform').validate({
        
        rules:{
                    dname:"required",
                    
                    dateofbirth:"required",
                    
                    },
                messages:{
                    dname:"please enter dependent name",
                    
                    dateofbirth:"date of birth required"
                    
                    },
                    
                    submitHandler: function(form) 
                        {   $('#depbutton').prop("disabled", true);                            
                            $('#depbutton').val("Adding...");

                       jQuery.ajax({
                        type: "POST",
                        url: SITEURL+'index.php?r=Manageuser/Dependent_app',

                        data:{"params":jQuery(form).serialize(),empnumber:employeeno}
                    })
                        .done(function(msg) {
                            $('#dependentalert').fadeIn();
                            $('#dependency_message').html("Dependency Added");
                              
                                setTimeout(
                                 function(){
                               jQuery('#depbutton').prop("disabled", false);
                               jQuery('#depbutton').val("Save");
                               //jQuery('#depreset').trigger('click');
                               jQuery('#relationship').val('');
                               jQuery('#dname').val('');
                               jQuery('#dateofbirth').val('');   
                               jQuery('#dependentalert').fadeOut();
                                 depTable.draw();                                   
                                 },3000                                               
                                     );                
                       });                                                                              
                        }        
    });     
    
    $('#dateofbirth').click(function()
    {
       $(this).blur(); 
    });
});
