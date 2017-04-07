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
        this.devareAd = devareAd
        this.create = create

        function get (id) {
            var id = parseInt(id),
                headers = {}

            if (typeof(id) === 'number') {

                if (AuthService.isAuthenticated()) {
                    headers['boknaden-verify'] = AuthService.token()
                }

                return $http({
                    url: apiUrl + '/ads',
                    method: 'GET',
                    params: { adid: parseInt(id) },
                    headers: headers
                }).then(function (res) {
                    return res
                })
            }

        }

        function getAll (params) {

            var params = params || {}

            return $http({
                url: apiUrl + '/ads',
                method: 'GET',
                params: params,
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

        function devareAd (adid) {
            return $http({
                url: apiUrl + '/ads',
                method: 'DEvarE',
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
                    text: flyer.text || null,
                    courseid: flyer.course.courseid,
                    aditems: flyer.aditems
                }
            })
        }
    }


})()
