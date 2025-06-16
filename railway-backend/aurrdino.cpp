#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

const char* ssid = "iPhone";          // replace with your WiFi SSID
const char* password = "0987654321";  // replace with your WiFi Password

ESP8266WebServer server(80);

// Using GPIO numbers directly
struct Station {
  String name;
  int pin;
};

Station stations[] = {
  {"Dehradun", 16},    // D0
  {"Haridwar", 5},     // D1
  {"Rishikesh", 4},    // D2
  {"Roorkee", 14},     // D5
  {"Delhi", 12},       // D6
  {"New Delhi", 13},   // D7
  {"Lucknow", 15}      // D8
};

const int numStations = sizeof(stations) / sizeof(stations[0]);

void setup() {
  Serial.begin(115200);

  for(int i = 0; i < numStations; i++) {
    pinMode(stations[i].pin, OUTPUT);
    digitalWrite(stations[i].pin, LOW); // All OFF initially
  }

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println("Connected to WiFi!");
  Serial.print("ESP8266 IP Address: ");
  Serial.println(WiFi.localIP());

  server.on("/path", HTTP_POST, handlePath);
  server.begin();
  Serial.println("Server started.");
}

void handlePath() {
  if (server.hasArg("plain")) {
    String body = server.arg("plain");
    Serial.println("Received JSON:");
    Serial.println(body);

    StaticJsonDocument<512> doc;
    DeserializationError error = deserializeJson(doc, body);

    if (error) {
      Serial.println("JSON Parse Error");
      server.send(400, "text/plain", "Invalid JSON");
      return;
    }

    JsonArray path = doc["path"].as<JsonArray>();

    // Turn OFF all LEDs
    for(int i = 0; i < numStations; i++) {
      digitalWrite(stations[i].pin, LOW);
    }

    // Turn ON LEDs for stations in path
    for (JsonVariant v : path) {
      String stationName = v.as<String>();
      for(int i = 0; i < numStations; i++) {
        if (stations[i].name == stationName) {
          digitalWrite(stations[i].pin, HIGH);
          Serial.println("LED ON: " + stationName);
        }
      }
    }

    server.send(200, "application/json", "{\"status\":\"Path received and LEDs updated\"}");
  } else {
    server.send(400, "text/plain", "No JSON body received");
  }
}

void loop() {
  server.handleClient();
}
