var signIn = function(){
    var form;
    var submitButton;
    
    var handleForm = () => {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            email = form.querySelector('#email').value;
            password = form.querySelector('#password').value;   
            $.post("/auth/login",{
                email: email,
                password: password
            })
            .done(function(){
                form.querySelector('#email').value = '';
                form.querySelector('#password').value = '';
                form.submit();
                location.href = '/'
            })         
            .fail(function(){
                form.querySelector('#password').value = "";
                alert("failed, please try again");
            })
        })
    }
    return {
        init: function(){
            form = document.querySelector('#loginForm');
            submitButton = document.querySelector('#submitCred')
            handleForm();
        }
    }
}()
document.addEventListener("DOMContentLoaded", function() {
    signIn.init();
});