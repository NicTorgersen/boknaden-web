(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('CourseService', [
            'apiUrl',
            '$http',
            CourseService
        ])

    function CourseService(apiUrl, $http) {
        this.getAll = getAll

        function getAll (params) {
            var params = params || {}

            return $http({
                url: apiUrl + '/courses',
                method: 'GET',
                params: params
            })
        }
    }


})()
