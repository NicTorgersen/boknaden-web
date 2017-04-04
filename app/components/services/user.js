(function() {

    'use strict'

    angular
        .module('boknaden')
        .factory('UserService', [
            'apiUrl',
            '$http',
            'AuthService',
            UserService
        ])

    function UserService (apiUrl, $http, AuthService) {

        return {
            get: get,
            getAll: getAll,
            forgotPassword: forgotPassword,
            resetPassword: resetPassword,
            verifyCode: verifyCode,
            verifyUserCode: verifyUserCode,
            verifyUser: verifyUser,
            create: create,
        }

        function get (id) {
            let headers = {}

            if (typeof(id) === 'string') {
                if (AuthService.isAuthenticated()) {
                    headers['boknaden-verify'] = AuthService.token()
                }

                return $http({
                    url: apiUrl + '/users',
                    method: 'GET',
                    params: { username: id },
                    headers: headers
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
                data: { username: username }
            })
        }

        function resetPassword (passphrase) {
            return $http({
                url: apiUrl + '/changepassword',
                method: 'POST',
                data: { passphrase: passphrase }
            })
        }

        function verifyCode (code) {
            return $http({
                url: apiUrl + '/forgotpassword',
                method: 'GET',
                params: { code: code }
            })
        }

        function verifyUserCode (code) {
            return $http({
                url: apiUrl + '/verifyuser',
                method: 'GET',
                params: { verificationcode: code }
            })
        }

        function verifyUser (code) {
            return $http({
                url: apiUrl + '/verifyuser',
                method: 'POST',
                data: { verificationcode: code }
            })
        }

        function create (user) {
            return $http({
                url: apiUrl + '/users',
                method: 'POST',
                data: {
                    username: user.username,
                    passphrase: user.pass,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    phone: user.phone,
                    courseid: user.course.courseid,
                }
            })
        }

    }


})()
