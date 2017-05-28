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

        function getInterests (type) {
            var headers = {},
                params = {}

            type = type || null

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            if (type) {
                params['type'] = type
            }

            return $http({
                url: apiUrl + '/interest',
                method: 'GET',
                params: params,
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
