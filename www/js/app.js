// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

/*    window.addEventListener('native.keyboardshow', function () {
document.querySelector('div.tabs').style.display = 'none';
angular.element(document.querySelector('ion-content.has-tabs')).css('bottom', 0);
});
window.addEventListener('native.keyboardhide', function () {
var tabs = document.querySelectorAll('div.tabs');
angular.element(tabs[0]).css('display', '');
});
*/
//navigator.splashscreen.hide();
 //window.open = cordova.InAppBrowser.open;
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})



 .constant("serverConfig", {
        //"url": "http://localhost:80",
        "url": "http://ecoven.cl/app/v1/index.php",
        "imageStorageURL" : 'http://ecoven.cl/app/images'
        //"port": "80"
    })


.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider, $httpProvider) {


 $ionicConfigProvider.tabs.position('bottom'); //

      $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

  .state('misTickets', {
      url: '/misTickets',
      templateUrl: 'templates/misTickets.html',
      controller: 'misTicketsCtrl'
  })

    .state('maquinas', {
      url: '/maquinas',
      templateUrl: 'templates/maquinas.html',
      controller: 'maquinasCtrl'
  })




  .state('ecosocios', {
      url: '/ecosocios',
      templateUrl: 'templates/ecosocios.html',
      controller: 'ecosociosCtrl'
  })


  .state('ubicaciones', {
      url: '/ubicaciones',
      templateUrl: 'templates/ubicaciones.html',
      controller: 'ubicacionesCtrl'
  })



  .state('contactenos', {
      url: '/contactenos',
      templateUrl: 'templates/contactenos.html',
      controller: 'DashCtrl'
  })


  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })


  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'rankingCtrl'
      }
    }
  })
  .state('tab.products', {
    url: '/products',
    views: {
      'tab-products': {
        templateUrl: 'templates/tab-products.html',
        controller: 'productsCtrl'
      }
    }
  })


  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'activarCodigoCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'activarCodigoCtrl'
        }
      }
    });



          if(localStorage.getItem('userInfoEV') == null || 
            localStorage.getItem('userInfoEV') == 'null' || 
            localStorage.getItem('userInfoEV') == 'undefined' || 
            localStorage.getItem('userInfoEV') == undefined){

        //console.log(localStorage.getItem('userInfoTS'));
      $urlRouterProvider.otherwise('/login');

        }
        else{
           // console.log(localStorage.getItem('userInfoTS'));
       $urlRouterProvider.otherwise('/tab/account');
        // $urlRouterProvider.otherwise("/login");
        }



});
