(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('CourseService', [
            'apiUrl',
            '$http',
            CourseService
        ])

    function CourseService(apiUrl, $http, store) {
        this.getAll = getAll

        function getAll () {
            return $http({
                url: apiUrl + '/courses',
                method: 'GET',
            })
        }
    }


})()
