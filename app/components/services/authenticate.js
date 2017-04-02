(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('AuthService', [
            'apiUrl',
            '$http',
            '$location',
            'store',
            'growl',
            'jwtHelper',
            AuthService
        ])

    function AuthService(apiUrl, $http, $location, store, growl, jwtHelper) {
        this.verify = verify
        this.isAuthenticated = isAuthenticated
        this.profile = profile
        this.token = token
        this.logout = logout

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
                if (jwtHelper.isTokenExpired(token)) {
                    store.remove('token')
                    growl.info('Vennligst logg inn på nytt.', { title: 'Du er blitt logget ut' })
                    return false
                }
                return true
            }

            return false
        }

        function profile () {
            var token   = store.get('token')

            if (token) {
                var profile = jwtHelper.decodeToken(token)
                return profile
            }
        }

        function token () {
            var token = store.get('token')

            if (typeof token === 'string') {
                return token
            }
        }

        function logout () {
            var token   = store.get('token'),
                profile = store.get('profile')

            if (typeof token === 'string') {
                store.remove('token')
            }

            if (typeof profile === 'object') {
                store.remove('profile')
            }

            return true
        }

    }


})()
