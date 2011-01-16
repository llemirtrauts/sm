/**
 * sm.js
 * experimental library of useful js stuff
 */

if( typeof SM == "undefined" || !SM ) {
   var SM = (function( window, undefined ) {

      /**
       * Creates a namespace - can be deeply nested
       * @param{String} name - namespace name, can be single i.e "ui" or deep i.e "ui.widget.calendar"
       * @return{Object} the generated namespace
       */
      function namespace(name) {

         var object = this,
            levels = name.split("."),
            i,
            l,
            level;

         for(i = 0, l = levels.length; i < l; i++) {
            if(!object[levels[i]]) {
               object[levels[i]] = {};
            }
            object = object[levels[i]];
         }
         return object;
      };

      /**
       * creates reusable objects from object literals
       * @param{Object} o  
       * @return{Object}
       */
      function object(o) {
         var instance;

         function F(){};
         F.prototype = o;
         instance = new F();
         instance.constructor = F;
         return instance;
      }
            
      // native extensions
      if(!Function.prototype.bindTo) {
         var slice = Array.prototype.slice;

         /**
          * binds a function to an object scope for future calling
          * @param{Object} ob - scope to run the function under
          * @return{Function} the bound function
          */
         Function.prototype.bindTo = function(ob) {
            var fn = this;

            if(arguments.length > 1) {
               var args = slice.call(arguments, 1);
               return function() {
                  var allArgs = args;
                  if(arguments.length > 0) {
                     allArgs.concat(slice.call(arguments));
                  }
                  return fn.apply(ob, allArgs);
               };
            }

            return function() {
               if(arguments.length > 0) {
                  return fn.apply(ob, arguments);
               }
               return fn.call(ob);
            };
         };
      }

      /**
       * prefills a function with arguments
       * @return{Function}
       */
      if(!Function.prototype.curry) {  
         Function.prototype.curry = function() {
            var fn = this,
               args = Array.prototype.slice.call(arguments);
            
            return function() {
               return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
            };
         };
      }

      return (window.SM = {
         namespace: namespace,
         object: object 
      }); 

   }(window))
}
