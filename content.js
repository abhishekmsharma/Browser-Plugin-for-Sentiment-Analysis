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
        for (var i = 0; i < no_of_reviews; i++) {
            string_to_return = string_to_return + "Review " + (i + 1) + ": \n" + review_ratings[i].innerText + "\n" + "Posted on: " + review_dates[i].innerText + "\n \n" + reviews[i].innerText;
            string_to_return = string_to_return + "\n------------ \n";
        }
        alert(string_to_return);

        function makeHttpObject() {
            try {return new XMLHttpRequest();}
            catch (error) {}
            try {return new ActiveXObject("Msxml2.XMLHTTP");}
            catch (error) {}
            try {return new ActiveXObject("Microsoft.XMLHTTP");}
            catch (error) {}

            throw new Error("Could not create HTTP request object.");
        }
        var request = makeHttpObject();
        request.open("GET", all_reviews, true);
        request.send(null);
        request.onreadystatechange = function() {
            // if (request.readyState === 4) {
                alert("in if");
                var doc_type = document.implementation.createDocumentType( 'html', '', '');
                var dom = document.implementation.createDocument('', 'html', doc_type);
                dom.innerHTML = request.responseText;
                alert(request.responseText);
                alert(typeof(dom));
                alert(typeof(request.responseText));
            // }
        };

        if (all_reviews != null) {
            alert(all_reviews);
        }
        sendResponse(string_to_return);
    }
});