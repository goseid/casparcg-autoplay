const net = require("net");

const ADDRESS = "localhost"; // Hostname or IP address of CasparCG server
const PORT = 5250;

// When TEMPLATE is an empty string the script will log a list of templates that are available on the server
const TEMPLATE = ""; // Example "DIR/LOWER_THIRD"

let templateLoaded = false;
let timeout = false;

let client;

function connect() {
  client = new net.Socket();

  client.on("error", function (err) {
    if (err.code == "ECONNREFUSED") {
      timeout = true;
      console.error(
        `\x1b[33m`,
        `ERROR: Connection to ${ADDRESS}:${PORT} refused. Check ADDRESS, PORT, and firewall settings.`,
        `\x1b[0m`
      );
      reconnect();
    } else {
      console.error(`\x1b[33m`, "ERROR:", err.message, `\x1b[0m`);
      client.destroy();
    }
  });

  client.on("lookup", function (err, address, family, host) {
    if (!err) {
      console.log("ADDR lookup:", host, address);
    }
  });

  client.on("ready", function () {
    if (TEMPLATE.length == 0) {
      client.write("TLS\r\n");
    } else {
      client.write(`CG 1-1 ADD 1 ${TEMPLATE.replaceAll("/", "////")} 1\r\n`);
    }
  });

  client.on("data", function (data) {
    lines = data.toString().split("\r\n");
    switch (lines[0]) {
      case "200 TLS OK":
        console.log("\x1b[1m\nTemplates available:\x1b[0m");
        for (i = 1; i < lines.length; i++) {
          console.log(`${lines[i]}`);
        }
        break;
      case "202 CG OK":
        templateLoaded = true;
        console.log(`\x1b[1m Template ${TEMPLATE} loaded successfully.\x1b[0m`);
        client.end();
        process.exit();
        break;
      case "404 CG ADD FAILED":
        console.error(`\x1b[33m ERROR: Template ${TEMPLATE} not found.\x1b[0m`);
        break;
      default:
        console.log("Received:\n" + data);
        break;
    }
  });

  client.on("close", function () {
    console.log("Connection closed");
    this.destroy();
    if (!templateLoaded && !timeout) connect(); // Keep trying until successful
  });

  console.log("Attempting to connect to " + ADDRESS + ":" + PORT + "...");
  client.connect(PORT, ADDRESS, function () {
    console.log("Connected to " + ADDRESS + ":" + PORT);
  });
}
connect();

function reconnect() {
  client.end();
  client.destroy();
  client = null;
  setTimeout(() => {
    timeout = false;
    connect();
  }, 10000);
}
