/**
 * @module *.controller.landing
 * @file controller for the landing page
 */

angular.module('foundationApp.controller.landing', [])
    .config(function($stateProvider) {
        $stateProvider.state('landing',{
            name: 'foundationApp.landing',
            url: '/',
            views: {
                'current@': {
                    controller: 'Landing as landing',
                    templateUrl: 'views/landing/landing.html'
                }
            },
            data: {pageTitle: 'Foundation App'}
        });

    })
    .controller('Landing', Landing);

/**
 * @class Landing
 * @constructor
 */
function Landing() {
    var vm = this;
    vm.message = "mat";
    'use strict';
}
