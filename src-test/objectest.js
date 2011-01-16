TestCase( "ObjectTestCase", {
   setUp: function() {
      this.object = {
         a: 1,
         b: 2
      }
   },

   tearDown: function() {
      delete this.object;
   },

   "test object is returned": function() {
      var objectInstance = SM.object(this.object);
      assertEquals("object", typeof objectInstance);
   },

   "test created object has constructor": function() {
      assertEquals(Object.prototype, this.object.constructor);
      var objectInstance = SM.object(this.object);
      assertTrue(objectInstance.constructor != this.object.constructor);
   },

   "test that independent objects are created": function() {   
      var instance1 = SM.object(this.object),
         instance2 = SM.object(this.object);

      assertNotSame(instance1, instance2);
      instance1.a = 3;
      assertNotSame(instance1.a, instance2.a);
   }
} );

