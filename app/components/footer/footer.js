(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnFooter', [bnFooter])

    function bnFooter () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/footer/footer.html',
            controller: FooterCtrl,
        }
    }

    function FooterCtrl ($scope, $location, $uibModal, store) {
        function logout () {
            store.remove('token')
            $location.path('/')
        }

        function isAuthenticated () {
            var token = store.get('token')
            return token
        }

        $scope.showAbout = function () {
            $uibModal.open({
                animation: false,
                templateUrl: 'app/components/footer/aboutModal/aboutModal.html'
            })
        }

        $scope.showTerms = function () {
            $uibModal.open({
                animation: false,
                templateUrl: 'app/components/footer/termsModal/termsModal.html'
            })
        }

        $scope.isAuthenticated = isAuthenticated
        $scope.logout = logout
    }

})();
