(function() {

    'use strict'

    angular
        .module('boknaden')
        .factory('UserService', [
            'apiUrl',
            '$http',
            UserService
        ])

    function UserService(apiUrl, $http) {

        return {
            get: get,
            getAll: getAll,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            verifyCode: verifyCode,
        }

        function get (id) {
            var id = parseInt(id)
            if (typeof(id) === 'number') {
                return $http({
                    url: apiUrl + '/users',
                    method: 'GET',
                    params: {userid: parseInt(id)}
                })
            }

        }

        function getAll () {
            return $http({
                url: apiUrl + '/users',
                method: 'GET',
            })
        }

        function forgotPassword (username) {
            return $http({
                url: apiUrl + '/forgotpassword',
                method: 'POST',
                data: {username: username}
            })
        }

        function resetPassword (passphrase) {
            return $http({
                url: apiUrl + '/changepassword',
                method: 'POST',
                data: {passphrase: passphrase}
            })
        }

        function verifyCode (code) {
            return $http({
                url: apiUrl + '/forgotpassword',
                method: 'GET',
                params: {code: code}
            })
        }

    }


})()
