/* Magic Mirror
 * Module: MMM-UFO
 *
 * By Mykle1
 *
 */
Module.register("MMM-UFO", {

    // Module config defaults.
    defaults: {
		city: "New York",
		state: "NY",
        useHeader: true, // false if you don't want a header
        header: "Loading UFO's!", // Any text you want
        maxWidth: "250px",
        rotateInterval: 30 * 1000,
        animationSpeed: 3000, // fade in and out speed
        initialLoadDelay: 4250,
        retryDelay: 2500,
        updateInterval: 60 * 60 * 1000,

    },

    getStyles: function() {
        return ["MMM-UFO.css"];
    },

    start: function() {
        Log.info("Starting module: " + this.name);

        requiresVersion: "2.1.0",

        // Set locale.
        this.url = "https://ufo-api.herokuapp.com/api/sightings/search?city=" + this.config.city + "&state=" + this.config.state + "&limit=50&skip=0";
        this.UFO = [];
        this.activeItem = 0;         // <-- starts rotation at item 0 (see Rotation below)
        this.rotateInterval = null;  // <-- sets rotation time (see below)
        this.scheduleUpdate();       // <-- When the module updates (see below)
    },

    getDom: function() {
		
		// creating the wrapper
        var wrapper = document.createElement("div");
        wrapper.className = "wrapper";
        wrapper.style.maxWidth = this.config.maxWidth;

		// The loading sequence
        if (!this.loaded) {
            wrapper.innerHTML = "UFO's Appearing . . !";
            wrapper.classList.add("bright", "light", "small");
            return wrapper;
        }

		// creating the header
        if (this.config.useHeader != false) {
            var header = document.createElement("header");
            header.classList.add("xsmall", "bright", "light", "header");
            header.innerHTML = this.config.header;
            wrapper.appendChild(header);
        }

		// Rotating the data
        var Keys = Object.keys(this.UFO);
        if (Keys.length > 0) {
            if (this.activeItem >= Keys.length) {
                this.activeItem = 0;
            }
            var UFO = this.UFO[Keys[this.activeItem]];

			
			// Creating the div's for your data items
            var top = document.createElement("div");
            top.classList.add("list-row");
			
			
			// shape element from data
			var shape = document.createElement("div");
            shape.classList.add("xsmall", "bright", "shape");
            shape.innerHTML = UFO.shape + " shaped UFO object";
            wrapper.appendChild(shape);
			
			
			// date element from data
			var date = document.createElement("div");
            date.classList.add("xsmall", "bright", "date");
            date.innerHTML = "Sighted: " + moment(UFO.date, "YYYY-MM-DD HH:mm:ss Z").local().format("MMM DD, YYYY @ hh:mm a");
            wrapper.appendChild(date);
			
			
			// city and state elements from data
			var cityState = document.createElement("div");
            cityState.classList.add("xsmall", "bright", "cityState");
            cityState.innerHTML = "In " + UFO.city + ", " + UFO.state;
            wrapper.appendChild(cityState);
			
			
			// duration element from data
			var duration = document.createElement("div");
            duration.classList.add("xsmall", "bright", "duration");
            duration.innerHTML = "Duration of sighting was " + UFO.duration;
            wrapper.appendChild(duration);
			
			
			// summary element from data
            var summary = document.createElement("div");
            summary.classList.add("xsmall", "bright", "summary");
            summary.innerHTML = "Witness statement: " + UFO.summary;
            wrapper.appendChild(summary);

        } // <-- closes the rotation of the data
		
        return wrapper;
		
    }, // <-- closes the getDom function from above

	// this processes your data
    processUFO: function(data) { 
        this.UFO = data; 
    //    console.log(this.UFO); // uncomment to see if you're getting data (in dev console)
        this.loaded = true;
    },
	
	
	// this rotates your data
    scheduleCarousel: function() { 
    //    console.log("Carousel of UFO fucktion!"); // uncomment to see if data is rotating (in dev console)
        this.rotateInterval = setInterval(() => {
            this.activeItem++;
            this.updateDom(this.config.animationSpeed);
        }, this.config.rotateInterval);
    },
	
	
// this tells module when to update
    scheduleUpdate: function() { 
        setInterval(() => {
            this.getUFO();
        }, this.config.updateInterval);
        this.getUFO(this.config.initialLoadDelay);
        var self = this;
    },
	
	
	// this asks node_helper for data
    getUFO: function() { 
        this.sendSocketNotification('GET_UFO', this.url);
    },
	
	
	// this gets data from node_helper
    socketNotificationReceived: function(notification, payload) { 
        if (notification === "UFO_RESULT") {
            this.processUFO(payload);
            if (this.rotateInterval == null) {
                this.scheduleCarousel();
            }
            this.updateDom(this.config.animationSpeed);
        }
        this.updateDom(this.config.initialLoadDelay);
    },
});