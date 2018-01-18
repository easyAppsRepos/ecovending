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
           
            return  $http.post(serverConfig.url+'/editarUsuario2',dat)
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

                        addUserFb:function(dat){  
            console.log(dat);
           
            return  $http.post(serverConfig.url+'/addUserFb',dat)
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

                        verificarFBLog:function(dat){  
            console.log(dat);
           
            return  $http.post(serverConfig.url+'/verificarFBLog',{id:dat})
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

         canjearProducto2:function(idUsuario, idProducto, eco){  

            return  $http.post(serverConfig.url+'/canjearProducto2',{idUsuario:idUsuario, idProducto:idProducto, idEcosocio:eco})
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

            return  $http.post(serverConfig.url+'/getTickets2',{idUsuario:idUsuario})
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


            getEcosociosGPS:function(dara){  

            return  $http.post(serverConfig.url+'/getEcosociosGPS',dara)
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

            getMaquinas:function(dara){  

            return  $http.post(serverConfig.url+'/getMaquinas',dara)
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



            getProductos:function(idUsuario,lat,lon){  

            return  $http.post(serverConfig.url+'/getProductosGPS',{idUsuario:idUsuario, lat:lat, lon:lon})
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



           anotarEvento:function(idEvento,idUsuario){  

            return  $http.post(serverConfig.url+'/anotarEvento',{idUsuario:idUsuario, idEvento:idEvento})
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

         hacerCheckin:function(idEvento,idUsuario, lat,lon){  

            return  $http.post(serverConfig.url+'/hacerCheckin',{idUsuario:idUsuario, idEvento:idEvento, lat:lat,lon:lon})
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

        


      borrarEvento:function(idEvento,idUsuario){  

            return  $http.post(serverConfig.url+'/borrarEvento',{idUsuario:idUsuario, idEvento:idEvento})
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
        },
                    getPaises:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getPaises')
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

        getSubCategorias:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getSubCategorias')
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



        

                            getEventos:function(idUsuario){  

            return  $http.post(serverConfig.url+'/getEventos')
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


