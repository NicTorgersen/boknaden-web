(function() {

    'use strict'

    angular
        .module('boknaden')
        .factory('UserService', [
            'apiUrl',
            '$http',
            UserService
        ])

    function UserService(apiUrl, $http) {

        return {
            get: get,
            getAll: getAll,
        }

        function get (id) {
            var id = parseInt(id)
            if (typeof(id) === 'number') {
                return $http({
                    url: apiUrl + '/users',
                    method: 'GET',
                    params: {userid: parseInt(id)}
                })
            }

        }

        function getAll () {
            return $http({
                url: apiUrl + '/users',
                method: 'GET',
            })
        }

    }


})()
