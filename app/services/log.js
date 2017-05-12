(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('LogService', [
            'apiUrl',
            '$http',
            'store',
            'AuthService',
            LogService
        ])

    function LogService (apiUrl, $http, store, AuthService) {
        this.getAll = getAll

        function getAll (page, type) {
            var params = {
                page: page
            }

            if (type) {
                params['type'] = type
            }

            return $http({
                url: apiUrl + '/logs',
                method: 'GET',
                params: params,
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }
    }


})()
