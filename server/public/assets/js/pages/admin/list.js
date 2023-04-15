var initTable = function(){
    var initDt = () => {
        $('#adminData').DataTable();
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
