# Smart mirror application

## So this is a Voice controlled Smart Mirror. Ofc it also has radio.

Pictures of the entire physical project can be found on my [facebook](https://www.facebook.com/snaggedagge/media_set?set=a.10156777749778112&type=3)


### Semi-updated documentation:

Mirror is nowadays running Amazon Alexa with KittAI / Snowboy third party software for Keywor detection, 
so it is woken up by keyword "Mirror", instead of "Alexa".

* Also Amazon smart screen SDK has been installed, 
so things you ask alexa for is also displayed natively in an Iframe of the smartmirror-ui app.

Amazon Alexa code is not in VCS, since it basically is the default 
amazon code I have checked out and tweaked to get callbacks for volume changes, wake up keywords etc.

* I have motion detection installed, so screen powers down after 5 min 
of inactivity and consumes about 30W of power. 
Instantly wakes up if someone walks by.

* Hand gestures was tested, and got it working half decently. 
But RPI could not power the Machine Learning bits, so the requirement of 
another computer to do it made the feature feel worthless. Maybe new tries in future!

* Weather data
* Random quote of the day
* Awesome RGB lights ofc
* Anything that comes with Alexa, which is a lot

### DOCUMENTATION IS OLD, QUITE A BIT HAS HAPPENED:

### Features

* Voice controlled system
* Weather data
* Google Calendar data
* Radio
* Selfie mode with builtin camera
* Random quote of the day
* Awesome RGB lights ofc
* Alarm with radio. Heightening sound over time if wanted

### Features coming up?
* Calendar data from FB aswell?
* Latest emails and support to read them
* Motion detection. I actually already have this software, but i need to get the opencv installed and configured for the RPI
* Gesture controls using camera
* Face recognition


### Software result
![alt text](https://github.com/snaggedagge/smartmirror/blob/master/images/software.JPG?raw=true)

### Result in reality
![alt text](https://github.com/snaggedagge/smartmirror/blob/master/images/reality.jpg?raw=true)
