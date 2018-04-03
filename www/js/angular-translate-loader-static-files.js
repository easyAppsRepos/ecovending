/*!
 * angular-translate - v2.17.0 - 2017-12-21
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

$translateStaticFilesLoader.$inject = ['$q', '$http'];
angular.module('pascalprecht.translate')
/**
 * @ngdoc object
 * @name pascalprecht.translate.$translateStaticFilesLoader
 * @requires $q
 * @requires $http
 *
 * @description
 * Creates a loading function for a typical static file url pattern:
 * "lang-en_US.json", "lang-de_DE.json", etc. Using this builder,
 * the response of these urls must be an object of key-value pairs.
 *
 * @param {object} options Options object, which gets prefix, suffix, key, and fileMap
 */
.factory('$translateStaticFilesLoader', $translateStaticFilesLoader);

function $translateStaticFilesLoader($q, $http) {

  'use strict';

  return function (options) {

    if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
      throw new Error('Couldn\'t load static files, no files and prefix or suffix specified!');
    }

    if (!options.files) {
      options.files = [{
        prefix: options.prefix,
        suffix: options.suffix
      }];
    }

    var load = function (file) {
      if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
        throw new Error('Couldn\'t load static file, no prefix or suffix specified!');
      }

/*      var fileUrl = [
        file.prefix,
        options.key,
        file.suffix
      ].join('');
*/

      var fileUrl = file.prefix;


      if (angular.isObject(options.fileMap) && options.fileMap[fileUrl]) {
        fileUrl = options.fileMap[fileUrl];
      }

      return $http(angular.extend({
        url: fileUrl,
        method: 'GET'
      }, options.$http))
        .then(function(result) {
          let aEv = [];
//console.log(result);
          for (var i = 0; i < result.data.idiomas.length; i++) {

                      //return result.data;
            var s = result.data.idiomas[i].valor;

            s = s.replace(/\\n/g, "\\n")  
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f");
            // remove non-printable and other non-valid JSON chars

            s = JSON.parse(s.replace(/[\u0000-\u0019]+/g,"")); 
            //var o = JSON.parse(s);
            s.keyAbreviatura = result.data.idiomas[i].Abreviatura;

            //console.log(s);

          aEv.push(s);
          }


          //console.log(result);

         return aEv;
        //  return JSON.parse(s);
        }, function () {
          return $q.reject(options.key);
        });
    };
//console.log(options.files);
    var promises = [],
        length = options.files.length;

  //
     return load({
        prefix: options.files[0].prefix,
        key: options.key,
        suffix: options.files[0].suffix
      }).then(function(data){
        //console.log(data);
        promises = data;

            return $q.all(promises)
      .then(function (data) {
    //    console.log(data);
        var length = data.length,
            mergedData = {};

   /*     for (var i = 0; i < length; i++) {
          for (var key in data[i]) {
            mergedData[key] = data[i][key];
          }
        }*/
        //console.log(mergedData) ;
        return data;  //listo
      });


      });
   
//

  };
}

$translateStaticFilesLoader.displayName = '$translateStaticFilesLoader';
return 'pascalprecht.translate';

}));
