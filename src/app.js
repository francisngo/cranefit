angular // add module dependencies and configure it
  .module('sparrowFit', ['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
  .config(function($locationProvider, jwtOptionsProvider, $provide, authProvider, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {
    // get domain and clientid from server for auth0
    $.get('/config')
      .then(function({domain, clientID}) {
        authProvider.init({ // for auth0 lock (login)
          domain: domain,
          clientID: clientID,
          loginUrl: '/#/home'
        });
      })
      .catch(console.error);

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'login/home/home-tpl.html',
        controller: 'homeController as home'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'login/profile/profile-tpl.html',
        controller: 'profileController as user'
      })
      .state('design', {
        url: '/design',
        templateUrl: 'login/design-sandbox/design-sandbox.html',
        controller: 'designController as user'
      })
      // INTEGRATION FROM CLIENT  // first param === name
      .state({
        name: 'createWorkout',
        url: '/createWorkout',
        component: 'createWorkout',
      })
      .state({
        name:'createWorkout.timed',
        url: '/timed',
        component: 'timed',
      })
      .state({
        name: 'createWorkout.untimed',
        url: '/untimed',
        component: 'untimed'
      })
      .state({
        name: 'workout',
        url: '/workout',
        component: 'workout'
      })
      .state({
        name: 'goals',
        url:'/goals',
        component: 'goals',
        resolve : {
          resolveGoal : function (goalService) {
            var goals = goalService.getAllGoals();
            //console.log(goals);
            return goals;
          }
        }
      })
      .state({
        name: 'goal',
        url: '/{goalID}',
        parent:'goalList',
        component : 'goal',
        resolve : {
          resolveGoalItem : function (goalService,$transition$) {
            var goalDetailAfterUSerClick= goalService.getGoal($transition$.params().goalID);
            // console.log('in resolve goal, goalDetailAfterUSerClick = '+JSON.stringify(goalDetailAfterUSerClick));
            return goalDetailAfterUSerClick;
          }
        }
      })
      .state({
        name :'addGoal',
        url:'/addGoal',
        parent :'goals',
        component : 'addGoal'
      })
      .state({
        name :'panel',
        url:'/panel',
        parent :'goals',
        component : 'panel',
        resolve : {
          resolvePanel : function (goalService) {
            return '!!!!! implement me !!!!!';
          }
        }
      })
      .state({
        name :'goalList',
        url:'/goallist',
        parent :'goals',
        component :'goalList',
        resolve : {
          resolveGoalList : function (goalService) {
            // move the content of golas/resolve func in here
            var goals=goalService.getAllGoals();
            //console.log( goals);
            return goals;
          }
        }
      })
      .state({
        name:'logWorkout',
        url:'/log',
        parent:'workout',
        component:'logWorkout'
      })
      .state({
        name:'editWorkout',
        url:'/edit',
        parent:'workout',
        component:'editWorkout'
      })
      .state({
        name :'history',
        url:'/history',
        parent :'goals',
        component : 'history',
        resolve : {
          resolveHistory : function (goalService) {
            return '!!!!! implement me !!!!!';
          }
        }
      });



    jwtOptionsProvider.config({
      tokenGetter: function() {
        return localStorage.getItem('id_token');
      },
      whiteListedDomains: ['localhost', '127.0.0.1'] // whitelist domains
    });


    $urlRouterProvider.otherwise('/home');
    // remove ! from hash /#!/
    $locationProvider.hashPrefix('');
    // have jwt come with all requests to endpoints
    jwtInterceptorProvider.tokenGetter = function(store) {
      // this will go to local storage and return that token and give it to jwtInterceptorProvider to attach as an auth header on our requests

      // we need to push this into an array of http interceptors that comes from angular
      return store.get('id_token');
    }

    // register interceptor which will redirect user to login if token expires
    function redirect($q, $injector, $timeout, store, $location) {
      var auth;
      $timeout(function() {
        auth = $injector.get('auth');
      })
      return {
        responseError: function(rejection) {
          console.log('Failed with', rejection.status, 'status');
          if (rejection.status === 401) {
            auth.signout();
            store.remove('profile');
            store.remove('id_token');
            $location.path('/home'); // send back to homepage
          }
          return $q.reject(rejection); // return a rejection from $q
        }
      }
    };

    // commented this out because of a cicular dependency.
    // let angular know about this interceptor and push onto the array of $http interceptor
    $provide.factory('redirect', redirect);
    $httpProvider.interceptors.push('redirect');

    // here we push jwt to the angulars http interceptor
    $httpProvider.interceptors.push('jwtInterceptor');
  })

  // check if session is still valid, if not direct back to sign in
  .run(function($rootScope, $state, auth, store, jwtHelper, $location) {
    // watch for changes in location
    // fires anytime routing changes or page refreshes
    // will use to check users authentication state
    $rootScope.$on('$locationChangeStart', function() {
      // console.log('run ran!');
      // console.log('token expired?', jwtHelper.isTokenExpired(token))
      var token = store.get('id_token');
      if (token) { // if there is a token
        if (!jwtHelper.isTokenExpired(token)) { // if token has not expired
          if (!auth.isAuthenticated) { // if user is not authenticated
            auth.authenticate(store.get('profile'), token); // authenticate user
          }
        }
      } else { // send to home to sign in again
        $location.path('/home');
      }
    })
  })
