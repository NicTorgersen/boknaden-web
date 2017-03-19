(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('AdService', [
            'apiUrl',
            '$http',
            'store',
            AdService
        ])

    function AdService(apiUrl, $http, store) {
        // this.get = get
        this.getAll = getAll

        function get (id) {
            var id = parseInt(id)
            if (typeof(id) === 'number') {
                return $http({
                    url: apiUrl + '/ads',
                    method: 'GET',
                    params: {adid: parseInt(id)}
                })
            }

        }

        function getAll () {
            return $http({
                url: apiUrl + '/ads',
                method: 'GET',
            })
        }
    }


})()
