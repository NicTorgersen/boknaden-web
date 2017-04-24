(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('InterestService', [
            'apiUrl',
            '$http',
            'AuthService',
            InterestService
        ])

    function InterestService(apiUrl, $http, AuthService) {
        this.get = getInterests
        this.newInterest = newInterest

        function getInterests () {
            var headers = {}

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/interest',
                method: 'GET',
                headers: headers
            })
        }

        function newInterest (data) {
            var data = data || [],
                headers = {}

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/interest',
                method: 'POST',
                headers: headers,
                data: data
            })
        }
    }


})()
