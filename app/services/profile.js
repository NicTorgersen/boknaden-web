(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('ProfileService', [
            'apiUrl',
            '$http',
            'AuthService',
            ProfileService
        ])

    function ProfileService(apiUrl, $http, AuthService) {
        this.get = getProfileData
        this.update = updateProfileData

        function getProfileData () {
            var headers = {}

            if (AuthService.isAuthenticated) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/profile',
                method: 'GET',
                headers: headers
            })
        }

        function updateProfileData (profile) {
            var profile = profile,
                headers = {}

            if (AuthService.isAuthenticated) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/profile',
                method: 'PUT',
                headers: headers,
                data: profile
            })
        }
    }


})()
