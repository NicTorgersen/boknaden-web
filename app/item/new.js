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
            'CourseService',
            'AuthService',
            NewItemCtrl
        ])

    function NewItemCtrl ($scope, store, $location, growl, AdService, CourseService, AuthService) {
        if (!AuthService.isAuthenticated())
            $location.path('/store')

        $scope.flyer = { adname: '', text: '', course: {}, aditems: [{image: '', isbn: '', price: 0, text: '', description: '', isBook: false}] }
        $scope.courses = []
        $scope.activeFlyerItem = 0

        CourseService.getAll().then(function (courses) {
            for (var i = 0; i < courses.data.length; i++) {
                var course = courses.data[i]
                $scope.courses.push({courseid: course.courseid, coursename: course.coursename})
            }
        })

        $scope.isValid = function () {
            if ($scope.flyer.adname.length > 4 &&
                $scope.flyer.course.hasOwnProperty('courseid') &&
                $scope.flyer.aditems.length > 0) {


                for (var i = 0; i < $scope.flyer.aditems.length; i++) {
                    var item = $scope.flyer.aditems[i]
                    if (item.isBook && item.isbn.length > 10) {
                        return false
                    }
                    if (item.text.length < 4) {
                        return false
                    }
                }

                return true

            } else {
                return false
            }
        }

        $scope.createAd = function () {
            AdService.create($scope.flyer).then(function (res) {
                $location.path('/item/' + res.data.ad.adid)
            })
        }

        $scope.removeItem = function (idx) {
            if ($scope.flyer.aditems.length > 1)
                $scope.flyer.aditems.splice(idx, 1)

        }

        $scope.addAdItemToFlyer = function () {
            if ($scope.flyer.aditems.length > 0) {
                if ( JSON.stringify($scope.flyer.aditems[$scope.flyer.aditems.length - 1]) === JSON.stringify({image: '', isbn: '', price: 0, text: '', description: '', isBook: false}) ) {
                    return
                }
            }

            $scope.flyer.aditems.push({image: '', isbn: '', price: 0, text: '', description: '', isBook: false})
        }


    }

})();
