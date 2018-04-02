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

var signupURL = 'http://localhost:3000/signup/';

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        callFbApi();
        console.log('FB Logged In and authenticated');
    } else {
        console.log('FB Not yet authenticated');
    }
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

function callFbApi() {
    FB.api('/me?fields=id,name,email', function(response) {
        if (response && !response.error) {
            console.log(response);
            localStorage.setItem("facebookLogin", "true");
            if ($(location).attr('href') != signupURL) {
                $('.fb-login-button').hide();
                $('#signup-name').val(response.name);
                $('#signup-email').val(response.email);
            }
        }
    });
}
