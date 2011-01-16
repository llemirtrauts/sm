TestCase( "CurryTestCase", {
   setUp: function() {
      //setup code. Executed before every test 
   },

   tearDown: function() {
      //teardown code. Exectuted after every test
   },

   "test curry is on function.prototype": function() {
      assertEquals("function", typeof Function.prototype.curry);          
   },

   "test curry binds correct arguments to functions": function() {
      function f( a, b, c ){
         return (Array.prototype.slice.call(arguments));
      }
      var c = f.curry(1, 2);
      assertEquals([1, 2, 3], c(3));
   }
   
    
} );

