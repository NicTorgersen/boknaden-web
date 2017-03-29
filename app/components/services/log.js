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

    function LogService(apiUrl, $http, store, AuthService) {
        this.getAll = getAll

        function getAll () {
            return $http({
                url: apiUrl + '/logs',
                method: 'GET',
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }
    }


})()
