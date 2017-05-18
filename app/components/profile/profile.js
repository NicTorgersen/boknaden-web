(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnProfile', [
            '$location',
            'growl',
            'AuthService',
            'UserService',
            bnProfile
        ])

    function bnProfile ($location, growl, AuthService, UserService) {
        return {
            restrict: 'A',
            templateUrl: 'app/components/profile/profile.html',
            link: function (scope, element, attrs) {
                scope.authed = AuthService.isAuthenticated()
                scope.profile = AuthService.profile()
                scope.show = false
                scope.openProfile = function () {
                    if (scope.authed) {
                        scope.show = !scope.show
                        return
                    }
                    var location = $location.url()

                    $location.path('/login').search({return: location})
                }
                scope.go = function (path) {
                    $location.path(path)
                }
                scope.logout = function () {
                    AuthService.logout()
                    scope.go('/login')
                }
                scope.resendVerification = function () {
                    if (!AuthService.isVerified()) {
                        growl.info('Vi har nå sent verifiseringsmailen på nytt.', {title: 'Sjekk e-posten din'})
                        UserService.resendVerification()
                    } else {
                        growl.info('Du er allerede verifisert. Trenger ikke flere e-poster om det, du da ;)')
                    }
                }
            }
        }
    }

})();
