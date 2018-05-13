var src="https://www.gstatic.com/charts/loader.js";
function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
dynamicallyLoadScript(src);

var a=0;
var arr_rating_date = [];

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

function receiveReviewsFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
	document.getElementById('review_string').textContent = string_value;
	if (string_value != null) {
        var ratings_date = string_value.split("%");
        for (var i = 0; i < ratings_date.length; i++) {
            var temp_arr = ratings_date[i].split("$");
            arr_rating_date.push(temp_arr);
        }

        document.getElementById('review_string').textContent = arr_rating_date;
        google.charts.load("current", {"packages": ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        var temp_arr = [];
        for (var j=0; j<5; j++) {
            temp_arr[j] = arr_rating_date[j];
        }
        console.log(temp_arr);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(temp_arr);

            var options = {
                title: "Amazon Ratings vs Review Date",
                curveType: "line",
                legend: {position: "bottom"},
                vAxis: {
                    viewWindowMode: 'explicit',
                    viewWindow: {
                        max: 5,
                        min: 1
                    }
                }

            };

            var chart = new google.visualization.LineChart(document.getElementById("curve_chart"));

            chart.draw(data, options);
        }

    }
	
}

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
	chrome.runtime.sendMessage({amazon_action: "get_home_page_reviews"},receiveReviewsFromSource);
}



document.getElementById('do-count').onclick = count;
document.getElementById('get-reviews').onclick = get_all_reviews_string;
document.getElementById('get-homepage-reviews').onclick = get_home_page_reviews;