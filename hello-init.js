hello.init({
    connect: 'pub_xxxx' //Enter your client id
}, {
    oauth_proxy: 'http://localhost:3500/oauthproxy', //this is your local server
    redirect_uri: 'redirect.html'
});