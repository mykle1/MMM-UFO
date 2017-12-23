## MMM-UFO

Meant to be used as a learning tool for building simple modules using JSON data

## Do this

Put this url into your browser:

https://ufo-api.herokuapp.com/api/sightings/search?city=new%20york&state=ny&limit=50&skip=0

## What the hell is that?

That's your data in JSON format. But don't panic! There is a fantastic way to look at
that data, making it easier for you to read and to use in your module.

## Use this free online tool

Go to https://codebeautify.org/jsonviewer.

* Copy that mess of data from the url that you put in your browser earlier

* Paste it into the left side of the JSON viewer tool next to the number 1

## But it still looks like shit, Mykle!

* Yes, it does.

* Click the "Tree Viewer" button in the middle of the page

* The result shows on the right side of the window

* Click the 4 arrows pointing away from each other, upper right of result window.

## Oh, that is B E A UTIFUL!

Now you're starting to like me. There is your data all layed out and organized for you.
You decide what data you want for your module. In this case I chose shape, date(has time),
city, state, duration and summary.

## Back up a second

* Look at the 5th line of the beautiful data in the JSON viewer
* **"sightings [20]"** is the array that contains the data.
* The [20] means there are 20 objects in the array.
* The 0 immediately below "sightings [20]" is the FIRST object in the array
* So, you have 20 objects numbered 0-19
* Each object will contain the same elements of data (shape, date, city, etc)

## Install it

* `git clone https://github.com/mykle1/MMM-UFO` into the `~/MagicMirror/modules` directory.

## Config.js entry and options

    {
        module: 'MMM-UFO',
        position: 'top_left',
        config: {
			city: "New York",
			state: "NY",
			useHeader: true,           // false if you don't want a header
			header: "Loading UFO's!",  // Any text you want
			maxWidth: "250px",
        }
    },
	
## Use a good text editor or you'll be sorry

There are many. I prefer https://notepad-plus-plus.org/
	
## The Big 3

The three files you will be viewing and editing are

* MMM-UFO.js
* MMM-UFO.css
* node_helper

I've commented the files where I thought it necessary. The MMM-UFO.css file isn't necessary at
all for the module to work but you'll see how it works by comparing the element entries
in the MMM-UFO.js file. The node_helper.js file is the simplest form of a standard node_helper
and it only needs to be modified slightly to be used in another module of similar requirements.

## Have JSON Viewer and MMM-UFO.js open at the same time

* Side by side is best
* This way you can see where the data in the JSON Viewer goes in the module file

## Try this test

See if you can add the "_id" element (Look at the JSON Viewer data) to the MMM-UFO.js
so that it displays as the other elements display. You can do it!

## That's all for now

I didn't have the benefit of a tutorial like this. You lucky son's of bitches!

## I can curse all I want

* It's my readme file

## Peace!
