(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnProfile', [
            '$location',
            'AuthService',
            bnProfile
        ])

    function bnProfile ($location, AuthService) {
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
            }
        }
    }

})();
