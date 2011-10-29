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
      
      assertEquals(handler, this.observable.events["namedevent"][0].func);
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
      
      //this needs an assert
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
   },

   tearDown: function() {

   },
   
   "test subscriber function is called on publish": function() {
      var handler = function(){
         handler.called = true; 
      };   
      
      this.observable.sub("namedevent", handler);
      this.observable.pub("namedevent");

      assertTrue(handler.called);
   },

   "test all subscriber functions are called on publish": function() {
      var handlers = [
         function(){handlers[0].called = true},
         function(){handlers[1].called = true},
         function(){handlers[2].called = true},
         function(){handlers[3].called = true},
      ];
      this.observable.sub("namedevent", handlers[0]);
      this.observable.sub("namedevent", handlers[1]);
      this.observable.sub("namedevent1", handlers[2]);
      this.observable.sub("namedevent1", handlers[3]);
      this.observable.pub("namedevent");
      this.observable.pub("namedevent1");
      
      for(var i; i < handlers.length; i++) {
         assertTrue(handlers[i].called);
      }

   },

   "test subscribers are called in the required scope": function() {
      var object = {
         whoareyou: "batman"
      };

      function handler() {
         handler.whoareyou = this.whoareyou;
      }
      this.observable.sub("namedevent", handler, object);
      this.observable.pub("namedevent");

      assertEquals("batman", handler.whoareyou);
   },

   "test subscribers receive arguments from publishers": function() {
      var handler = function(){
         handler.args = arguments;
      };
      this.observable.sub("namedevent", handler);
      this.observable.pub("namedevent", "one", "two", "three");

      assertEquals(3, handler.args.length);
      assertEquals("one", handler.args[0]);
      assertEquals("two", handler.args[1]);
      assertEquals("three", handler.args[2]);
   },

   "test arguments are passed to handler function on event publish": function() {
      var handler = function(){};   
   }
} );
