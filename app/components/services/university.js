(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('UniversityService', [
            'apiUrl',
            '$http',
            UniversityService
        ])

    function UniversityService(apiUrl, $http, store) {
        this.getAll = getAll

        function getAll (params) {
            var params = params || {}

            return $http({
                url: apiUrl + '/universities',
                method: 'GET',
                params: params
            })
        }
    }


})()
