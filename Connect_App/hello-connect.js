(function (hello) {
    hello.init({
        connect: {
            name: 'connect',

            oauth: {
                version: 2,
                auth: 'https://connect-project.io/authorize',
                grant: 'https://connect-project.io/oauth/token',
                response_type: 'code'
            }
        }
    })
})(hello);
