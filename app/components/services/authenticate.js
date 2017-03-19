(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('AuthService', [
            'apiUrl',
            '$http',
            'store',
            'growl',
            AuthService
        ])

    function AuthService(apiUrl, $http, store, growl) {
        this.verify = verify
        this.isAuthenticated = isAuthenticated

        function verify (username, passphrase) {
            if (username && passphrase) {
                return $http({
                    url: apiUrl + '/authenticate',
                    method: 'POST',
                    data: {username: username, passphrase: passphrase}
                }).then(function (response) {
                    if (response.data.success === true && !store.get('token')) {
                        growl.success('Successful authentication!', {title: 'Authenticated'})
                        store.set('token', response.data.token)
                    }

                    return response.data
                })
            }
        }

        function isAuthenticated () {
            var token = store.get('token')

            if (typeof token === 'string') {
                return true
            }

            return false
        }

    }


})()
