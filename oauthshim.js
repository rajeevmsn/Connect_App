var oauthshim = require('oauth-shim'),
    express = require('express'),
    bodyParser = require('body-parser'); 
    //maker sure you installed oauth-shim,express and body-parser

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/oauthproxy', oauthshim);

// Initiate the shim with Client ID's and secret, e.g.
oauthshim.init([{
    // id : secret
    client_id: 'pub_xxxx', //Enter your client id
    client_secret: 'sec_xxxx', //Enter yout secret key
    // Define the grant_url where to exchange Authorisation codes for tokens
    grant_url: '',
    // Restrict the callback URL to a delimited list of callback paths
    domain: 'http://127.0.0.1:5500/'
}
]);
app.listen(3500);
console.log('listening to port 3500')
//Note for beginners, don't forget to run your local sever (cd file location and node servername)
