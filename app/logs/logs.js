(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('LogsCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'LogService',
            'AuthService',
            LogsCtrl
        ])

    function LogsCtrl ($scope, store, $location, growl, LogService, AuthService) {
        if (AuthService.profile().isadmin !== 1) {
            $location.path('/store')
        }

        reload()

        $scope.logs = []

        function reload () {
            $scope.showSpinner = true

            LogService.getAll().then(function (res) {
                $scope.showSpinner = false
                $scope.logs = res.data
            }, function (err) {
                growl.error(err, {title: 'Error'})
            })
        }

        $scope.go = function (path) {
            $location.path(path)
        }

    }

})();
