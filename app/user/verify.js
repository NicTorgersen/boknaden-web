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

        if ($routeParams.hasOwnProperty('verificationcode')) {
            var verificationcode = $routeParams.verificationcode

            UserService.verifyUserCode(verificationcode).then(function (res) {
                if (res.data.success) {

                    UserService.verifyUser(verificationcode).then(function (res) {
                        if (res.data.success) {
                            growl.success('Du er nå verifisert! Vennligst logg inn på nytt.')
                            $location.path('/store')
                        }
                    }, function (err) {
                        console.log(err)
                        growl.error('Det skjedde en feil. Send oss en melding med feilmelding V01')
                        $location.path('/store')
                    })

                } else {
                    $location.path('/store')
                }
            })
        } else {
            $location.path('/store')
        }


    }

})();
