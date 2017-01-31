(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnSidebar', [bnSidebar])

    function bnSidebar () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/sidebar/sidebar.html',
            controller: bnSidebarCtrl,
        }
    }

    function bnSidebarCtrl ($scope) {
        $scope.show = false

    }

})();
