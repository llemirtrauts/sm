TestCase( "FunctionBindingTestCase", {
   setUp: function() {
      //setup code. Executed before every test 
   },

   tearDown: function() {
      //teardown code. Exectuted after every test
   },

   "test that bind is on the Function.prototype": function() {
      assertTrue(typeof Function.prototype.bind === "function");
   },
   
   "test bind binds function to the correct scope": function() {
      function f() {
         return this;       
      }
      var objectTobind = {};
      var boundFunction = f.bind(objectTobind);
      assertEquals(objectTobind, boundFunction());
   },

   "test that arguments can be bound to a function call": function() {
      function f( a, b, c, b ){
         return Array.prototype.slice.call(arguments);
      }
      var boundFunction = f.bind(null, 1, 2, 3, 4);
      assertEquals([1, 2, 3, 4], boundFunction());
   }
   
} );

