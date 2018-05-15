var return_string;

function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
    return_string = string_value;
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse)
{
    var query = { active: true, currentWindow: true };
    function callback(tabs) {
        var currentTab = tabs[0];
        console.log(currentTab);
        if (request.amazon_action === "get_graph") {
			chrome.tabs.sendMessage(currentTab.id, {text: 'get_graph'}, receiveFromSource);
		}
		else if (request.amazon_action === "get_sentiment_score") {
			chrome.tabs.sendMessage(currentTab.id, {text: 'get_sentiment_score'}, receiveFromSource);
		}
    }
	var currentTime = new Date().getTime();
	while (currentTime + 2000 >= new Date().getTime()) {}
    chrome.tabs.query(query, callback);
	console.log("Returning: " + return_string);
    sendResponse(return_string);
});