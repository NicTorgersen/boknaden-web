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

    function FooterCtrl ($scope, $location, store) {
        $scope.objects = [
            {
                title: 'Om',
                article: '',
                isActive: false,
            },
            {
                title: 'Vilkår',
                article: '',
                isActive: false,
            }
        ]

        function toggle (idx) {
            $scope.objects[parseInt(idx)].isActive = !$scope.objects[parseInt(idx)].isActive
        }

        function logout () {
            store.remove('token')
            $location.path('/')
        }

        function isAuthenticated () {
            var token = store.get('token')
            return token
        }

        $scope.isAuthenticated = isAuthenticated
        $scope.logout = logout
        $scope.toggle = toggle
    }

})();
