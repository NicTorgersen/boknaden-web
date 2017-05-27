(function () {
    'use strict'

    var app = angular.module('boknaden')

    app.directive('bnImageUpload', [
        'ImageService',
        bnImageUpload
    ])

    function bnImageUpload (ImageService) {
        return {
            restrict: 'A',
            scope: {
                file: '=',
                spinner: '=',
            },
            link: function (scope, el, attrs, ctrl) {
                el.bind('change', function (event) {
                    var image = event.target.files[0]
                    scope.spinner = true;
                    ImageService.new(image).then(function (response) {
                        scope.file = {
                            imageurl: response.data.imageurl,
                            imageid: response.data.imageid
                        }
                        scope.$apply()
                        scope.spinner = false
                    })
                })
            }

        }
    }
})()
