/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // const tweetData = {
  //   user: {
  //     name: 'Newton',
  //     avatars: 'https://i.imgur.com/73hZDYK.png',
  //     handle: '@SirIsaac'
  //   },
  //   content: {
  //     text: 'If I have seen further it is by standing on the shoulders of giants'
  //   },
  //   created_at: 1461116232227
  // };

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
				<p class="tweet-content">${data.content.text}</p>
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

  // const $tweet = $createTweetElement(tweetData);

  //function to display all tweets from users on the page
  const $renderTweets = function (array) {
    for (const item of array) {
      //calling createTweet on each tweet
      const $singleTweet = $createTweetElement(item);
      //appending each tweet to the tweet-container on the page
      $('#tweets-container').append($singleTweet);
    }
  };
  // $renderTweets(data);

  //Posting a tweet using the form
  const $form = $('form');
  const $tweetInput = $('#tweet-text');

  $form.submit(function (event) {
    event.preventDefault();

    const $tweetValue = $tweetInput.val();

    $(this).serialize();

    //form validation
    //checking if the form is empty
    if (!$tweetValue) {
      alert('please input a message');
      return;
    }

    //checking if the tweet isi longer than 140 characters
    if ($tweetValue.length > 140) {
      alert('maximum tweet length exceeded');
      return;
    }

    //sbmittingthe tweet via Ajax
    $.ajax({
      url: '/tweets',
      success: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log('error', error);
      }
    });
  });

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
});
