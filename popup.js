var goole_visualization_src="https://www.gstatic.com/charts/loader.js";
var sentiment_src="sentiment.js";
function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL

    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
dynamicallyLoadScript(goole_visualization_src);
dynamicallyLoadScript(sentiment_src);

var a=0;
var arr_rating_date = [];

function count() {
    a++;
	console.log("Incrementing a");
    document.getElementById('demo').textContent = a;
}

function convertDate(string_date) {
	var formatted_date = string_date.replace(",","");
	var date_array = formatted_date.split(" ");
	var month_number = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(date_array[0].toLowerCase()) + 1;
	month_num = "" + month_number;
	var pad = "00";
	var final_date = date_array[2] + (pad.substring(0, pad.length - month_num.length)+month_num) + (pad.substring(0, pad.length - date_array[1].length)+date_array[1]);
	return final_date;
}

function receiveFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
	document.getElementById('demo').textContent = 'hello';
	document.getElementById('review_string').textContent = string_value;
}

function receiveReviewsFromSource(string_value) {
	
	var sentimood = new Sentimood();
	var analysis = sentimood.analyze('Node is good');
	console.log("Analysis: " + analysis.score);
	
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
            temp_arr[j] = [convertDate(arr_rating_date[j][0]), parseInt(arr_rating_date[j][1])];
        }
		temp_arr.sort(function(a,b) {
        return a[0]-b[0]
		});
		temp_arr.splice(0, 0, ["Dates", "Ratings"]);
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