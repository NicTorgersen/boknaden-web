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
        this.getAdForInterest = getAdForInterest
        this.deleteAd = deleteAd
        this.create = create

        function get (id, type) {
            var params  = {},
                id      = parseInt(id),
                type    = type || 'list',
                headers = {}

            if (typeof(id) === 'number') {

                if (AuthService.isAuthenticated()) {
                    headers['boknaden-verify'] = AuthService.token()
                }

                params.adid = id
                params.type = type

                return $http({
                    url: apiUrl + '/ads',
                    method: 'GET',
                    params: params,
                    headers: headers
                }).then(function (res) {
                    return res
                })
            }

        }

        function getAll (params, type) {
            var params = params || {},
                type   = type || 'list'

            params.type = type

            return $http({
                url: apiUrl + '/ads',
                method: 'GET',
                params: params,
            }).then(function (res) {

                for (var i = 0; i<res.data.ads.length; i++) {
                    var obj = { active: false, adItem: {} }
                    res.data.ads[i].selectedAdItem = obj
                }
                return {
                    ads: res.data.ads,
                    hasNextPage: res.data.hasNextPage
                }
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

        function getAdForInterest (adid) {
            return $http({
                url: apiUrl + '/adforinterest',
                method: 'GET',
                params: {
                    adid: adid
                },
                headers: {
                    'boknaden-verify': AuthService.token()
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
                params: {
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
