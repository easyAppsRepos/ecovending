angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicHistory) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }
 
  $scope.items = [
    {title: 'Item 1', desc: 'This is item 1'},
    {title: 'Item 2', desc: 'This is item 2'},
    {title: 'Item 3', desc: 'This is item 3'}    
  ];
  
  $scope.onSlideChanged = function(slideIndex) {
    // Do something when slide changes
  };


})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//  $scope.chat = Chats.get($stateParams.chatId);

})


.controller('menuButtonCtrl', function($scope, $ionicModal, $stateParams, Chats) {


    $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });





})

   .directive('keyboardHandler', function ($window, $timeout) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            angular.element($window).bind('native.keyboardshow', function() {
                element.addClass('tabs-item-hide'); // tries to hide tab but becomes blank space instead
                $timeout(function() {
                    element.addClass('tabs-item-hide'); //remove blank space quickly
                 }, 0);
            });

            angular.element($window).bind('native.keyboardhide', function() {
                element.removeClass('tabs-item-hide');
            });
        }
    };
})
.controller('AccountCtrl', function($scope, $ionicModal) {


$scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function(templateName,animation) {
    $ionicModal.fromTemplateUrl(templateName, {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });




  $scope.abrirMenu = function(){


  }


  $scope.settings = {
    enableFriends: true
  };
});
