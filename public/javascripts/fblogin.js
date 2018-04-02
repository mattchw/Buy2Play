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
        if ($(location).attr('href') != indexURL)
            window.location.href = "/";
        
    } else {
        console.log('FB Not yet authenticated');
    }
};

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};


function logout() {
    FB.logout(function(response) {
        //setElements(false);
        localStorage.setItem("facebookLogin", "false");
        localStorage.removeItem("facebookUserID");
        localStorage.removeItem("facebookUserName");
        localStorage.removeItem("facebookUserEmail");
    });
}

function callFbApi() {
    FB.api('/me?fields=id,name,email', function(response) {
        if (response && !response.error) {
            console.log(response);
            localStorage.setItem("facebookLogin", "true");
            localStorage.setItem("facebookUserID", response.id);
            localStorage.setItem("facebookUserName", response.name);
            localStorage.setItem("facebookUserEmail", response.email);
        }
    });
}
