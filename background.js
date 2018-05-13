var return_string;

function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
    return_string = string_value;
}

// Can we do this ? http://php.net/manual/en/reserved.variables.post.php

chrome.browserAction.onClicked.addListener(function (tab) {
    if (0===0) {
		console.log("Amazon product page detected");
        chrome.tabs.sendMessage(tab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
		chrome.tabs.sendMessage(tab.id, {text: 'get_home_page_reviews'}, receiveFromSource);
    }
});


chrome.runtime.onMessage.addListener( function(request,sender,sendResponse)
{
    var query = { active: true, currentWindow: true };
    function callback(tabs) {
        var currentTab = tabs[0];
        console.log(currentTab);
        if( request.amazon_action === "get_all_reviews_string" )
        {
            chrome.tabs.sendMessage(currentTab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
        }
    }
    chrome.tabs.query(query, callback);
    sendResponse(return_string);
}
);