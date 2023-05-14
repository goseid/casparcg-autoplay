# casparcg-autoplay

This is a node.js script that plays a template when CasparCG is available. It can be useful to start a playout automatically when the server starts.

## Configuration

Check or set the constants ADDRESS, PORT, and TEMPLATE. Initially ADDRESS is set to localhost and port is set to 5250 which is the default for the AAMCP protocol on CasparCG servers.

If you leave the TEMPLATE set to "" and run the script it will connect to the CasparCG server and log the templates that are available. You can cut and past the template you would like to use into the TEMPLATE constant in the code.

**Note:** This does require that the CasparCG scanner.exe be run for Caspar to be able to respond with the available templates.

The casparcg-autoplay script will try to connect immediately. If the CasparCG server isn't running yet, ths script will keep trying to connect and when a connection is established it will run the template specified.

## Launching at startup

I recommend using [PM2](https://pm2.keymetrics.io/) to start this script automatically. The free version of PM2 has all the functionality needed. More information is available from [https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)

If you have npm installed PM2 can be installed with `npm install pm2 -g` You may need to use `sudo` before that command depending on your environment.

To start autoplay with PM2 and save it to startup automatically, make sure you are on the command line in the directory where autoplay.js is located and follow these instructions:

`pm2 start autoplay.js --name CasparCG-autoplay`

`pm2 save` - saves the process list to be used at startup

`pm2 startup` - this generates a command for you to cut and paste into the command line to enable PM2 to automatically start the saved process list at startup. More info is available [here](https://pm2.keymetrics.io/docs/usage/startup/)

## Issues

Feel free to submit an issue if this doesn't work right for you or if you'd like some functionality added. It is very basic but does what I needed.
