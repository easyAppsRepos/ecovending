angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicHistory) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }
 

 $scope.getH=function(ee){

var acu = (ee*0.0055).toFixed(2);

  return acu;
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




 $scope.getH=function(ee){

var acu = (ee*0.0055).toFixed(2);

  return acu;
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



.controller('ubicacionesCtrl', function($scope, $stateParams, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }

$scope.cantCanjeables = 0;
$scope.cantHisto = 0;

  $scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;


})

.controller('misTicketsCtrl', function($scope, $stateParams, serverConfig, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }

  $scope.url = serverConfig.imageStorageURL;

$scope.cantCanjeables = 0;
$scope.cantHisto = 0;

  $scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;




$scope.$on('$ionicView.enter', function(event, viewData) {
 getTickets();
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



function getTickets(){

$ionicLoading.show();

            api.getTickets($scope.usuarioInfo.idUsuario).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){ $ionicLoading.hide();mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){

           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos');   
          $scope.tickets = response.data.tickets;

          for(var i = 0; $scope.tickets.length > i ; i++){

            if($scope.tickets[i].estado==1){
              $scope.cantCanjeables = $scope.cantCanjeables+1;
            }

           if($scope.tickets[i].estado==2){
              $scope.cantHisto = $scope.cantHisto+1;
            }


          }

          $ionicLoading.hide();
          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Codigo invalido');
         }
          });

}






$scope.generarTicket = function(item){

 $ionicLoading.show();
  console.log(item);

            api.usarTicket($scope.usuarioInfo.idUsuario, item.idTicket).then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){ $ionicLoading.hide();mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}

          if(response.data.error == false){
console.log();
           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos'); 
           item.fechaCanje=response.data.fechaCanje;  
            $scope.canjeado=item;

            console.log($scope.canjeado);
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
else{  $ionicLoading.hide();}


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
usuario.email = usuario.email.toLowerCase();
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


    $scope.olvide = function(){

                      var mensaje = 'Correo Electronico'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/email.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> <input type="text" ng-model="olvideEmail" > <button ng-click="recuperar(olvideEmail)" class="btnRecuperar button" style="    width: 100%;background-color: #999;margin-top: 20px;height: 40px;font-family: Ubuntu;color: white;border: none;border-radius: 2px;">Recuperar</button></div>';

        $scope.pop = $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustoms',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });
    }



    $scope.recuperar = function(email){
$ionicLoading.show();
  console.log(email);

          api.recuperarContra(email).then(function(data) {

            $ionicLoading.hide();

            if(data.recuperacionOK){
              //console.log(data);
              //window.localStorage.setItem( 'userInfoTS', JSON.stringify(data));

              $scope.pop.close();
              mensajeAlerta(2,'Se ha enviado la contraseña a tu correo, verifica en breve. Recuerda buscar en la carpeta de "no deseados" si no está en tu bandeja');

            }
            else{

              $scope.pop.close();
              mensajeAlerta(1,'Email invalido');
            }
       

        });


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
    user.email = user.email.toLowerCase();

  console.log(user);
          api.registrarUsuario(user).then(function(response){

          console.log(response);
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){

            mensajeAlerta(2,'Usuario creado correctamente, ya puedes iniciar sesion!','1');
            //$scope.closeModal();
           // $scope.user={};
           
          //  $state.reload();
          }
          else{ mensajeAlerta(1,'No se ha podido crear el usuario');}
         // $state.go('app.login');
          });
}

}

$scope.newUser = function(){
  $ionicLoading.show();

          api.getLugares().then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){
            console.log(response);
            $scope.lugares = response.data.lugares;
            $scope.openModal("nuevoUsuario.html", "slide-in-up");

          }
          else{ mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
         // $state.go('app.login');
          });



 
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


.controller('ecosociosCtrl', function($scope, $ionicLoading, $ionicHistory, api, serverConfig, $ionicPopup, $ionicModal) {

$scope.usuarioInfo={};
  $scope.url = serverConfig.imageStorageURL;
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;


  $scope.goBack = function() {
    $ionicHistory.goBack()
  }


$scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
      window.open(link, '_system', 'location=yes'); return false;

  }  
}




  $scope.getEcosocios = function(){

          $ionicLoading.show();
          api.getEcosocios().then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){

            $scope.ecosocios = response.data.ecosocios;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });


  }

  $scope.getEcosocios();

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


.controller('productsCtrl', function($scope, $ionicLoading, api, serverConfig, $ionicPopup, $ionicModal) {

$scope.busqueda={};
$scope.busqueda.categoria=0;
//$scope.$on('$ionicView.enter', function(event, viewData) {

$scope.usuarioInfo={};
  $scope.url = serverConfig.imageStorageURL;
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
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
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




          $scope.showPopup = function(idProducto) {
            $scope.data = {}
           var customTemplate2 ='<div style="color:white !important" >El ticket tiene fecha de expiracion, se recomienda canjear al momento de la compra <br><br>  <strong>Deseas continuar?</strong></div> ';


            $ionicPopup.show({
              template: customTemplate2,
              title: '',
              subTitle: '',
              scope: $scope,
              buttons: [
                { text: 'No', onTap: function(e) { return false; } },
                {
                  text: '<b>Si</b>',
                  type: 'button-positive ',
                  onTap: function(e) {
                    return  true;
                  }
                },
              ]
              }).then(function(res) {

              
                console.log('Tapped!', res);

                if(res){

                  $scope.canjearProducto(idProducto);


                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });


          };


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


.controller('AccountCtrl', function($scope, $ionicLoading, $state, $timeout, api, $ionicPopup, $ionicModal,serverConfig) {

$scope.busqueda={};
$scope.busqueda.categoria=0;

$scope.$on('$ionicView.enter', function(event, viewData) {
$scope.edicion={};
$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.ranking=  userData.ranking;
  
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;
  $scope.url = serverConfig.imageStorageURL;
  $scope.getActividad();

});
    $scope.valorF = 3;

$scope.getime=function(){

  return $scope.valorF;
}

 $scope.getH=function(ee){

var acu = (ee*0.0055).toFixed(2);

  return acu;
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

              $scope.closeModal();
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
             $scope.huella = response.data.huella;
             $scope.canjes = response.data.canjes;
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

  $scope.$apply(function () {
     $scope.valorF =4;
});


 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
 }, options);
 }
 

 }





    $scope.editPerfil=function(){

 $ionicLoading.show();
          api.getLugares().then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){


            console.log(response);
            $scope.lugares = response.data.lugares;
            
           $scope.edicion.nombre=   $scope.usuarioInfo.nombre;
          $scope.edicion.lugar = $scope.usuarioInfo.institucion;
           $scope.edicion.ranking = $scope.usuarioInfo.ranking == 1 ? true : false;
            $scope.openModal("nuevoUsuario.html", "slide-in-down");




          }
          else{ mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
         // $state.go('app.login');
          });




    }


        $scope.editarUsuario=function(user){

    console.log(user.ranking);
    console.log($scope.usuarioInfo.ranking);

if(user.ranking == true){ user.ranking = 1}
  if(user.ranking == false){ user.ranking = 0}



      if( user.ranking == $scope.usuarioInfo.ranking && user.nombre==$scope.usuarioInfo.nombre && user.lugar == $scope.usuarioInfo.institucion){

        mensajeAlerta(1,'No has actualizado ningun dato');
        return true;
      }



               $ionicLoading.show();

               user.idUsuario = $scope.usuarioInfo.idUsuario;
                console.log(user);


          api.editarUsuario(user).then(function(response){

          console.log(response);

          

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');$ionicLoading.hide();}
          if(response.data.error == false){
            $ionicLoading.hide();
           mensajeAlerta(2,'Has editado tu perfil correctamente');
          window.localStorage.setItem( 'userInfoEV', JSON.stringify(response.data.info));  
          $state.reload();
            




           
            

          }
          else{ mensajeAlerta(1,'Ha ocurrido un error');$ionicLoading.hide();}
         // $state.go('app.login');
          });



    }




});
