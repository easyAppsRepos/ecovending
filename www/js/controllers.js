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

.controller('ChatsCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

})



.controller('rankingCtrl', function($scope, $stateParams, serverConfig, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {



  $scope.usuarioInfo={};
  $scope.filtro=1;
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;
 $scope.url = serverConfig.imageStorageURL;


  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}




function getRanking(){

$ionicLoading.show();
            
            api.getRanking($scope.filtro, $scope.usuarioInfo.idUsuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){ $ionicLoading.hide();mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   
          $scope.ranking = response.data.ranking;
           $scope.myRank = response.data.rank;
          $ionicLoading.hide();
          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Ha ocurrido un error');
         }
          });

}




getRanking();



})


.controller('misTicketsCtrl', function($scope, $stateParams, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }

  $scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;



  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}



function getTickets(){

$ionicLoading.show();

            api.getTickets($scope.usuarioInfo.idUsuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){ $ionicLoading.hide();mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   
          $scope.tickets = response.data.tickets;
          $ionicLoading.hide();
          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Codigo invalido');
         }
          });

}




getTickets();


$scope.generarTicket = function(item){

 $ionicLoading.show();
  console.log(item);

            api.usarTicket($scope.usuarioInfo.idUsuario, item.idTicket).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){ $ionicLoading.hide();mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   
            $scope.canjeado=item;
            $scope.openModal();
            getTickets();
          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Ha ocurrido un error');
         }
          });




}




    $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('canjearTicket.html', {
      scope: $scope,
      animation: 'fade-in-right'
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
      console.log('cerraMod');
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action

  });




  })

.controller('activarCodigoCtrl', function($scope, $stateParams, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {

$scope.$on('$ionicView.enter', function(event, viewData) {

$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;


});


  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}


    $scope.activarCodigo=function(codigo){

/*  if(codigo == 'undefined' || codigo == null || codigo == '' ){

  mensajeAlerta(1,'Debes indicar ingresar un codigo');
}


    else{ 
        $ionicLoading.show();

            api.activarCodigo(codigo, $scope.usuarioInfo.idUsuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

            mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   


          }
          else{ mensajeAlerta(1,'Codigo invalido');}
          });



    }*/


cordova.plugins.barcodeScanner.scan(
      function (result) {
       $ionicLoading.show();
if(result.cancelled == 0){


            api.activarCodigo(result.text, $scope.usuarioInfo.idUsuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

            mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   


          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Codigo invalido');
         }
          });

}


/*          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
*/

      },
      function (error) {
          mensajeAlerta(1,'Ha ocurrido un error intentando escanear el codigo QR');
      },
      {
          preferFrontCamera : false, // iOS and Android 
          showFlipCameraButton : true, // iOS and Android 
          showTorchButton : true, // iOS and Android 
          torchOn: true, // Android, launch with the torch switched on (if available) 
          prompt : "Pon el codigo QR dentro del recuadro", // Android 
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
          orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
          disableAnimations : true, // iOS 
          disableSuccessBeep: false // iOS 
      }
   );

    }




})



.controller('ChatDetailCtrl', function($scope, $stateParams) {
//  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('loginCtrl', function($scope, $stateParams, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {
//  $scope.chat = Chats.get($stateParams.chatId);

$scope.usuario={};
$scope.login={};


$scope.$on('$ionicView.enter', function(event, viewData) {
    $ionicHistory.clearCache();
});



$scope.doLogin=function(usuario){

  console.log(usuario);

  if(usuario.email == 'undefined' || usuario.email == null || usuario.email == '' ||
   usuario.password == 'undefined' || usuario.password == null || usuario.password == '' ){

  mensajeAlerta(1,'Debes especificar email y contraseña');
}

else{
              $ionicLoading.show();

          api.doLogin(usuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){
//console.log(response.data.info);
            window.localStorage.setItem( 'userInfoEV', JSON.stringify(response.data.info));            
            $state.go('tab.account');


          }
          else{ mensajeAlerta(1,'Credenciales incorrectas');}
         // $state.go('app.login');
          });

}


}

  function mensajeAlerta(tipo, mensaje){
    console.log(tipo);
    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

              $scope.closeModal();
              $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}


$scope.registrarUsuario = function(user){
//console.log('user');


if(user.email == 'undefined' || user.email == null || user.email == '' ||
   user.nombre == 'undefined' || user.nombre == null || user.nombre == '' || 
   user.contra == 'undefined' || user.contra == null || user.contra == '' ||
   user.contra2 == 'undefined' || user.contra2 == null || user.contra2 == ''   ){

  mensajeAlerta(1,'Rellena tu informacion!');
}

else if(user.contra !== user.contra2){ mensajeAlerta(1,'Las contraseñas no coinciden'); }
else{ 



          $ionicLoading.show();
  if(user.lugar == 'undefined' || user.lugar == null || user.lugar == ''){user.lugar=''}
          api.registrarUsuario(user).then(function(response){

          console.log(response);
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){

            mensajeAlerta(2,'Usuario creado correctamente, ya puedes iniciar sesion!','1');
           // $scope.user={};
           
          //  $state.reload();
          }
          else{ mensajeAlerta(1,'No se ha podido crear el usuario');}
         // $state.go('app.login');
          });
}

}


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




.controller('menuButtonCtrl', function($scope, $timeout, $ionicModal, $state, $ionicLoading, $ionicHistory, $stateParams) {

$scope.cerrarSesion = function(){
$ionicLoading.show();

  window.localStorage.setItem( 'userInfoEV', undefined);  
  $state.go('login');
  $timeout(function () {
          $ionicHistory.clearCache();
          $ionicLoading.hide();
      }, 200)  


}



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



.controller('productsCtrl', function($scope, $ionicLoading, api, $ionicPopup, $ionicModal) {


//$scope.$on('$ionicView.enter', function(event, viewData) {

$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;


//});
    


  $scope.getProductos = function(){

          $ionicLoading.show();
          api.getProductos($scope.usuarioInfo.idUsuario).then(function(response){
          console.log(response);
          if(response.status== -1){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){

            $scope.productos = response.data.productos;
            $scope.puntos = response.data.puntos;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });


  }

  $scope.getProductos();


$scope.canjearProducto=function(idProducto){
console.log(idProducto); 

          $ionicLoading.show();
          api.canjearProducto($scope.usuarioInfo.idUsuario, idProducto).then(function(response){

          console.log(response);
          if(response.status== -1){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          
          if(response.data.error == false){
            $scope.puntos = response.data.puntos;
            $ionicLoading.hide();
             mensajeAlerta(2,'Enhorabuena!. Has adquirido un ticket! ');

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'No tienes suficientes puntos');}
         // $state.go('app.login');
          });


}


  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}

})


.controller('AccountCtrl', function($scope, $ionicLoading, $state, api, $ionicPopup, $ionicModal,serverConfig) {



$scope.$on('$ionicView.enter', function(event, viewData) {

$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;
  $scope.url = serverConfig.imageStorageURL;
  $scope.getActividad();

});
    


  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';
if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


}
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';

}

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

            if(tipo==2){ 

          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}




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




  $scope.getActividad = function(){


          $ionicLoading.show();
          api.getActividad($scope.usuarioInfo.idUsuario).then(function(response){

          console.log(response);

          

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){

            $scope.actividad = response.data.actividad;
             $scope.puntos = response.data.puntos;
            $ionicLoading.hide();

          }
          else{ mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });
  }


  $scope.settings = {
    enableFriends: true
  };

$scope.cambiarFoto = function(){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = 'userP'+$scope.usuarioInfo.idUsuario;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, serverConfig.imageStorageURL+"/upload.php", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();
  $state.reload();
  console.log('Foto cambiada correctamente');

 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
 }, options);
 }
 

 }



});
