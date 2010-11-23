// jquery/dom/fixture/fixture.js

(function($){


	var ajax = $.ajax;

	/**
	 * @class jQuery.fixture
	 * @plugin jquery/dom/fixture
	 * @download jquery/dist/jquery.fixture.js
	 * @test jquery/dom/fixture/qunit.html
	 * @parent dom
	 * 
	 * Fixtures simulate AJAX responses by overwriting 
	 * [jQuery.ajax $.ajax], 
	 * [jQuery.get $.get], and 
	 * [jQuery.post $.post].  
	 * Instead of making a request to a server, fixtures simulate 
	 * the repsonse with a file or function.
	 * 
	 * They are a great technique when you want to develop JavaScript 
	 * independently of the backend. 
	 * 
	 * <h3>Quick Example</h3>
	 * <p>Instead of making a request to <code>/tasks.json</code>,
	 *    $.ajax will look in <code>fixtures/tasks.json</code>.
	 *    It's expected that a static <code>fixtures/tasks.json</code> 
	 *    file exists relative to the current page. 
	 * </p>
	 * @codestart
	 * $.ajax({url: "/tasks.json",
	 *   dataType: "json",
	 *   type: "get",
	 *   fixture: "fixtures/tasks.json",
	 *   success: myCallback});
	 * @codeend
	 * <h2>Using Fixtures</h2>
	 * To enable fixtures, you must add this plugin to your page and 
	 * set the fixture property.  
	 * 
	 * The fixture property is set as ...
	 * @codestart
	 * //... a property with $.ajax
	 * $.ajax({fixture: FIXTURE_VALUE})
	 * 
	 * //... a parameter in $.get and $.post
	 * $.get (  url, data, callback, type, FIXTURE_VALUE )
	 * $.post(  url, data, callback, type, FIXTURE_VALUE )
	 * @codeend
	 * <h3>Turning Off Fixtures</h3>
	 * <p>To turn off fixtures, simply remove the fixture plugin from 
	 *  your page.  The Ajax methods will ignore <code>FIXTURE_VALUE</code>
	 *  and revert to their normal behavior.  If you want to ignore a single
	 *  fixture, we suggest commenting it out.
	 * </p>
	 * <div class='whisper'>
	 * PRO TIP:  Don't worry about leaving the fixture values in your source.  
	 * They don't take up many characters and won't impact how jQuery makes
	 * requests.  They can be useful even after the service they simulate
	 * is created.
	 * </div>
	 * <h2>Types of Fixtures</h2>
	 * <p>There are 2 types of fixtures</p>
	 * <ul>
	 *  <li><b>Static</b> - the response is in a file.
	 *  </li>
	 *  <li>
	 *   <b>Dynamic</b> - the response is generated by a function.
	 *  </li>
	 * </ul>
	 * There are different ways to lookup static and dynamic fixtures.
	 * <h3>Static Fixtures</h3>
	 * Static fixture locations can be calculated:
	 * @codestart
	 * // looks in test/fixtures/tasks/1.get
	 * $.ajax({type:"get", 
	 *        url: "tasks/1", 
	 *        fixture: true}) 
	 * @codeend
	 * Or provided:
	 * @codestart
	 * // looks in fixtures/tasks1.json relative to page
	 * $.ajax({type:"get", 
	 *        url: "tasks/1", 
	 *        fixture: "fixtures/task1.json"})
	 * 
	 * // looks in fixtures/tasks1.json relative to jmvc root
	 * // this assumes you are using steal
	 * $.ajax({type:"get", 
	 *        url: "tasks/1", 
	 *        fixture: "//fixtures/task1.json"})` 
	 * @codeend
	 * <div class='whisper'>
	 *   PRO TIP: Use provided fixtures.  It's easier to understand what it is going.
	 *   Also, create a fixtures folder in your app to hold your fixtures.
	 * </div>
	 * <h3>Dynamic Fixtures</h3>
	 * <p>Dynamic Fixtures are functions that return the arguments the $.ajax callbacks 
	 *   (<code>beforeSend</code>, <code>success</code>, <code>complete</code>, 
	 *    <code>error</code>) expect.  </p>
	 * <p>For example, the "<code>success</code>" of a json request is called with 
	 * <code>[data, textStatus, XMLHttpRequest].</p>
	 * <p>There are 2 ways to lookup dynamic fixtures.<p>
	 * They can provided:
	 * @codestart
	 * //just use a function as the fixture property
	 * $.ajax({
	 *   type:     "get", 
	 *   url:      "tasks",
	 *   data:     {id: 5},
	 *   dataType: "json",
	 *   fixture: function( settings, callbackType ) {
	 *     var xhr = {responseText: "{id:"+settings.data.id+"}"}
	 *     switch(callbackType){
	 *       case "success": 
	 *         return [{id: settings.data.id},"success",xhr]
	 *       case "complete":
	 *         return [xhr,"success"]
	 *     }
	 *   }
	 * })
	 * @codeend
	 * Or found by name on $.fixture:
	 * @codestart
	 * // add your function on $.fixture
	 * // We use -FUNC by convention
	 * $.fixture["-myGet"] = function(settings, cbType){...}
	 * 
	 * // reference it
	 * $.ajax({
	 *   type:"get", 
	 *   url: "tasks/1", 
	 *   dataType: "json", 
	 *   fixture: "-myGet"})
	 * @codeend
	 * <p>Dynamic fixture functions are called with:</p>
	 * <ul>
	 * <li> settings - the settings data passed to <code>$.ajax()</code>
	 * <li> calbackType - the type of callback about to be called: 
	 *  <code>"beforeSend"</code>, <code>"success"</code>, <code>"complete"</code>, 
	 *    <code>"error"</code></li>
	 * </ul>
	 * and should return an array of arguments for the callback.<br/><br/>
	 * <div class='whisper'>PRO TIP: 
	 * Dynamic fixtures are awesome for performance testing.  Want to see what 
	 * 10000 files does to your app's performance?  Make a fixture that returns 10000 items.
	 * 
	 * What to see what the app feels like when a request takes 5 seconds to return?  Set
	 * [jQuery.fixture.delay] to 5000.
	 * </div>
	 * <h2>Helpers</h2>
	 * <p>The fixture plugin comes with a few ready-made dynamic fixtures and 
	 * fixture helpers:</p>
	 * <ul>
	 * <li>[jQuery.fixture.make] - creates fixtures for findAll, findOne.</li>
	 * <li>[jQuery.fixture.-restCreate] - a fixture for restful creates.</li>
	 * <li>[jQuery.fixture.-restDestroy] - a fixture for restful updates.</li>
	 * <li>[jQuery.fixture.-restUpdate] - a fixture for restful destroys.</li>
	 * </ul>
	 * @demo jquery/dom/fixture/fixture.html
	 * @constructor
	 * Takes an ajax settings and returns a url to look for a fixture.  Overwrite this if you want a custom lookup method.
	 * @param {Object} settings
	 * @return {String} the url that will be used for the fixture
	 */
	$.fixture = function( settings ) {
		var url = settings.url,
			match, left, right;
		url = url.replace(/%2F/g, "~").replace(/%20/g, "_");

		if ( settings.data && settings.processData && typeof settings.data !== "string" ) {
			settings.data = jQuery.param(settings.data);
		}


		if ( settings.data && settings.type.toLowerCase() == "get" ) {
			url += ($.String.include(url, '?') ? '&' : '?') + settings.data;
		}

		match = url.match(/^(?:https?:\/\/[^\/]*)?\/?([^\?]*)\??(.*)?/);
		left = match[1];

		right = settings.type ? '.' + settings.type.toLowerCase() : '.post';
		if ( match[2] ) {
			left += '/';
			right = match[2].replace(/\#|&/g, '-').replace(/\//g, '~') + right;
		}
		return left + right;
	};

	$.extend($.fixture, {
		/**
		 * Provides a rest update fixture function
		 */
		"-restUpdate": function( settings, cbType ) {
			switch ( cbType ) {
			case "success":
				return [$.extend({
					id: parseInt(settings.url, 10)
				}, settings.data), "success", $.fixture.xhr()];
			case "complete":
				return [$.fixture.xhr(), "success"];
			}
		},
		/**
		 * Provides a rest destroy fixture function
		 */
		"-restDestroy": function( settings, cbType ) {
			switch ( cbType ) {
			case "success":
				return [true, "success", $.fixture.xhr()];
			case "complete":
				return [$.fixture.xhr(), "success"];
			}
		},
		/**
		 * Provides a rest create fixture function
		 */
		"-restCreate": function( settings, cbType ) {
			switch ( cbType ) {
			case "success":
				return [{
					id: parseInt(Math.random() * 1000, 10)
				}, "success", $.fixture.xhr()];
			case "complete":
				return [$.fixture.xhr({
					getResponseHeader: function() {
						return settings.url + "/" + parseInt(Math.random() * 1000, 10);
					}
				}), "success"];
			}


		},
		/**
		 * Used to make fixtures for findAll / findOne style requests.
		 * @codestart
		 * //makes a threaded list of messages
		 * $.fixture.make(["messages","message"],1000, function(i, messages){
		 *   return {
		 *     subject: "This is message "+i,
		 *     body: "Here is some text for this message",
		 *     date: Math.floor( new Date().getTime() ),
		 *     parentId : i < 100 ? null : Math.floor(Math.random()*i)
		 *   }
		 * })
		 * //uses the message fixture to return messages limited by offset, limit, order, etc.
		 * $.ajax({
		 *   url: "messages",
		 *   data:{ 
		 *      offset: 100, 
		 *      limit: 50, 
		 *      order: "date ASC",
		 *      parentId: 5},
		 *    },
		 *    fixture: "-messages",
		 *    success: function( messages ) {  ... }
		 * });
		 * @codeend
		 * @param {Array} types An array of the fixture names
		 * @param {Number} count the number of items to create
		 * @param {Function} make a function that will return json data representing the object.
		 */
		make: function( types, count, make ) {
			// make all items
			var items = ($.fixture["~" + types[0]] = []);
			for ( var i = 0; i < (count); i++ ) {
				//call back provided make
				var item = make(i, items);

				if (!item.id ) {
					item.id = i;
				}
				items.push(item);
			}
			//set plural fixture for findAll
			$.fixture["-" + types[0]] = function( settings ) {

				//copy array of items
				var retArr = items.slice(0);

				//sort using order
				//order looks like ["age ASC","gender DESC"]
				$.each((settings.data.order || []).slice(0).reverse(), function( i, name ) {
					var split = name.split(" ");
					retArr = retArr.sort(function( a, b ) {
						if ( split[1].toUpperCase() !== "ASC" ) {
							return a[split[0]] < b[split[0]];
						}
						else {
							return a[split[0]] > b[split[0]];
						}
					});
				});

				//group is just like a sort
				$.each((settings.data.group || []).slice(0).reverse(), function( i, name ) {
					var split = name.split(" ");
					retArr = retArr.sort(function( a, b ) {
						return a[split[0]] > b[split[0]];
					});
				});


				var offset = parseInt(settings.data.offset, 10) || 0,
					limit = parseInt(settings.data.limit, 10) || (count - offset),
					i = 0;

				//filter results if someone added an attr like parentId
				for ( var param in settings.data ) {
					if ( param.indexOf("Id") != -1 || param.indexOf("_id") != -1 ) {
						while ( i < retArr.length ) {
							if ( settings.data[param] != retArr[i][param] ) {
								retArr.splice(i, 1);
							} else {
								i++;
							}
						}
					}
				}

				//return data spliced with limit and offset
				return [{
					"count": retArr.length,
					"limit": settings.data.limit,
					"offset": settings.data.offset,
					"data": retArr.slice(offset, offset + limit)
				}];
			};

			$.fixture["-" + types[1]] = function( settings ) {
				for ( var i = 0; i < (count); i++ ) {
					if ( settings.data.id == items[i].id ) {
						return [items[i]];
					}
				}
			};

		},
		/**
		 * Use $.fixture.xhr to create an object that looks like an xhr object. 
		 * <h3>Example</h3>
		 * The following example shows how the -restCreate fixture uses xhr to return 
		 * a simulated xhr object:
		 * @codestart
		 * "-restCreate" : function( settings, cbType ) {
		 *   switch(cbType){
		 *     case "success": 
		 *       return [
		 *         {id: parseInt(Math.random()*1000)}, 
		 *         "success", 
		 *         $.fixture.xhr()];
		 *     case "complete":
		 *       return [ 
		 *         $.fixture.xhr({
		 *           getResponseHeader: function() { 
		 *             return settings.url+"/"+parseInt(Math.random()*1000);
		 *           }
		 *         }),
		 *         "success"];
		 *   }
		 * }
		 * @codeend
		 * @param {Object} [xhr] properties that you want to overwrite
		 * @return {Object} an object that looks like a successful XHR object.
		 */
		xhr: function( xhr ) {
			return $.extend({}, {
				abort: $.noop,
				getAllResponseHeaders: function() {
					return "";
				},
				getResponseHeader: function() {
					return "";
				},
				open: $.noop,
				overrideMimeType: $.noop,
				readyState: 4,
				responseText: "",
				responseXML: null,
				send: $.noop,
				setRequestHeader: $.noop,
				status: 200,
				statusText: "OK"
			}, xhr);
		}
	});
	/**
	 * @attribute delay
	 * Sets the delay in milliseconds between an ajax request is made and
	 * the success and complete handlers are called.  This only sets
	 * functional fixtures.  By default, the delay is 200ms.
	 * @codestart
	 * steal.plugins('jquery/dom/fixtures').then(function(){
	 *   $.fixture.delay = 1000;
	 * })
	 * @codeend
	 */
	$.fixture.delay = 200;

	$.fixture["-handleFunction"] = function( settings ) {
		if ( typeof settings.fixture === "string" && $.fixture[settings.fixture] ) {
			settings.fixture = $.fixture[settings.fixture];
		}
		if ( typeof settings.fixture == "function" ) {
			setTimeout(function() {
				if ( settings.success ) {
					settings.success.apply(null, settings.fixture(settings, "success"));
				}
				if ( settings.complete ) {
					settings.complete.apply(null, settings.fixture(settings, "complete"));
				}
			}, $.fixture.delay);
			return true;
		}
		return false;
	};

	/**
	 *  @add jQuery
	 */
	// break
	$.
	/**
	 * Adds the fixture option to settings. If present, loads from fixture location instead
	 * of provided url.  This is useful for simulating ajax responses before the server is done.
	 * @param {Object} settings
	 */
	ajax = function( settings ) {
		var func = $.fixture;
		if (!settings.fixture ) {
			return ajax.apply($, arguments);
		}
		if ( $.fixture["-handleFunction"](settings) ) {
			return;
		}
		if ( typeof settings.fixture == "string" ) {
			var url = settings.fixture;
			if (/^\/\//.test(url) ) {
				url = steal.root.join(settings.fixture.substr(2));
			}
			
			settings.url = url;
			settings.data = null;
			settings.type = "GET";
			if (!settings.error ) {
				settings.error = function( xhr, error, message ) {
					throw "fixtures.js Error " + error + " " + message;
				};
			}
			return ajax(settings);

		}
		settings = jQuery.extend(true, settings, jQuery.extend(true, {}, jQuery.ajaxSettings, settings));

		settings.url = steal.root.join('test/fixtures/' + func(settings)); // convert settings
		settings.data = null;
		settings.type = 'GET';
		return ajax(settings);
	};

	$.extend($.ajax, ajax);

	$.
	/**
	 * Adds a fixture param.  
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} type
	 * @param {Object} fixture
	 */
	get = function( url, data, callback, type, fixture ) {
		// shift arguments if data argument was ommited
		if ( jQuery.isFunction(data) ) {
			fixture = type;
			type = callback;
			callback = data;
			data = null;
		}

		return jQuery.ajax({
			type: "GET",
			url: url,
			data: data,
			success: callback,
			dataType: type,
			fixture: fixture
		});
	};

	$.
	/**
	 * Adds a fixture param.
	 * @param {Object} url
	 * @param {Object} data
	 * @param {Object} callback
	 * @param {Object} type
	 * @param {Object} fixture
	 */
	post = function( url, data, callback, type, fixture ) {
		if ( jQuery.isFunction(data) ) {
			fixture = type;
			type = callback;
			callback = data;
			data = {};
		}

		return jQuery.ajax({
			type: "POST",
			url: url,
			data: data,
			success: callback,
			dataType: type,
			fixture: fixture
		});
	};

})(jQuery);

