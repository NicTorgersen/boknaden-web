(function() {

    'use strict'

    angular
        .module('boknaden')
        .service('AdService', [
            'apiUrl',
            '$http',
            'store',
            'AuthService',
            AdService
        ])

    function AdService(apiUrl, $http, store, AuthService) {
        this.get = get
        this.getAll = getAll
        this.getAdsForUser = getAdsForUser
        this.deleteAd = deleteAd
        this.create = create

        function get (id) {
            var id = parseInt(id)
            if (typeof(id) === 'number') {
                return $http({
                    url: apiUrl + '/ads',
                    method: 'GET',
                    params: { adid: parseInt(id) }
                }).then(function (res) {
                    if (res.data.user.username === AuthService.profile().username)
                    return res
                })
            }

        }

        function getAll () {
            return $http({
                url: apiUrl + '/ads',
                method: 'GET',
            }).then(function (res) {
                for (var i = 0; i<res.data.ads.length; i++) {
                    var obj = { active: false, adItem: {} }
                    res.data.ads[i].selectedAdItem = obj
                }
                return res.data.ads
            })
        }

        function getAdsForUser () {
            return $http({
                url: apiUrl + '/ads',
                method: 'GET',
                params: {
                    userid: AuthService.profile().userid
                }
            })
        }

        function updateAd (ad) {
            return $http({
                url: apiUrl + '/ads',
                method: 'PUT',
                params: {}
            })
        }

        function deleteAd (adid) {
            return $http({
                url: apiUrl + '/ads',
                method: 'DELETE',
                data: {
                    adid: adid
                },
                headers: {
                    'boknaden-verify': AuthService.token()
                }
            })
        }

        function create (flyer) {
            return $http({
                url: apiUrl + '/ads',
                method: 'POST',
                data: {
                    token: AuthService.token(),
                    adname: flyer.adname,
                    courseid: flyer.course.courseid,
                    aditems: JSON.stringify(flyer.aditems)
                }
            })
        }
    }


})()
