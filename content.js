// Listening for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {

    if (msg.text === 'get_all_reviews_string') {
        //sendResponse(document.all[0].outerHTML);
        console.log("Trying the get all reviews string");
        alert(document.getElementById('acrCustomerReviewText').innerHTML);
        sendResponse(document.getElementById('acrCustomerReviewText').innerHTML);
    }

    else if (msg.text == 'get_home_page_reviews') {
        var reviews = document.getElementsByClassName('a-expander-content a-expander-partial-collapse-content');
        alert("Reviews is " + reviews);
        if (reviews === undefined) {
            reviews = document.getElementsByClassName('a-expander-collapsed-height a-row a-expander-container a-expander-partial-collapse-container');
        }
        var no_of_reviews = reviews.length;
        var all_reviews = document.getElementById('dp-summary-see-all-reviews'); // To fetch url of all reviews.
        var review_ratings = document.getElementsByClassName('review-rating');
        var review_dates = document.getElementsByClassName('review-date');
        var string_to_return = "Number of reviews on homepage: " + no_of_reviews + "\n------------ \n";

        for (var i = 0; i < review_dates.length; i++) {
            string_to_return = string_to_return + "Review " + (i + 1) + ": \n" + review_ratings[i].innerText + "\n" + "Posted on: " + review_dates[i].innerText + "\n \n" + reviews[i].innerText;
            string_to_return = string_to_return + "\n------------ \n";
        }
        alert(string_to_return);
        var ratings = [];
        for (var i=0; i<review_dates.length; i++) {
            ratings.push((review_ratings[i].innerText.substring(0,5)).match(/\d+([.]\d+)?/g));
        }
        alert(ratings);
        var dates = [];
        for (var i=0; i<review_dates.length; i++) {
            dates.push(review_dates[i].innerText);
        }
        alert(dates);

        sendResponse(string_to_return);
    }
});