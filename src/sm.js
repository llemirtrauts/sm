/**
 * sm.js
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

         return instance;
      }
      
      /**
       * Extends properties from a parent's (constructor) prototype to a child constructor
       * @param{Object} parent 
       * @param{Object} child 
       * @return{Object}
       */
      function extend(child, parent) {
         function F(){};

         F.prototype = parent.prototype;
         child.prototype = new F();
         child.prototype.constructor = child;

         return child;
      }
      
      /**
       * Extends a child object instance by copying all properties (including prototype properties)
       * from a parent object to the child object
       *
       * @param {Object} child
       * @param {Object} parent
       * @return {Object}
       */
      function inherit(child, parent) {
         
         for(key in parent) {
            //check for undefined or null property
            if(child[key] == null) {
               child[key] = parent[key];
            }
         }

         return child;
      }
      
            
      // native extensions
      if(!Function.prototype.bind) {
         var slice = Array.prototype.slice;

         /**
          * binds a function to an object scope for future calling
          * @param{Object} ob - scope to run the function under
          * @return{Function} the bound function
          */
         Function.prototype.bind = function(ob) {
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
         object: object,
         extend: extend,
         inherit: inherit
      }); 

   }(window))
}

/**
 * @class Observable
 * @exports Observable as SM.event.Observable
 */
(function() {

   SM.namespace("event");

   SM.event.Observable = {
      events: {},
      
      
      pub: function(name) {
         var event = this.events[name];

         for(var i = 0, l = e.length; i < l; i++) {
            event();    
         }
      },

      sub: function(name, handler) {
         var events = this.events;

         if(events[name] == undefined) {
            events[name] = [];
         }
         events[name].push(handler);
      }
   }
}());

