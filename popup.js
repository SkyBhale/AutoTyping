let intervalId; // Variable to hold the interval ID

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('autoTypeButton').addEventListener('click', function() {
        
        if (intervalId) {
            clearInterval(intervalId);
        }

        // function to make sure that it types at 3 clicks per second
        intervalId = setInterval(() => {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs.length > 0) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "autoType" }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.error(chrome.runtime.lastError.message);
                        } else {
                            console.log(response.status); 
                        }
                    });
                }
            });
        }, 333); //Change this value in seconds.
    });

});