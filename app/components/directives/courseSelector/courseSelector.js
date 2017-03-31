(function () {
    'use strict'

    var app = angular.module('boknaden')

    app.directive('courseSelector', [
        'CourseService',
        'CampusService',
        'UniversityService',
        'UserOptionsService',
        courseSelector
    ])

    function courseSelector (CourseService, CampusService, UniversityService, UserOptionsService) {
        return {
            restrict: 'A',
            templateUrl: 'app/components/directives/courseSelector/courseSelector.html',
            scope: {
                loading: '=',
                course: '='
            },
            controller: ['$scope', 'UserOptionsService', CourseSelectorCtrl]

        }

        function CourseSelectorCtrl ($scope, UserOptionsService) {
            var userOptions = UserOptionsService.get()

            $scope.course = {}
            $scope.campus = null
            $scope.university = null

            $scope.universities = []
            $scope.campuses = []
            $scope.courses = []

            UniversityService.getAll().then(function (unis) {
                $scope.universities = unis.data
                refresh()
            })

            $scope.universityChanged = function (uni) {
                $scope.campuses = []
                CampusService.getAll({universityid: uni.universityid}).then(function (campuses) {
                    $scope.campuses = campuses.data
                })
            }

            $scope.campusChanged = function (campus) {
                CourseService.getAll({campusid: campus.campusid}).then(function (courses) {
                    $scope.courses = courses.data
                })
            }

            $scope.courseChanged = function (course) {
                $scope.course = course
            }

            function canSaveState () {
                if ($scope.courses.length > 0 && $scope.course.hasOwnProperty('courseid')) {
                    return true
                }

                return false
            }

            function canRemoveState () {
                if (Object.keys(userOptions.selectedCourse).length > 0) {
                    return true
                }

                return false
            }

            function refresh () {
                if (Object.keys(userOptions.selectedCourse).length > 0) {
                    $scope.course = userOptions.selectedCourse.course
                    $scope.campus = userOptions.selectedCourse.campus
                    $scope.university = userOptions.selectedCourse.university
                    console.log($scope.course, $scope.campus, $scope.university)
                } else {
                    $scope.course = {}
                    $scope.campus = null
                    $scope.university = null

                    $scope.campuses = []
                    $scope.courses = []
                }
            }

            $scope.canSaveState = canSaveState
            $scope.canRemoveState = canRemoveState

            $scope.saveState = function () {
                if (canSaveState()) {
                    UserOptionsService.setSelectedCourse($scope.course, $scope.campus, $scope.university)
                    refresh()
                }
            }

            $scope.removeState = function () {
                if (canRemoveState()) {
                    UserOptionsService.removeSelectedCourse()
                    refresh()
                }
            }
        }
    }
})()
