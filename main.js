/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

/*
A simple node.js application intended to blink the onboard LED on the Intel based development boards such as the Intel(R) Galileo and Edison with Arduino breakout board.

MRAA - Low Level Skeleton Library for Communication on GNU/Linux platforms
Library in C/C++ to interface with Galileo & other Intel platforms, in a structured and sane API with port nanmes/numbering that match boards & with bindings to javascript & python.

Steps for installing MRAA & UPM Library on Intel IoT Platform with IoTDevKit Linux* image
Using a ssh client: 
1. echo "src maa-upm http://iotdk.intel.com/repos/1.1/intelgalactic" > /etc/opkg/intel-iotdk.conf
2. opkg update
3. opkg upgrade

Article: https://software.intel.com/en-us/html5/articles/intel-xdk-iot-edition-nodejs-templates
*/
var intensity = 990;
var maxintensity = 1000;
var minintensity = 0;
var maxvolume = 1;
var minvolume = 0;
var value = (intensity/maxintensity) * maxvolume;
var f = 1000 - (value * 1000);
var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
//var myOnboardLed = new mraa.Gpio(3, false, true); //LED hooked up to digital pin (or built in pin on Galileo Gen1)
var LEDBlue = new mraa.Gpio(4);
var LEDRed = new mraa.Gpio(8);
var LEDGreen = new mraa.Gpio(7);
var pwm3 = new mraa.Pwm(3);
pwm3.enable(true);
//set the period in microseconds.
pwm3.period_us(5000);//LED hooked up to digital pin 13 (or built in pin on Intel Galileo Gen2 as well as Intel Edison)
LEDBlue.dir(mraa.DIR_OUT);
LEDRed.dir(mraa.DIR_OUT);
LEDGreen.dir(mraa.DIR_OUT);
var ledState = true; //Boolean to hold the state of Led
//buzzerActivity();
periodicActivity();
console.log(value);
console.log(f);//call the periodicActivity function

function buzzerActivity(){
    pwm3.write(value);
    }

function periodicActivity(){
    if(value<=0.2) {
  LEDBlue.write(ledState?1:0);
        ledState = !ledState;
    setTimeout(periodicActivity, f);}
    else if (value>0.2 && value<=0.4) {
    LEDRed.write(ledState?1:0);
        LEDBlue.write(ledState?1:0);
    ledState = !ledState;
    setTimeout(periodicActivity, f);}
    else {
    LEDGreen.write(ledState?1:0);
        LEDBlue.write(ledState?1:0);
        LEDRed.write(ledState?1:0);
        ledState = !ledState;
    setTimeout(periodicActivity, f);}
    //buzzer.write(ledState?1:0);//if ledState is true then write a '1' (high) otherwise write a '0' (low)
  //ledState = !ledState; //invert the ledState
  //setTimeout(periodicActivity,100); //call the indicated function after 1 second (1000 milliseconds)
}
