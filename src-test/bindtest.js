TestCase( "FunctionBindingTestCase", {
   setUp: function() {
      //setup code. Executed before every test 
   },

   tearDown: function() {
      //teardown code. Exectuted after every test
   },

   "test that bindTo is on the Function.prototype": function() {
      assertTrue(typeof Function.prototype.bindTo === "function");
   },
   
   "test bindTo binds function to the correct scope": function() {
      function f() {
         return this;       
      }
      var objectToBindTo = {};
      var boundFunction = f.bindTo(objectToBindTo);
      assertEquals(objectToBindTo, boundFunction());
   },

   "test that arguments can be bound to a function call": function() {
      function f( a, b, c, b ){
         return Array.prototype.slice.call(arguments);
      }
      var boundFunction = f.bindTo(null, 1, 2, 3, 4);
      assertEquals([1, 2, 3, 4], boundFunction());
   }
   
} );

