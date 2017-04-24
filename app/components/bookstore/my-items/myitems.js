(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnMyItems', [bnMyItems])

    function bnMyItems () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/bookstore/my-items/myitems.html',
            scope: {
                'items': '='
            },
            link: function (scope) {

            }
        }
    }

})();
