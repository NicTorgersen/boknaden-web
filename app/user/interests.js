(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('UserInterestsCtrl', [
            '$scope',
            '$location',
            'growl',
            'InterestService',
            'AuthService',
            UserInterestsCtrl
        ])

    function UserInterestsCtrl ($scope, $location, growl, InterestService, AuthService) {
        $scope.interests = {}
        $scope.isAuthenticated = AuthService.isAuthenticated()
        $scope.showSpinner = true

        $scope.go = function (path) {
            $location.path(path)
        }

        InterestService.get().then(function (res) {
            $scope.showSpinner = false
            $scope.user = res.data
        }, function (err) {
            console.log(err)
            growl.error(err, {title: 'Error'})
        })
    }

})();
