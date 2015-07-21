/**
 * Created by mhebert on 3/3/2015.
 */
/**
 * @ngdoc overview
 * @name fa-app
 * @description
 * # fa-app
 *
 * Main module of the application.
 */

angular.module('foundationApp', [
    //vendor
    'ngAnimate',
    'ui.router',
    'mm.foundation',
    //app
    'foundationApp.templates',
    'foundationApp.directive.header',
    'foundationApp.directive.nav',
    'foundationApp.directive.footer',
    'foundationApp.controller.landing',
    'foundationApp.controller.about'

])

/**
 * run block
 */
    .run(runImpl)

/**
 * config block
 */
    .config(configImpl);

/**
 * @method runImpl
 * @description run implementation details
 * @param {object} $rootScope
 * @param {object} $state
 * @param {object} $stateParams
 */
function runImpl($rootScope, $state, $stateParams) {
    /**
     * @see ui-router - https://github.com/angular-ui/ui-router/blob/master/sample/app/app.js
     *
     * It's very handy to add references to $state and $stateParams to the $rootScope
     * so that you can access them from any scope within your applications.For example,
     * <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
     * to active whenever 'contacts.list' or one of its descendants is active.
     */
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}

/**
 * @method configImpl
 * @description config implementation details
 * @param {object} environment
 * @param {object} $stateProvider
 * @param {object} $urlRouterProvider
 * @param {object} $compileProvider
 */
function configImpl($stateProvider, $urlRouterProvider, $locationProvider) {
    /**
     * @see https://docs.angularjs.org/api/ng/provider/$compileProvider
     * Call this method to enable/disable various debug runtime information in the compiler
     * If you wish to debug an application with this information then you should open up a
     * debug console in the browser then call this method directly in this console:
     * angular.reloadWithDebugInfo();
     */
    //if (environment.ENV_TYPE === 'working') {
    //    $compileProvider.debugInfoEnabled(false);
    //}

    /**
     * define abstract state
     */
    $stateProvider
        .state({
            name: 'foundationApp',
            abstract: true,
            views: {
                'current': {
                    // loaded from current state
                }
            }
        });

    /**
     * redirect to landing page
     */
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');

}

/**
 * @method appPrimeImpl
 * @description implementation details
 *  primes the application and turns off splash screen
 * @param {object} splashService
 * @param {function} $timeout
 * @param {object} $log
 */
