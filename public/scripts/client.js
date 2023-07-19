/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* global $  document timeago alert*/
$(document).ready(function () {
  //function to escape insecure text and prevent cross-site scripting
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //function to create a new tweetstructure and display it
  const $createTweetElement = function (data) {
    for (const info in data) {
      return `<article class="tweet" >
				<header class="tweet-header">
					<div>
						<img src=${data.user.avatars} alt="profile-pic">
						<p>${data.user.name}</p>
					</div>
					<p>${data.user.handle}</p>
				</header>
				<p class="tweet-content">${escape(data.content.text)}</p>
				<footer>
					<p>${timeago.format(new Date(data.created_at).toDateString())}</p>
					<div>
						<i class="fa-solid fa-flag icon"></i>
						<i class="fa-solid fa-retweet icon"></i>
						<i class="fa-sharp fa-solid fa-heart icon"></i>
					</div>
				</footer>
			</article>
`;
    }
  };

  //function to display all tweets from users on the page
  const $renderTweets = function (array) {
    $('.tweets-container').empty();
    for (const item of array) {
      //calling createTweet on each tweet
      const $singleTweet = $createTweetElement(item);
      //appending each tweet to the tweet-container on the page
      $('#tweets-container').prepend($singleTweet);
    }
  };
  //creating the error messages
  const $error = $('<article>').addClass('error');
  const $errMessage1 = $(`<p>🛑 Please enter a thought!!! 🛑</p>`);
  const $errMessage2 = $(`<p>🛑 maximum tweet length exceeded 🛑</p>`);

  const $errorMessage = function (message) {
    $error.append(message);
    $('.container').prepend($error);

    // $error.slideDown(1000, function () {
    //   console.log('finished');
    // });
  };

  //function to remove error
  const $removeErrorMessage = function () {
    $('.error').empty();
  };

  //using Ajax to makea get request from '/tweets'
  const loadTweets = function () {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'GET',
      dataType: 'json',
      success: (response) => {
        $renderTweets(response);
      }
    });
  };
  loadTweets();

  //Posting a tweet using the form

  const $form = $('form'); //getting the form from the dom
  const $tweetInput = $('#tweet-text');

  $form.submit(function (event) {
    event.preventDefault();
    //remove error on submit of the form
    $removeErrorMessage();

    const $tweetValue = $tweetInput.val();

    //form validation
    //checking if the form is empty
    if (!$tweetValue) {
      $errorMessage($errMessage1);
      return;
    }
    //checking if the tweet isi longer than 140 characters
    if ($tweetValue.length > 140) {
      $errorMessage($errMessage2);
      return;
    }

    //posting the tweet to the page
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $(this).serialize(),
      success: (data) => {
        console.log(data);
        loadTweets();
      }
    });
  });
});
