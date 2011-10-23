TestCase( "Observable test case", {

   setUp: function() {
      this.observable = SM.object(SM.event.Observable);   
      this.observer = {};
   },

   tearDown: function() {

   },

   "test util namespace exists": function() {
      assertNotUndefined(SM.event);
   },

   "test named event can be subscribed to ": function() {
      console.log(this.observable);
      var handler = function(){};

      this.observable.sub("namedevent", handler); 
      console.log(this.observable);
      //assertEquals(handler, this.observable.events["namedEvent"]);
   }
} );
