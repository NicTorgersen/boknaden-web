(function () {
    'use strict';

    angular
        .module('boknaden')
        .directive('bnFrontFilter', [
            '$location',
            'UniversityService',
            'CampusService',
            'CourseService',
            bnFrontFilter
        ])

    function bnFrontFilter ($location, UniversityService, CampusService, CourseService) {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'app/components/filter/filter.html',
            link: function (scope, element, attrs) {
                scope.show = false
                scope.context = {
                    university: {
                        active: false,
                        data: [],
                    },
                    campus: {
                        active: false,
                        data: [],
                    },
                    course: {
                        active: false,
                        data: [],
                    },
                }

                scope.toggleFilter = function () {
                    scope.show = !scope.show
                    return
                }
                scope.toggleFilterDropdown = function (context) {
                    for (var prop in scope.context) {
                        if (prop !== context) {
                            scope.context[prop].active = false
                        } else {
                            scope.context[prop].active = !scope.context[prop].active
                        }
                    }
                    
                    return
                }
                scope.setSearch = function (param, id) {
                    var oldSearch = $location.search()
                    for (var key in oldSearch) {
                        $location.search(key, null)
                    }

                    $location.search(param, id)
                    return
                }

                UniversityService.getAll().then(function (res) {
                    scope.context.university.data = res.data;
                })
                CampusService.getAll().then(function (res) {
                    scope.context.campus.data = res.data;
                })
                CourseService.getAll().then(function (res) {
                    scope.context.course.data = res.data;
                })
            }
        }
    }

})();
