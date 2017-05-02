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


                editarUsuario:function(dat){  
            console.log(dat);
           
            return  $http.post(serverConfig.url+'/editarUsuario',dat)
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



                recuperarContra:function(email){  

            return  $http.post(serverConfig.url+'/recuperarContra',{email: email})
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.recuperacionOK =false;}

           
            return e;
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



            getTickets:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getTickets',{idUsuario:idUsuario})
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

            usarTicket:function(idUsuario,idTicket){  

            return  $http.post(serverConfig.url+'/usarTicket',{idUsuario:idUsuario, idTicket:idTicket})
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


            getRanking:function(filtro,idUsuario){  

            return  $http.post(serverConfig.url+'/getRanking',{filtro:filtro, idUsuario:idUsuario})
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

            getEcosocios:function(){  

            return  $http.post(serverConfig.url+'/getEcosocios')
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
        },

                    getLugares:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getLugares')
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


