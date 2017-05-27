(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('ImageService', [
            'apiUrl',
            '$http',
            'AuthService',
            ImageService
        ])

    function ImageService(apiUrl, $http, AuthService) {
        this.new = newImage
        this.delete = deleteImage

        function newImage (file) {
            if (!file) {
                return
            }

            var headers = {'Content-Type': undefined},
                formData = new FormData()

            formData.append('file', file, file.name)

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/image',
                method: 'POST',
                data: formData,
                headers: headers
            })
        }

        function deleteImage (imageid) {
            if (!imageid || isNaN(parseInt(imageid))) {
                return
            }

            var headers = {}

            if (AuthService.isAuthenticated()) {
                headers['boknaden-verify'] = AuthService.token()
            }

            return $http({
                url: apiUrl + '/image',
                method: 'DELETE',
                params: {
                    imageid: imageid
                },
                headers: headers
            })
        }
    }


})()
