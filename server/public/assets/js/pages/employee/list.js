var initTable = function(){
    var initDt = () => {
        $('#employeeData').DataTable();
    }
    return {
        init: function(){
            initDt();
            
        }
    }
}()

$(document).ready(function(){
    initTable.init();
})
