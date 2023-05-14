# casparcg-autoplay

This is a node.js script that plays a template when CasparCG is available. It can be useful to start a playout automatically when the server starts.

## Configuration

Check or set the constants ADDRESS, PORT, and TEMPLATE. Initially ADDRESS is set to localhost and port is set to 5250 which is the default for the AAMCP protocol on CasparCG servers.

If you leave the TEMPLATE set to "" and run the script it will connect to the CasparCG server and log the templates that are available. You can cut and past the template you would like to use into the TEMPLATE constant in the code.

**Note:** This does require that the CasparCG scanner.exe be run for Caspar to be able to respond with the available templates.

The casparcg-autoplay script will try to connect immediately. If the CasparCG server isn't running yet, ths script will keep trying to connect and when a connection is established it will run the template specified.

## Issues

Feel free to submit an issue if this doesn't work right for you or if you'd like some functionality added. It is very basic but does what I needed.
