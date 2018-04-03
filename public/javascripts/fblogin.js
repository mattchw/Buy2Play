window.fbAsyncInit = function() {
    FB.init({
        appId      : '2033422926898580',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.12'
    });

    //FB.AppEvents.logPageView();
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

var indexURL = 'http://localhost:3000/';
var signupURL = 'http://localhost:3000/signup';
var loginURL = 'http://localhost:3000/login';
var profileURL = 'http://localhost:3000/profile';

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        callFbApi(true);
    } else { callFbApi(false); }
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};


function fblogout() {
    FB.logout(function(response) {
        localStorage.setItem("facebookLogin", "false");
    });
}

function callFbApi(isFbLoggedIn) {
    FB.api('/me?fields=id,name,email', function(response) {
        if (isFbLoggedIn) {
            if (response && !response.error) {
                //console.log(response);
                localStorage.setItem("facebookLogin", "true");
                if ($(location).attr('href') == signupURL) {
                    $('.fb-login-button').hide();
                    $('#signup-name').val(response.name);
                    $('#signup-email').val(response.email);
                }
                else if ($(location).attr('href') == loginURL) {
                    $('.fb-login-button').hide();
                    $('#login-name').val(response.name);
                }
                else if ($(location).attr('href') == profileURL) {
                    $('#profile-user-icon').attr('src', 'http://graph.facebook.com/' + response.id + '/picture?type=large');
                }
                
                $('#user-icon').hide();
                $('#facebook-user-icon').attr('src', 'http://graph.facebook.com/' + response.id + '/picture?type=square');
            }
        } else {
            $('#facebook-user-icon').hide();
        }
    });
}
