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
        if (AuthService.isAuthenticated()) {
            $location.path('/store')
            return
        }

        console.log("hello")

        if ($routeParams.hasOwnProperty('verificationcode')) {
            var verificationcode = $routeParams.verificationcode

            UserService.verifyUserCode(verificationcode).then(function (res) {
                if (res.data.success) {

                    UserService.verifyUser(verificationcode).then(function (res) {
                        if (res.data.success) {
                            growl.success('Du er nå verifisert! Vennligst logg inn på nytt.')
                        }
                    }, function (err) {
                        console.log(err)
                    })

                }
            })
        }

        $location.path('/store')

    }

})();
