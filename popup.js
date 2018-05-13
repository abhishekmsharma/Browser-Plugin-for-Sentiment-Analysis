var a=0;
function count() {
    a++;
	console.log("Incrementing a");
    document.getElementById('demo').textContent = a;
}

function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
	document.getElementById('demo').textContent = 'hello';
	document.getElementById('review_string').textContent = string_value;
}

// Can we do this ? http://php.net/manual/en/reserved.variables.post.php

function getReviews() {
	chrome.tabs.sendMessage(tab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
	chrome.tabs.executeScript({
    file: 'alert.js'
  }); 
}

function test_function () {
    if (0===0) {
		console.log("Amazon product page detected");
        chrome.tabs.sendMessage(tab.id, {text: 'get_all_reviews_string'}, receiveFromSource);
		chrome.tabs.sendMessage(tab.id, {text: 'get_home_page_reviews'}, receiveFromSource);
    }
}

function get_all_reviews_string() {
	
    chrome.runtime.sendMessage({amazon_action: "get_all_reviews_string"},receiveFromSource);
	//chrome.browserAction.onClick(tab);
}

function get_home_page_reviews() {
	chrome.runtime.sendMessage({amazon_action: "get_home_page_reviews"},receiveFromSource);
}

document.getElementById('do-count').onclick = count;
document.getElementById('get-reviews').onclick = get_all_reviews_string;
document.getElementById('get-homepage-reviews').onclick = get_home_page_reviews;