(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('NewItemCtrl', [
            '$scope',
            'store',
            '$location',
            'growl',
            'AdService',
            'AuthService',
            NewItemCtrl
        ])

    function NewItemCtrl ($scope, store, $location, growl, AdService, AuthService) {
        $scope.flyer = {}

        var defaultFlyer = { adname: '', courseid: 0, aditems: [] },
            defaultAdItem = { image: '', isbn: '', price: 0, text: '', description: '' }

        $scope.flyer = defaultFlyer
        $scope.isAuthenticated = AuthService.isAuthenticated()

        $scope.addAdItemToFlyer = function () {
            if ($scope.flyer.aditems.length > 0) {
                if ( JSON.stringify(scope.flyer.aditems[$scope.flyer.aditems.length - 1]) === JSON.stringify(defaultAdItem) ) {
                    return
                }
            }
            $scope.flyer.aditems.push(defaultAdItem)
        }

        if (!$scope.isAuthenticated)
            $location.path('/store')

    }

})();
