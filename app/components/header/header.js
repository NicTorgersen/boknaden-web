(function () {
    'use strict';

    var app = angular.module('boknaden')

    app.directive('bnHeader', [bnHeader])

    function bnHeader () {
        return {
            restrict: 'A',
            templateUrl: 'app/components/header/header.html',
            scope: {
                'bnLogo': '=?',
            },
            link: function (scope) {
                scope.bnLogo = scope.bnLogo || "assets/images/logo-2.svg"
            }
        }
    }

})();
