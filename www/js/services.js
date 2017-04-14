angular.module('starter.services', [])

.factory('api', function($http, $q, $window, serverConfig) {

    return {

    


        registrarUsuario:function(user){  
            console.log(user);
           
            return  $http.post(serverConfig.url+'/registrarUsuario',user)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

                doLogin:function(user){  
            console.log(user);
           
            return  $http.post(serverConfig.url+'/doLogin',user)
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },

            activarCodigo:function(codigo, usuario){  
            console.log(codigo + '- ' + usuario);
            return  $http.post(serverConfig.url+'/activarCodigo',{codigo:codigo, idUsuario:usuario})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },


            getActividad:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getActividad',{idUsuario:idUsuario})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },
            canjearProducto:function(idUsuario, idProducto){  

            return  $http.post(serverConfig.url+'/canjearProducto',{idUsuario:idUsuario, idProducto:idProducto})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        },


            getProductos:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getProductos',{idUsuario:idUsuario})
            .then(function(response) {
            console.log(response);
            return response;
            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);

            return response;
            });
        }


    }

    })


