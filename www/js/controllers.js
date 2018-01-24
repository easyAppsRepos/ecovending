angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicHistory) {

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }
 

 $scope.getH=function(ee){

var acu = (ee*0.00055).toFixed(2);

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
  $scope.filtro={tiempo:'1000',maquina:'0'};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;
 $scope.url = serverConfig.imageStorageURL;




 $scope.getH=function(ee){

var acu = (ee*0.00055).toFixed(2);

  return acu;
 }


$scope.getFotoFace = function(id){

  return 'https://graph.facebook.com/'+id+'/picture?type=large';
}


$scope.selectFiltro = function(tiempo, maquina){

  if((tiempo == '1000' || tiempo == 1000) && ( maquina == '0' ||  maquina == 0) ){
   getRanking();
   return false;
  }
console.log(tiempo+'-'+maquina );

    $ionicLoading.show();
            
            api.getRanking2({tiempo:tiempo, idMaquina:maquina, idUsuario:$scope.usuarioInfo.idUsuario}).then(function(response){

          
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


          api.getMaquinas2().then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){
            console.log(response);
            $scope.maquinas = response.data.maquinas;

            console.log($scope.maquinas);

          }
          else{ mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
         // $state.go('app.login');
          });




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



.controller('eventosCtrl', function($scope, $stateParams, serverConfig, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {



  $scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;

$scope.$on('$ionicView.enter', function(event, viewData) {
$scope.getEventos();
});





$scope.goBack = function() {
    $ionicHistory.goBack();
  }


  $scope.urlMap = function(lat, lng){
         var url = "https://maps.google.com/?q=" + lat + "," + lng;
    window.open(url, '_system', 'location=yes'); return false;


}




$scope.hacerCheckin = function(idEvento, evento) {
   console.log('chekin');


if($scope.verificarCheckin(evento) == false){
     mensajeAlerta(1,'Hoy no es el evento. El evento es el dia '+evento.fecha.split(" ")[0]);
     return false;
}

    $ionicLoading.show();



        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;

                  console.log(latitudePerson);
    
          
              api.hacerCheckin(idEvento,$scope.usuarioInfo.idUsuario, latitudePerson, longitudePerson).then(function(response){
              console.log(response);


              if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
              //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
              return false;
              }
              if(response.data.error == false){

              $ionicLoading.hide(); 

              if(response.data.puntos > 0){
                mensajeAlerta(2, 'Gracias por participar en el evento, has ganado '+response.data.puntos+' puntos!');
              }
              else{

                mensajeAlerta(2, 'Gracias por participar en el evento');
              }  
              
               $scope.getEventos();
              //$scope.eventos = response.data.eventos;
              }
              else{  $ionicLoading.hide(); 
              //      mensajeAlerta(1,'Ha ocurrido un error');
               mensajeAlerta(1,'Debes estar cerca del evento para hacer check-in');
             // return false;
              // $scope.noMaquinas = true;
              }
              // $state.go('app.login');
              });




        }, function(error) {
           $ionicLoading.hide();
         mensajeAlerta(1,'Debes activar el GPS para hacer check-in');
        });






  }

$scope.verificarCheckin = function(e) {

//console.log(e);
  if(e.lat == 0 || e.lon == 0){

    return false;
  }
// Create date from input value

var dateString = e.fecha;
var inputDate = new Date(dateString.replace(/-/g, '/'));


//var inputDate = new Date(e.fecha);
console.log(inputDate);

// Get today's date
//var todaysDate = new Date();

var todaysDate = new Date();

console.log(todaysDate.setHours(0,0,0,0));
console.log(inputDate.setHours(0,0,0,0));

// call setHours to take the time out of the comparison
if(inputDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
    // Date equals today's date
    return true;
}
else{return false}


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
//$state.reload();
          //    $scope.closeModal();
             // $scope.usuario={};

            }
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }]
      });

}

$scope.borrarEvento = function(idEvento){



       var customTemplate2 ='<div style="color:white !important" >Vas a cancelar tu asistencia al evento <br><br>  <strong>Deseas continuar?</strong></div> ';


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

                      //pais from sellect
console.log(idEvento);

$ionicLoading.show();

          api.borrarEvento(idEvento,$scope.usuarioInfo.idUsuario ).then(function(response){
          console.log(response);


          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){

            $ionicLoading.hide(); 
            mensajeAlerta(2, 'Has cancelado el evento');
            $scope.getEventos();
            //$scope.eventos = response.data.eventos;
          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });


                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });




}



$scope.anotarEvento=function(idEvento){

console.log(idEvento);

$ionicLoading.show();

          api.anotarEvento(idEvento,$scope.usuarioInfo.idUsuario ).then(function(response){
          console.log(response);


          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){

            $ionicLoading.hide(); 
            mensajeAlerta(2, 'Te has anotado exitosamente');
            $scope.getEventos();
            //$scope.eventos = response.data.eventos;
          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });



}




$scope.asistirEvento=function(evento){

if(evento.listUsers == null){
  return false;
}
var str = evento.listUsers;
var res = str.split("-");


for(var j=0;res.length>j;j++){
    if(res[j] == $scope.usuarioInfo.idUsuario ){

      return true;
    }
}

  return false;

}




$scope.asistirEvento2=function(evento){

if(evento.listCheckins == null){
  return false;
}
var str = evento.listCheckins;
var res = str.split("-");


for(var j=0;res.length>j;j++){
    if(res[j] == $scope.usuarioInfo.idUsuario ){

      return true;
    }
}

  return false;

}





$scope.myFilter = function (item) { 

//console.log(item);
  //  return item.idPais == $scope.filtro.pais || $scope.filtro.pais == 69; 
    return !$scope.asistirEvento(item); 
};

$scope.myFilter2 = function (item) { 

//console.log(item);
  //  return item.idPais == $scope.filtro.pais || $scope.filtro.pais == 69; 
    return $scope.asistirEvento(item); 
};


$scope.getEventos = function(){

$ionicLoading.show();

          api.getEventos().then(function(response){
          console.log(response);

          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $ionicLoading.hide();
            $scope.eventos = response.data.eventos;
          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });




}




})


.controller('contactenosCtrl', function($scope, $stateParams, serverConfig, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {

$scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
      window.open(link, '_system', 'location=yes'); return false;

  }  
}

$scope.goBack = function() {
    $ionicHistory.goBack()
  }


})



.controller('maquinasCtrl', function($scope, $stateParams, serverConfig, $state, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {



$scope.filtro={distancia:'10000000000000000000000', pais:'69'};

  $scope.goBack = function() {
    $ionicHistory.goBack()
  }

  $scope.url = serverConfig.imageStorageURL;

          api.getPaises().then(function(response){
          console.log(response);

          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $scope.paises = response.data.paises;
          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });




$scope.selectPais = function(pais){
    //pais from sellect
 console.log(pais);
}





$scope.selectDistancia = function(distancia){

  $scope.ecosocios = null;
    //distancia from sellect
     console.log(distancia);
     $scope.filtro.distancia = distancia;
       $scope.getEcosocios();
 
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




  $scope.abrirMapa=function(lat,lng){



 var url = "https://maps.google.com/?q=" + lat + "," + lng;
    window.open(url, '_system', 'location=yes'); return false;


  }






  $scope.url = serverConfig.imageStorageURL;

$scope.getDistance = function(d){

 var f = Math.round(d);

 if (f < 1 ){ f = 'Menos de 1'}
 return f;
}

  $scope.getEcosocios = function(){
$scope.noMaquinas = false;

console.log($scope.filtro.distancia);
console.log($scope.filtro.pais);

 $ionicLoading.show();

        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;

                  console.log(latitudePerson);


            var dataE = {
            lat:latitudePerson,
            lon:longitudePerson,

            pais:$scope.filtro.pais,
            distancia:$scope.filtro.distancia
            }

$scope.noDistancia = false;
        
          api.getMaquinas(dataE).then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $scope.noMaquinas = false;
            $scope.ecosocios = response.data.maquinas;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
              $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });



        }, function(error) {
           $ionicLoading.hide();
         mensajeAlerta(1,'Debes activar el GPS para filtrar por distancia ');
         $scope.noDistancia = true;


    var dataE = {
            lat:0,
            lon:0,

            pais:$scope.filtro.pais,
            distancia:$scope.filtro.distancia
            }



                   api.getMaquinas(dataE).then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $scope.noMaquinas = false;
            $scope.ecosocios = response.data.maquinas;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
              $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });



        });



  }

  $scope.getEcosocios();


$scope.openHorario = function(horario){
// $scope.openModal("horario.html", "slide-in-up");

mensajeAlerta(1, horario || 'Horario no especificado');
 
}






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

            if($scope.tickets[i].vencido==0){
              $scope.cantCanjeables = $scope.cantCanjeables+1;
            }

           if($scope.tickets[i].vencido==1){
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


           // mensajeAlerta(2,'Codigo activado! Se te han acreditado 100 puntos'); 
         //  item.fechaCanje=response.data.fechaCanje;
          //item.fechaVencimiento =   item.fechaCaducidad;
         //  item.codigoWeb =   response.data.codigoWeb;

           


            $scope.canjeado=item;


            console.log($scope.canjeado);
            $scope.openModal();

          
    
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

          if(response.status== -1){
            mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');

          }

          if(response.data.error == false){

            mensajeAlerta(2,'+'+response.data.puntos+' ecopuntos <br><br>'+response.data.leyenda);   
         //  mensajeAlerta(2,' '+'+200'+' puntos <br><br>'+'Reciclar es un habito agradable, inculcale a tu familia el arte del reciclajas'); 

          }
          else{
             $ionicLoading.hide();
           mensajeAlerta(1,'Codigo invalido');
         }
          });

}
else{  $ionicLoading.hide();}




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





.controller('demoCtrl', function($scope, $state, $stateParams,$ionicNavBarDelegate, $ionicSideMenuDelegate, $ionicSlideBoxDelegate) {
console.log('asddsad');
$ionicNavBarDelegate.showBackButton(false);
$ionicSideMenuDelegate.canDragContent(false);

$scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


  $scope.startApp = function(){
   $state.go('tab.account');
  }



})



.controller('ChatDetailCtrl', function($scope, $stateParams) {
//  $scope.chat = Chats.get($stateParams.chatId);

})

.controller('loginCtrl', function($scope, $stateParams, $state, $q, $ionicHistory, api, $ionicLoading, $ionicPopup, $ionicModal) {
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
if(response.data.info.verificado == 0){
  mensajeAlerta(1,'Debes verificar tu cuenta');
  return false;
}
            window.localStorage.setItem( 'userInfoEV', JSON.stringify(response.data.info));
             $state.go('demo');            
            //$state.go('tab.account');


          }
          else{ mensajeAlerta(1,'Credenciales incorrectas');}
         // $state.go('app.login');
          });

}


}


    $scope.olvide = function(){

                      var mensaje = 'Correo Electronico'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/email.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> <input type="text" ng-model="olvideEmail" autocapitalize="off" > <button ng-click="recuperar(olvideEmail)" class="btnRecuperar button" style="    width: 100%;background-color: #999;margin-top: 20px;height: 40px;font-family: Ubuntu;color: white;border: none;border-radius: 2px;">Recuperar</button></div>';

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

  var cadena = email.toLowerCase();

          api.recuperarContra(cadena).then(function(data) {

            $ionicLoading.hide();

            if(data.recuperacionOK){
              //console.log(data);
              //window.localStorage.setItem( 'userInfoTS', JSON.stringify(data));

              $scope.pop.close();
              mensajeAlerta(3,'Se ha enviado la contraseña a tu correo, verifica en breve.');

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
  if(tipo == 2 || tipo == 3){

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



//FACEBOOK LOGIN

  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };





  // This is the success callback from the login method
  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage

              var usuario = {
              fbId: profileInfo.id,
              nombre: profileInfo.name,
              email: profileInfo.email,
              imagenFB : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
            };




               api.addUserFb(usuario).then(function (events) {

                    if(events.data.insertId > 0){

                       api.verificarFBLog(authResponse.userID).then(function (events) { 
                        if(events.data.info.length > 0){

                        window.localStorage.setItem( 'userInfoEV', JSON.stringify(events.data.info));            
                        //$state.go('tab.account');
                        $state.go('demo');  

                        }});
/*
                                    if(localStorage.getItem('pushKeyUD')){
                var pushKeyii=  localStorage.getItem('pushKeyUD');
                var device= ionic.Platform.platform();
                var uuid=ionic.Platform.device().uuid;
                var logIn = Date.now();


                var pushState = { 
                pushK:pushKeyii, 
                device:device,
                deviceId:uuid,
                login: logIn,
                user:events.data.insertId
                }

                console.log(pushState);

                api.addPush(pushState).then(function (events) {

                console.log(events);
                }).finally(function () {
                  $ionicLoading.hide();
                    $timeout(function() {
   location.reload();
});
                });

*/

                



                              
             //  $scope.closeModal();
                    }


                    else{

                        api.verificarFBLog(authResponse.userID).then(function (events) { 
                        if(events.data.error == false || events.data.error == 'false'){

                        window.localStorage.setItem( 'userInfoEV', JSON.stringify(events.data.info));            
                        //$state.go('tab.account');
                        $state.go('demo');  

                        }

                        else{

                           mensajeAlerta(1, 'Ha ocurrido un error');

                        }
                      });



                     
                      $ionicLoading.hide();
                    }

              }).finally(function () {
                $ionicLoading.hide();
             
               });





     // $ionicLoading.hide();
    //$state.go('app.listaMascotas');


    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    mensajeAlerta(1, 'Ha ocurrido un error');
    $ionicLoading.hide();
  };



    //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {

console.log('f');

    facebookConnectPlugin.getLoginStatus(function(success){


      if(success.status === 'connected'){
        $ionicLoading.show();
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);
        console.log('getLoginStatus', success);

        // Check if we have our user saved

        api.verificarFBLog(success.authResponse.userID).then(function (events) { 

          console.log('dd33');
                    console.log(events);
                    console.log(events.data.error);
        if(events.data.error == 'false' || events.data.error == false){
 console.log('3');
            window.localStorage.setItem( 'userInfoEV', JSON.stringify(events.data.info));            
            //$state.go('tab.account');
            $state.go('demo');  

        }
        else{
 console.log('4');
          getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage

            var usuario = {
              fbId: profileInfo.id,
              nombre: profileInfo.name,
              email: profileInfo.email,
              imagenFB : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            };
            console.log(usuario);

               api.addUserFb(usuario).then(function (events) {
  console.log(events);
                    if(events.data.insertId > 0){
                        api.verificarFBLog(success.authResponse.userID).then(function (events) { 
  console.log(events);
  console.log('asda3333');
                        if(events.data.info.length > 0){

                        window.localStorage.setItem( 'userInfoEV', JSON.stringify(events.data.info));            
                       // $state.go('tab.account');
                       $state.go('demo');  

                        }});
  

                    }

                    else{

                      mensajeAlerta(1, 'Usuario ya registrado');
                    }

              }).finally(function () {
  console.log('advb333');
              //$ionicLoading.hide();
              //$state.go('app.listaMascotas');
               });
    }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
            mensajeAlerta(1, 'Ha ocurrido un error');
          });
         //   mensajeAlerta(1, 'Credenciales incorrectas');



        }

      }).finally(function () {$ionicLoading.hide();});

/*

        if(!user.userID){


          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
            });

            $state.go('app.home');
          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });


        }else{
          $state.go('app.home');
        }*/
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Ingresando...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };


//END FACEBOOK LOGIN

$scope.registrarUsuario = function(user){
console.log('user');


    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(re.test(user.email) == false){

     mensajeAlerta(1,'Email invalido');
   return false;

   };
   
if(user.email !== user.email2 ){mensajeAlerta(1,'Tu email no coincide!'); return false;}

if(user.email == 'undefined' || user.email == null || user.email == '' ||
   user.nombre == 'undefined' || user.nombre == null || user.nombre == '' || 
   user.contra == 'undefined' || user.contra == null || user.contra == '' ||
   user.contra2 == 'undefined' || user.contra2 == null || user.contra2 == '' ||
   user.idPais == 'undefined' || user.idPais == null || user.idPais == ''   ){

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

            mensajeAlerta(2,'Usuario creado correctamente, debes validar tu email para ingresar','1');
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
            $scope.paises = response.data.paises;

            console.log($scope.paises);
            console.log($scope.lugares);


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



$scope.filtro={distancia:'10000000000000000000000', pais:'69', subcategoria:'0'};

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


            api.getSubCategorias().then(function(response){
          console.log(response);

          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $scope.paises = response.data.paises;
            $scope.subcat = response.data.subCategorias;
          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });




$scope.myFilter = function (item) { 

//console.log(item);
  //  return item.idPais == $scope.filtro.pais || $scope.filtro.pais == 69; 
    return (item.idPais == $scope.filtro.pais || $scope.filtro.pais == 69) && ( item.distance < $scope.filtro.distancia || item.distance == undefined || item.tipo == 3) && (item.subCategoriaID == $scope.filtro.subcategoria || $scope.filtro.subcategoria == 0); 
};



$scope.openPage = function(link){

  if(link == null || link == 'null' || link == 'undefinded'){console.log('nolink')}

  else{
      window.open(link, '_system', 'location=yes'); return false;

  }  
}

var urlMap = function(lat, lng){
         var url = "https://maps.google.com/?q=" + lat + "," + lng;
    window.open(url, '_system', 'location=yes'); return false;


}



$scope.urlMap = function(lat, lng){
         var url = "https://maps.google.com/?q=" + lat + "," + lng;
    window.open(url, '_system', 'location=yes'); return false;


}


$scope.openMap = function(data){

    console.log(data.length);
console.log(data);
    if(data.length > 1 ){

      console.log('display pop');
      mensajeAlerta(3, data);

    }
    else{

      urlMap(data[0].lat, data[0].lon);


    }

}




  $scope.getEcosocios = function(dara){

          $ionicLoading.show();

          if(dara==0){
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
          else{

          api.getEcosociosGPS(dara).then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ 
            $ionicLoading.hide(); 
            mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){

            $scope.ecosocios = response.data.ecosocios;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });


          }  



  }

$scope.getEcoGPS = function(){

 $ionicLoading.show();

        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;

                  console.log(latitudePerson);


            var dataE = {
            lat:latitudePerson,
            lon:longitudePerson,
            distancia:$scope.filtro.distancia
            }

$scope.noDistancia = false;



  $scope.getEcosocios(dataE);

        }, function(error) {
           $ionicLoading.hide();
         mensajeAlerta(1,'Debes activar el GPS para filtrar por distancia ');
         $scope.noDistancia = true;
          $scope.getEcosocios(0);

        });


}

  $scope.getEcoGPS();

  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';

    if(tipo==3){

  for (var j = 0; j < mensaje.length; j++){
  console.log(mensaje[j].etiqueta);
}
$scope.ubicaciones = mensaje;
     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"> <p style="font-size:14px;color:white">Selecciona la ubicacion a mostrar</p> <button style="margin:5px;padding:5px" class="button button-small button-ligth" ng-repeat="o in ubicaciones" ng-click="urlMap(o.lat, o.lon)" >{{o.etiqueta}}</button></div>';

      $ionicPopup.show({
        template: customTemplate,
        scope: $scope,
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


return false;
}



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


$scope.filtro={distancia:'10000000000000000000000', pais:'69', subcategoria:'0'};
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
    $scope.usuarioInfo.pib=  userData.pib*1;


//});
    
            api.getSubCategorias().then(function(response){
          console.log(response);
            console.log('S');


          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); 
            //mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');
                   console.log('Ha ocurrido un error, verifica tu conexion a internet');
          }
          if(response.data.error == false){
            $scope.paises = response.data.paises;
            $scope.subcat = response.data.subCategorias;
            

          }
          else{  $ionicLoading.hide(); 
      //      mensajeAlerta(1,'Ha ocurrido un error');
              console.log('Ha ocurrido un error, verifica tu conexion a internet');
             // $scope.noMaquinas = true;
            }
         // $state.go('app.login');
          });



  $scope.getProductos = function(){

console.log($scope.filtro.distancia);
console.log($scope.filtro.pais);

 $ionicLoading.show();

        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
    

               var latitudePerson = pos.coords.latitude;
                var longitudePerson = pos.coords.longitude;

                  console.log(latitudePerson);


            var dataE = {
            lat:latitudePerson,
            lon:longitudePerson,
            }

$scope.noDistancia = false;
        
          api.getProductos($scope.usuarioInfo.idUsuario, dataE.lat, dataE.lon).then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          
          if( response.data == null || response.data.error == false){

            $scope.productos = response.data.productos;
            $scope.puntos = response.data.puntos;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });



        }, function(error) {
           $ionicLoading.hide();
         mensajeAlerta(1,'Debes activar el GPS para filtrar por distancia ');
         $scope.noDistancia = true;


    var dataE = {
            lat:0,
            lon:0,
            }


          api.getProductos($scope.usuarioInfo.idUsuario, dataE.lat, dataE.lon).then(function(response){
          console.log(response);
          if(response.status== -1 || response.data==null  || response.data=='null'  ){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          
          if( response.data == null || response.data.error == false){

            $scope.productos = response.data.productos;
            $scope.puntos = response.data.puntos;

            $ionicLoading.hide();

          }
          else{  $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });



        });



  }



 

  $scope.getProductos();




          $scope.showPopup = function(idProducto, idEcosocio, titulo) {
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

                  $scope.canjearProducto(idProducto,idEcosocio,titulo);


                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });


          };

var item = {};
$scope.canjearProducto=function(idProducto, idEcosocio, titulo){
console.log(  $scope.usuarioInfo.pib ); 

if(idEcosocio == 34){

  if ($scope.usuarioInfo.pib == null || $scope.usuarioInfo.pib == undefined ||
     $scope.usuarioInfo.pib == 'null' || $scope.usuarioInfo.pib == 'undefined' || $scope.usuarioInfo.pib == 0){
   mensajeAlerta(1,'Debes indicar tu numero de tarjeta en la seccion Perfil/editar para poder canjear este producto');
    return false;
  }


}

          $ionicLoading.show();
          api.canjearProducto2($scope.usuarioInfo.idUsuario, idProducto,idEcosocio).then(function(response){

          console.log(response);
          if(response.status== -1){ $ionicLoading.hide(); mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          
          if(response.data.error == false){
            $scope.puntos = response.data.puntos;
              $scope.idTicket = response.data.ticket;
            $ionicLoading.hide();

            item.fechaCanje=response.data.fechaCanje;
            item.fechaVencimiento =   response.data.fechaVencimiento;
            item.codigoWeb =   response.data.codigoWeb;
            item.idEcosocio =   idEcosocio;
             item.titulo =   titulo;
            item.ticket =    response.data.ticket;
            $scope.canjeado=item;


            console.log($scope.canjeado);
            $scope.openModal3();



             //mensajeAlerta(2,'Enhorabuena!. Has adquirido un ticket! ');

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




    $scope.openModal3 = function() {
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


.controller('AccountCtrl', function($scope, $ionicLoading, $state, $timeout, api, $ionicPopup, $ionicModal,serverConfig) {

$scope.busqueda={};
$scope.busqueda.categoria=0;


$scope.edicion={};
$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
    $scope.usuarioInfo.institucionID=  userData.institucionID;
  $scope.usuarioInfo.ranking=  userData.ranking;
   $scope.usuarioInfo.pib =userData.pib;

     $scope.usuarioInfo.fbId =userData.fbId;
          $scope.usuarioInfo.imagenFB =userData.imagenFB;


  $scope.usuarioInfo.puntosActuales=  userData.puntosActuales;
  $scope.usuarioInfo.idUsuario=  userData.idUsuario;
  $scope.url = serverConfig.imageStorageURL;



 cordova.plugins.diagnostic.isLocationAvailable(function(available){


    console.log("Location is " + (available ? "available" : "not available"));

    if(available){
      console.log('gpsalreadyActivado');
    }
    else{

      mensajeAlerta(5, 'Debes activar el GPS, la app debe permitir acceder a la ubicacion para funcionar')

    }  


}, function(error){


    console.error("The following error occurred: "+error);


});





$scope.getFotoFace = function(id){

  return 'https://graph.facebook.com/'+id+'/picture?type=large';
}

$scope.$on('$ionicView.enter', function(event, viewData) {
$scope.edicion={};
$scope.usuarioInfo={};
  var userData = JSON.parse(window.localStorage.getItem('userInfoEV'));

  $scope.usuarioInfo.nombre=  userData.nombre;
  $scope.usuarioInfo.institucion=  userData.institucion;
    $scope.usuarioInfo.institucionID=  userData.institucionID;
  $scope.usuarioInfo.ranking=  userData.ranking;
   $scope.usuarioInfo.pib =userData.pib;

     $scope.usuarioInfo.fbId =userData.fbId;
          $scope.usuarioInfo.imagenFB =userData.imagenFB;


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

var acu = (ee*0.00055).toFixed(2);

  return acu;
 }



  function mensajeAlerta(tipo, mensaje){

    var ima ='exclam.png';


if(tipo==5){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'cancelar',
          type: 'button-blueCustom',
          onTap: function(e) {
            return false;
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        },

        {
          text: 'Ir a configuracion',
          type: 'button-blueCustom',
          onTap: function(e) {

                cordova.plugins.diagnostic.switchToSettings(function(){
                console.log("Successfully switched to Settings app");
                }, function(error){
                console.error("The following error occurred: "+error);
                });
                return false;


          }
           // if(borrar){ $scope.user.pin='';}
           
          
        }
        ]
      });

      

}


if(tipo==1){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


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
  if(tipo == 2){

     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


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
             $scope.edicion.ranking = response.data.ranking;
             $scope.oldRank = response.data.ranking;
            $ionicLoading.hide();

          }
          else{ mensajeAlerta(1,'Ha ocurrido un error');}
         // $state.go('app.login');
          });
  }


  $scope.settings = {
    enableFriends: true
  };





  $scope.cFoto = function(){



       var customTemplate2 ='<div style="color:white !important" ><strong>Quieres cambiar tu foto de perfil? </strong></div> ';


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
                  $scope.cambiarFoto();
                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });




}



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

  console.log('Foto cambiada correctamente');
  $state.reload();
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




 //$scope.lero={selectedItemBalue:0};

    $scope.editPerfil=function(){

 $ionicLoading.show();
          api.getLugares().then(function(response){

          
          $ionicLoading.hide();

          if(response.status== -1){mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
          if(response.data.error == false){


            console.log(response);
            $scope.lugares = response.data.lugares;
            console.log($scope.usuarioInfo);
           $scope.edicion.nombre=   $scope.usuarioInfo.nombre;
           $scope.edicion.pib=   $scope.usuarioInfo.pib * 1; 
            $scope.edicion.lugar=   String($scope.usuarioInfo.institucionID);
           //$scope.usuarioInfo.institucionID
         // $scope.edicion.lugar = $scope.usuarioInfo.institucion;
        //  $scope.lero.selectedItemBalue= $scope.usuarioInfo.institucion;
         // $scope.edicion.ranking = $scope.usuarioInfo.ranking == 1 ? true : false;
        // $scope.edicion.ranking = false;
         /*  if($scope.edicion.ranking){
            $scope.huellaCheck=false;
           }
           else{
            $scope.huellaCheck=true;
           }*/

            $scope.huellaCheck=!$scope.edicion.ranking;
            $scope.openModal("editPerfilUs.html", "slide-in-down");




          }
          else{ mensajeAlerta(1,'Ha ocurrido un error, verifica tu conexion a internet');}
         // $state.go('app.login');
          });




    }


        $scope.editarUsuario=function(user){

    console.log(user.ranking);
    console.log($scope.oldRank);
    //console.log($scope.usuarioInfo);
//return false;
//if(user.ranking == true){ user.ranking = 1}
 // if(user.ranking == false){ user.ranking = 0}



      if( user.pib == $scope.usuarioInfo.pib && user.ranking == $scope.oldRank && user.nombre==$scope.usuarioInfo.nombre && user.lugar == $scope.usuarioInfo.institucionID){

        mensajeAlerta(1,'No has actualizado ningun dato');
        return true;
      }


var mensaje= 'Estas seguro que deseas editar tu perfil?';

if(user.ranking !== $scope.oldRank){
  mensaje = mensaje + ' *Para volver al listado de HV deberas contactar al administrador';
}
     var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/exclam.png"> <p style="    font-size: 18px;color:white; margin-top:25px">'+mensaje+'</p> </div>';


      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'cancelar',
          type: 'button-blueCustom',
          onTap: function(e) {
            return false;
          }
           // if(borrar){ $scope.user.pin='';}
           
          
        },

        {
          text: 'Ok',
          type: 'button-blueCustom',
          onTap: function(e) {


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
           // if(borrar){ $scope.user.pin='';}
           
          
        });
        }}]
      });



        
            




           
            

          }
 
         // $state.go('app.login');
     


    




});
