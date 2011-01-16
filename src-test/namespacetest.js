TestCase( "NamespaceTestCase", {

   "test that namespace is a function": function(){
      assertEquals("function", typeof SM.namespace);
   },

   "test namespace returns an object": function() {
      SM.namespace("ui");
      assertEquals("object", typeof SM.ui);
   },

   "test namespace returns the newly created namespace": function() {
      var ui = SM.namespace("ui");
      SM.a = 1;
      assertEquals(undefined, ui.a);
      ui.a = 2;
      assertEquals(2, ui.a);
   },

   "test multiple namespace add returns multiple namespaces": function() {
      SM.namespace("ui.widget.table");
      assertEquals("object", typeof SM.ui);
      assertEquals("object", typeof SM.ui.widget);
      assertEquals("object", typeof SM.ui.widget.table);
   },

   "test namespaces can not be overwritten": function() {
      var ui = SM.namespace("ui"); //create the original namespace
      ui.dontOverwrite = "youDare";
      ui = SM.namespace("ui"); //overwrite the namespace
      assertEquals("youDare", SM.ui.dontOverwrite); //check ui namespace hasn't been overwritten
   },

   "test namespace can be added to arbitrary objects": function() {
      var o = {
         namespace: SM.namespace
      };
      o.namespace("ui");
      assertEquals("object", typeof o.ui);
   },
   
   "test namespace can be added to arbitrary objects using call": function() {
      var o = {};
      SM.namespace.call(o, "ui");
      assertEquals("object", typeof o.ui);
   },

   tearDown: function() {
      if(SM.ui) {
         delete SM.ui;
      }
   }

});
