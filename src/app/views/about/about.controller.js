/**
 * Created by mhebert on 3/13/2015.
 */
/**
 * @module *.controller.about
 * @file controller for the about page
 */

angular.module('foundationApp.controller.about', [])
    .config(function ($stateProvider) {
        $stateProvider.state('about', {
            name: 'foundationApp.about',
            url: '/about',
            views: {
                'current@': {
                    controller: 'About as about',
                    templateUrl: 'views/about/about.html'
                }
            },
            data: {pageTitle: 'About'}
        });

    })
    .controller('About', About);

/**
 * @class About
 * @constructor
 */
function About() {
    var vm = this;
    vm.message = "mat";
    'use strict';
}
