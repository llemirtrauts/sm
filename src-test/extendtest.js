TestCase( "Extend test case", function(){

   
   function Parent() {
   
   }

   Parent.prototype.a = "one";
   Parent.prototype.b = "two";
 
   function Child() {
   
   }

   SM.extend(Child, Parent);

   Child.prototype.a = "three";

   return {

      setUp: function() {
         this.child = new Child();
      },

      tearDown: function() {

      },

      "test child inherits prototype properties of parent": function() {
         assertEquals("two", this.child.b);
      },

      "test child overwrites properties of parent": function() {
         assertEquals("three", this.child.a); 
      }
   }
}() );
