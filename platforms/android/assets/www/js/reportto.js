var re_sup = '';
var re_sub = '';
jQuery(document).ready(function(){
   
        re_sup =  jQuery('#super_table').DataTable( {                                        
                 
                ajax:        {"url":SITEURL+"index.php?r=Manageuser/supervisor_app",
                               "data":  function ( d ) {
                               
                                 d.emp_number = employeeno;

                                // etc
                                 } },
              
               "serverSide": true,
                  "lengthChange": false,
                  "bInfo": false,
        responsive: true,
        "searching":false,
          "sPaginationType": "four_button"
               
                });


        re_sub =  jQuery('#sub_table').dataTable( {                                        
                 
                 ajax:        {"url":SITEURL+"index.php?r=Manageuser/subordinate_app",
                               "data":  function ( d ) {
                               
                                 d.emp_number = employeeno;

                                // etc
                                 } },
               
                "serverSide": true,
                  "lengthChange": false,
                  "bInfo": false,
        responsive: true,
        "searching":false,
          "sPaginationType": "four_button"
                });





        
    
    
    
  

   
    
    
});