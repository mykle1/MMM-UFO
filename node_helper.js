/* Magic Mirror
 * Module: MMM-UFO
 *
 * By Mykle1
 *
 */
const NodeHelper = require('node_helper');
const request = require('request');



module.exports = NodeHelper.create({

    start: function() {
        console.log("Starting node_helper for: " + this.name);
    },

    getUFO: function(url) {
        request({
            url: url,
            method: 'GET'
        }, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                var result = JSON.parse(body).sightings; // sightings is from JSON data
		//		console.log(response.statusCode + result); // uncomment to see in terminal
                    this.sendSocketNotification('UFO_RESULT', result);
		
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_UFO') {
            this.getUFO(payload);
        }
    }
});
