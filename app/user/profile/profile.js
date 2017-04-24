(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('ProfileCtrl', [
            '$scope',
            '$routeParams',
            'store',
            '$location',
            'growl',
            'ProfileService',
            'AuthService',
            ProfileCtrl
        ])

    function ProfileCtrl ($scope, $routeParams, store, $location, growl, ProfileService, AuthService) {
        if (!AuthService.isAuthenticated()) {
            $location.path('/')
        }

        $scope.user = {}
        $scope.profile = AuthService.profile()
        $scope.showSpinner = true
        $scope.updateProfile = updateProfile

        ProfileService.get().then(function (res) {
            $scope.showSpinner = false
            $scope.user = res.data
        }, function (err) {
            console.log(err)
            growl.error(err, {title: 'Error'})
        })

        function updateProfile () {
            var data = {
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                phone: $scope.user.phone,
                email: $scope.user.email,
                courseid: $scope.user.course.courseid,
            }

            $scope.showSpinner = true

            ProfileService.update(data).then(function (res) {
                $scope.showSpinner = false
                if (res.data.success) {
                    growl.info('Oppdatert brukerdata!', {title: 'Oppdatert'})
                } else {
                    growl.error('Det skjedde en feil under oppdateringen.', {title: 'Feil'})
                    console.log(res.data)
                }
            })
        }
    }

})();
