(function () {
    'use strict';

    angular
        .module('boknaden')
        .controller('NewItemCtrl', [
            '$scope',
            'store',
            '$location',
            '$timeout',
            'growl',
            'AdService',
            'CourseService',
            'CampusService',
            'UniversityService',
            'AuthService',
            'ImageService',
            NewItemCtrl
        ])

    function NewItemCtrl ($scope, store, $location, $timeout, growl, AdService, CourseService, CampusService, UniversityService, AuthService, ImageService) {
        if (!AuthService.isAuthenticated() || AuthService.profile().verified === 0)
            $location.path('/store')

        $scope.flyer = { adname: '', text: '', course: {}, aditems: [{image: { imageid: 0, imageurl: '' }, isbn: '', price: 0, text: '', description: '', isBook: true}] }
        $scope.showISBNHelpText = false
        $scope.courses = []
        $scope.activeFlyerItem = 0
        $scope.showSpinner = true

        CourseService.getAll().then(function (courses) {
            for (var i = 0; i < courses.data.length; i++) {
                var course = courses.data[i]
                $scope.courses.push({courseid: course.courseid, coursename: course.coursename})
                $scope.showSpinner = false
            }
        })

        $scope.test = function (item) { console.log(item) }

        $scope.verifiedLength = function (val, len) {
            if (val.toString().length >= len) {
                return false
            }

            return true
        }

        $scope.isValid = function () {
            if ($scope.flyer.adname.length > 4 &&
                ($scope.flyer.course && $scope.flyer.course.hasOwnProperty('courseid')) &&
                $scope.flyer.aditems.length > 0) {


                for (var i = 0; i < $scope.flyer.aditems.length; i++) {
                    var item = $scope.flyer.aditems[i]
                    if (item.isBook && item.isbn.length < 10) {
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

        function canCreateAdItem (aditems, base) {
            for (var i = 0; i < aditems.length; i++) {
                if ( JSON.stringify(aditems[i]) === JSON.stringify(base) ) {
                    return false
                } else {
                    if (aditems[i].isBook && aditems[i].isbn.length < 10) {
                        return false
                    }
                    if (aditems[i].text.length < 4) {
                        return false
                    }
                }
            }

            return true
        }

        $scope.canCreateAdItem = canCreateAdItem

        $scope.addAdItemToFlyer = function () {
            if ($scope.flyer.aditems.length > 0) {
                if ( !canCreateAdItem($scope.flyer.aditems, {image: { imageid: 0, imageurl: '' }, isbn: '', price: 0, text: '', description: '', isBook: true}) ) {
                    return
                }
            }

            $scope.flyer.aditems.push({image: { imageid: 0, imageurl: '' }, isbn: '', price: 0, text: '', description: '', isBook: true})
            $timeout(function () {
                $scope.activeFlyerItem = ($scope.flyer.aditems.length - 1)
            }, 10);
        }

        $scope.removeUploadedImage = function (aditem) {
            $scope.showSpinner = true
            if (aditem.image.imageid > 0) {
                ImageService.delete(aditem.image.imageid).then(function (response) {
                    aditem.image = { imageid: 0, imageurl: '' }
                    $scope.showSpinner = false
                    console.log(response)
                })
            } else {
                console.log('Imageid not updated.')
            }
        }

    }

})();
