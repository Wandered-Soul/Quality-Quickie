// Define a keyboard shortcut to toggle video quality
chrome.commands.onCommand.addListener(function(command) {
if (command == "toggle-quality") {
toggleQuality();
}
});

// Function to toggle video quality
function toggleQuality() {
var video = document.getElementsByTagName("video")[0];
var currentQuality = video.getPlaybackQuality();
var availableQualities = video.getAvailableQualityLevels();
var currentIndex = availableQualities.indexOf(currentQuality);
var nextIndex = (currentIndex + 1) % availableQualities.length;
var nextQuality = availableQualities[nextIndex];
video.setPlaybackQuality(nextQuality);

// Show notification message with next selected quality
var message = "Next quality: " + nextQuality;
var options = {
type: "basic",
iconUrl: chrome.runtime.getURL("icon.png"),
title: "Video Quality",
message: message
};
chrome.notifications.create(options);
}

// Register keyboard shortcut for toggle-quality command
chrome.commands.update({
command: "toggle-quality",
description: "Toggle video quality",
suggested_key: {
default: "Ctrl+Shift+Q",
mac: "MacCtrl+Shift+Q"
}
});

// Listen for keyboard shortcut events
chrome.commands.onCommand.addListener(function(command) {
if (command == "toggle-quality") {
toggleQuality();
}
});

// Show notification message when extension is installed
chrome.runtime.onInstalled.addListener(function(details) {
if (details.reason == "install") {
var message = "YouTube Quality Toggler installed!";
var options = {
type: "basic",
iconUrl: chrome.runtime.getURL("icon.png"),
title: "YouTube Quality Toggler",
message: message
};
chrome.notifications.create(options);
}
});

// Show notification message when extension is updated
chrome.runtime.onInstalled.addListener(function(details) {
if (details.reason == "update") {
var message = "YouTube Quality Toggler updated to version " + chrome.runtime.getManifest().version + "!";
var options = {
type: "basic",
iconUrl: chrome.runtime.getURL("icon.png"),
title: "YouTube Quality Toggler",
message: message
};
chrome.notifications.create(options);
}
});

// Set default options for notifications
chrome.notifications.onClicked.addListener(function() {
chrome.notifications.clear("notification");
});

chrome.notifications.onClosed.addListener(function() {
chrome.notifications.clear("notification");
});
