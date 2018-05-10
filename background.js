var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?amazon\.com\/gp\/product/;

function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
}

chrome.browserAction.onClicked.addListener(function (tab) {
    if (0===0) {
		console.log("Amazon product page detected");
        chrome.tabs.sendMessage(tab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
		chrome.tabs.sendMessage(tab.id, {text: 'get_home_page_reviews'}, receiveFromSource);
    }
});

chrome.runtime.onmessage.addListener(function(response,sender,sendResponse){
    alert("Finally here");
    alert(response);
});