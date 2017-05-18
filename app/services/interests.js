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

        function newInterest (data, message) {
            var data    = data || [],
                message = message || 'Jeg ønsker disse objektene.',
                headers = {}

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/interest',
                method: 'POST',
                data: { aditems: data, message: message },
                headers: headers,
            })
        }
    }


})()
