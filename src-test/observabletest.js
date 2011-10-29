TestCase( "Observable subscribe test case", {

   setUp: function() {
      this.observable = SM.object(SM.event.observable);   
      this.observer = {};
   },

   tearDown: function() {

   },

   "test util namespace exists": function() {
      assertNotUndefined(SM.event);
   },

   "test named event can be subscribed to ": function() {
      var handler = function(){};

      this.observable.sub("namedevent", handler); 
      
      assertEquals(handler, this.observable.events["namedevent"][0]);
   },

   "test throws TypeError if handler is not a function": function() {
      var handler = "not a function";

      assertException(function(){
         this.observable.sub("namedevent", handler)
      }, "TypeError"); 
   },

   "test all events can be unsubscribed from": function() {
      var handler = function(){},
         handler2 = function(){},
         handler3 = function(){},
         handler4 = function(){};

      this.observable.sub("namedevent", handler); 
      this.observable.sub("namedevent", handler2); 
      this.observable.sub("namedevent2", handler3); 
      this.observable.sub("namedevent2", handler4); 
      this.observable.unSub(); 

      console.log(this.observable.events);
   },

   "test specific named events can be removed": function() {
      var handler = function(){},
         handler2 = function(){};

      this.observable.sub("namedevent", handler);
      this.observable.sub("namedevent", handler2);
      this.observable.unSub("namedevent");

      assertNull(this.observable.events["namedevent"]); 
   },

   "test removing specific named events only removes that specific event": function() {
      var handler = function(){},
         handler2 = function(){};

      this.observable.sub("namedevent", handler);
      this.observable.sub("namedevent2", handler2);
      this.observable.unSub("namedevent");

      assertNull(this.observable.events["namedevent"]);
      assertNotNull(this.observable.events["namedevent2"]);
   },

   "test specific handler can be removed from a specific named event": function() {
      var handler = function(){},
         handler2 = function(){};

      this.observable.sub("namedevent", handler);
      this.observable.sub("namedevent", handler2);
      this.observable.unSub("namedevent", handler);

      assertEquals(1, this.observable.events["namedevent"].length);
      assertNotNull(this.observable.events["namedevent2"]);
   }

} );

TestCase( "Observable publish test case", {

   setUp: function() {
      this.observable = SM.object(SM.event.observable);   
      this.observer = {};
   },

   tearDown: function() {

   }
} );
