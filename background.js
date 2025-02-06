// background.js

// This script runs in the background and can handle events, alarms, and other background tasks

// Example: Listening for a browser action click
// chrome.browserAction.onClicked.addListener(function(tab) {
//     console.log('Browser action clicked!');
//     // Perform some action
// });

// // Example: Setting an alarm
// chrome.alarms.create('myAlarm', { delayInMinutes: 1 });

// chrome.alarms.onAlarm.addListener(function(alarm) {
//     if (alarm.name === 'myAlarm') {
//         console.log('Alarm triggered!');
//         // Perform some action
//     }
// });

chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension installed!');
    // Perform some action
});