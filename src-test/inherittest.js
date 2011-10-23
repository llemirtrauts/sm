TestCase( "Inherit test case", {

   setUp: function() {
      this.parent = {
         a: 1,
         b: 2
      };

      this.child = {
         a: "one",
      }
   },

   tearDown: function() {

   },

   "test child inherits properties from the parent": function() {
      var c = SM.inherit(this.child, this.parent);
      assertEquals(2, c.b);
   },

   "test child overwrites shared properties of parent": function() {
      var c = SM.inherit(this.child, this.parent);
      assertEquals("one", c.a);

   }
} );
