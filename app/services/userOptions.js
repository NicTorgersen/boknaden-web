(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('UserOptionsService', [
            'store',
            UserOptionsService
        ])

    function UserOptionsService(store) {
        var userOptions = store.get('userOptions')

        this.get = function () {
            if (!userOptions) {
                store.set('userOptions', {
                    selectedCourse: {},
                    minimized: false,
                })
            }

            return userOptions
        }

        this.setSelectedCourse = function (course, campus, university) {
            store.set('userOptions', {
                selectedCourse: {
                    course: course,
                    campus: campus,
                    university: university,
                },
                minimized: userOptions.minimized
            })
        }

        this.removeSelectedCourse = function () {
            store.set('userOptions', {
                selectedCourse: {},
                minimized: userOptions.minimized
            })
        }
    }


})()
