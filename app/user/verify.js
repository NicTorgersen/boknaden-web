(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('VerifyUserCtrl', [
            '$scope',
            '$routeParams',
            '$location',
            'growl',
            'UserService',
            'AuthService',
            VerifyUserCtrl
        ])

    function VerifyUserCtrl ($scope, $routeParams, $location, growl, UserService, AuthService) {
        $scope.hide = true
        $scope.showSpinner = true

        if (AuthService.isVerified()) {
            $location.path('/store')
            return
        }

        if (AuthService.isAuthenticated()) {
            AuthService.logout()
        }

        if ($routeParams.hasOwnProperty('verificationcode')) {
            var verificationcode = $routeParams.verificationcode

            UserService.verifyUserCode(verificationcode).then(function (res) {
                if (res.data.success) {
                    $scope.hide = false

                    UserService.verifyUser(verificationcode).then(function (res) {
                        $scope.showSpinner = false
                        if (res.data.success) {
                            growl.success('Du er nå verifisert! Vennligst logg inn på nytt.')
                            // $location.path('/store')
                        }
                    }, function (err) {
                        $scope.showSpinner = false
                        growl.error('Det skjedde en feil. Send oss en melding med feilmelding V01')
                        // $location.path('/store')
                    })

                } else {
                    $location.path('/store')
                }
            })
        } else {
            // $location.path('/store')
        }


    }

})();
