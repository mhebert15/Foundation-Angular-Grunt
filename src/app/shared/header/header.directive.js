/**
 * Created by mhebert on 3/12/2015.
 */

/**
 * @module *.directive.header
 * @file directive for the header template
 */
angular.module('foundationApp.directive.header', ['mm.foundation.topbar'])
    .directive('foundationHeader', headerImpl)
    .controller('Header', Header);

/**
 * @method headerImpl
 * @description implementation details
 * @returns {{
 *  restrict: string, scope: {}, templateUrl: string,
 *  replace: boolean, controller: string, controllerAs: string,
 *  bindToController: boolean
 * }}
 */
function headerImpl() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'shared/header/header.html',
        replace: false,
        controller: 'Header',
        controllerAs: 'header',
        bindToController: true
    };
}

/**
 * @class Header
 * @constructor
 */
function Header() {
    'use strict';


}
