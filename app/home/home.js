(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.controller('HomeCtrl', ['$scope', '$location', 'store', HomeCtrl])

    function HomeCtrl ($scope, $location, store) {

        if (isAuthenticated()) {
            $location.path('/bookstore')
        }

        function isAuthenticated () {
            return store.get('token')
        }
    }

})();
