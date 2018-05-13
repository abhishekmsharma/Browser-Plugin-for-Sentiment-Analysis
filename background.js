function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);

    var data = new FormData();
    data.append('ratings', string_value[0]);
    data.append('dates', string_value[1]);
    data.append('comments', string_value[2]);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://abhishekmsharma.com/test.html', true);
    xhr.onload = function () {
        // do something to response
        console.log(this.responseText);
    };
    xhr.send(data);
}

// Can we do this ? http://php.net/manual/en/reserved.variables.post.php

chrome.browserAction.onClicked.addListener(function (tab) {
    if (0===0) {
		console.log("Amazon product page detected");
        chrome.tabs.sendMessage(tab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
		chrome.tabs.sendMessage(tab.id, {text: 'get_home_page_reviews'}, receiveFromSource);
    }
});