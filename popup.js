var goole_visualization_src="https://www.gstatic.com/charts/loader.js";
var sentiment_src="sentiment.js";
function dynamicallyLoadScript(url) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = url; // Set it's src to the provided URL
    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
dynamicallyLoadScript(goole_visualization_src);
dynamicallyLoadScript(sentiment_src);

var arr_rating_date = [];
var MAX_REVIEWS = 5;

function convertDate(string_date) {
	var formatted_date = string_date.replace(",","");
	var date_array = formatted_date.split(" ");
	var month_number = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(date_array[0].toLowerCase()) + 1;
	month_num = "" + month_number;
	var pad = "00";
	var final_date = date_array[2] + (pad.substring(0, pad.length - month_num.length)+month_num) + (pad.substring(0, pad.length - date_array[1].length)+date_array[1]);
	return final_date;
}

function formatDateString(date_int){
    console.log("in format date string");
    let date_in = date_int.toString();
    console.log(date_in);
    let dd = date_in.substr(6,2);
    console.log(date_in);
    let mm = date_in.substr(4,2);
    let yyyy = date_in.substr(0,4);
    return mm+"/"+dd+"/"+yyyy;
}


function receiveSentimentFromSource(string_value) {
	var sentimood = new Sentimood();
	console.log("Reviews: " + string_value);
	var analysis = sentimood.analyze(string_value);
	console.log("Positive score: " + analysis.score);
	document.getElementById('sentiment_text').textContent = "Sentiment score: " + analysis.score;
}

function receiveReviewsFromSource(string_value) {
    console.log('Returned string:\n' + string_value);
	if (string_value != null) {
        var ratings_date = string_value.split("%");
        for (var i = 0; i < ratings_date.length; i++) {
            var temp_arr = ratings_date[i].split("$");
            arr_rating_date.push(temp_arr);
        }
        google.charts.load("current", {"packages": ["corechart"]});
        google.charts.setOnLoadCallback(drawChart);
        var temp_arr = [];
        for (var j=0; j<MAX_REVIEWS; j++) {
            temp_arr[j] = [convertDate(arr_rating_date[j][0]), parseInt(arr_rating_date[j][1])];
        }
		temp_arr.sort(function(a,b) {
			return a[0]-b[0]
		});
        for (var j=0; j<MAX_REVIEWS; j++) {
            temp_arr[j] = [formatDateString(temp_arr[j][0]), temp_arr[j][1]];
        }
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

function get_graph() {
	chrome.runtime.sendMessage({amazon_action: "get_graph"},receiveReviewsFromSource);
}

function get_sentiment_score() {
	chrome.runtime.sendMessage({amazon_action: "get_sentiment_score"},receiveSentimentFromSource);
}

document.getElementById('get-homepage-reviews').onclick = get_graph;
document.getElementById('get-sentiment-score').onclick = get_sentiment_score;