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
        if (!AuthService.isAuthenticated())
            $location.path('/store')

        $scope.flyer = {}

        var defaultFlyer     = { adname: '', courseid: 0, aditems: [] },
            defaultFlyerItem = { image: '', isbn: '', price: 0, text: '', description: '', isBook: false }

        $scope.flyer = defaultFlyer
        $scope.flyer.aditems.push(defaultFlyerItem)

        $scope.addAdItemToFlyer = function () {
            // if ($scope.flyer.aditems.length > 0) {
            //     if ( JSON.stringify($scope.flyer.aditems[$scope.flyer.aditems.length - 1]) === JSON.stringify(defaultFlyerItem) ) {
            //         console.log("Objects too similar")
            //         return
            //     }
            // }
            $scope.flyer.aditems.push(defaultFlyerItem)
        }


    }

})();
