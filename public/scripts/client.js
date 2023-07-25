/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
/* global $  document timeago */
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
					<p class="user-handle">${data.user.handle}</p>
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
    $('.tweets').empty();
    for (const item of array) {
      //calling createTweet on each tweet
      const $singleTweet = $createTweetElement(item);
      //appending each tweet to the tweets on the page
      $('#tweets').prepend($singleTweet);
    }
  };
  //creating the error messages
  const $error = $('<article>').addClass('error');
  const $errMessage1 = $(`<p>🛑 Please enter a thought!!! 🛑</p>`).addClass('errMessage1');
  const $errMessage2 = $(`<p>🛑 maximum tweet length exceeded 🛑</p>`).addClass('errMessage12');

  const $errorMessage = function (message) {
    $error.append(message);
    $('.tweets-container').prepend($error);
    if ($('.error').is(':hidden')) {
      $('.error').slideDown('slow', function () {});
    }
  };

  //using Ajax to makea get request from '/tweets'
  const loadTweets = function () {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      type: 'GET',
      dataType: 'json',
      success: (response) => {
        $renderTweets(response);
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });
  };
  loadTweets();

  //Posting a tweet using the form

  const $form = $('form'); //getting the form from the dom
  const $tweetInput = $('#tweet-text');

  $form.submit(function (event) {
    event.preventDefault();
    const $tweetValue = $tweetInput.val();

    /// Validations are checked when the user presses the  Submit button

    //form validation
    //checking if the form is empty

    if (!$tweetValue) {
      $errorMessage($errMessage1);
      return;
    } else {
      // $removeErrorMessage($errMessage1);
      $('.error').hide();
    }
    //checking if the tweet is longer than 140 characters
    if ($tweetValue.length > 140) {
      $errorMessage($errMessage2);
      return;
    } else {
      $('.error').hide();
      // $removeErrorMessage($errMessage2);
    }

    const $data = $(this).serialize();

    //posting the tweet to the page
    $.ajax({
      url: '/tweets',
      type: 'POST',
      data: $data,
      success: () => {
        // reset the form input
        $form.trigger('reset');
        //reset the counter
        $('.counter').text(140);
        //reloads the tweets from server to page
        loadTweets();
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });
  });
});
