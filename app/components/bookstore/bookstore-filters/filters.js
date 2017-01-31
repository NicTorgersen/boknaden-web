(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnSidebar', [bnSidebar])

    function bnSidebar () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/bookstore/bookstore-filters/filters.html',
            link: function (scope) {

            }
        }
    }

})();
