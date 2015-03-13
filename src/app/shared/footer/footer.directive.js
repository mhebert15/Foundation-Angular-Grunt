/**
 * Created by mhebert on 3/12/2015.
 */

/**
 * @module *.directive.footer
 * @file directive for the apps footer
 */
angular.module('foundationApp.directive.footer', [])
    .directive('foundationFooter', footerImpl)
    .controller('Footer', Footer);

/**
 * @method footerImpl
 * @description implementation details
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function footerImpl() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'shared/footer/footer.html',
        replace: true,
        controller: 'Footer',
        controllerAs: 'footer',
        bindToController: true
    };
}

/**
 * @class Footer
 * @constructor
 * @param {object} app
 * @param {object} environment
 */
function Footer() {
    'use strict';

}
