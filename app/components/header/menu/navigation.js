(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnNavigation', [bnNavigation])

    function bnNavigation () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/navigation/navigation.html',
            link: function (scope, element, attrs) {
                $scope.show = false
            }
        }
    }

})();
