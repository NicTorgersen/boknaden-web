(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('CampusService', [
            'apiUrl',
            '$http',
            CampusService
        ])

    function CampusService(apiUrl, $http, store) {
        this.getAll = getAll

        function getAll (params) {
            var params = params || {}

            return $http({
                url: apiUrl + '/campuses',
                method: 'GET',
                params: params
            })
        }
    }


})()
