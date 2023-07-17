/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const tweetData = {
    user: {
      name: 'Newton',
      avatars: 'https://i.imgur.com/73hZDYK.png',
      handle: '@SirIsaac'
    },
    content: {
      text: 'If I have seen further it is by standing on the shoulders of giants'
    },
    created_at: 1461116232227
  };

  // Fake data taken from initial-tweets.json
  /*
  const data = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac'
      },
      content: {
        text: 'If I have seen further it is by standing on the shoulders of giants'
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd'
      },
      content: {
        text: 'Je pense , donc je suis'
      },
      created_at: 1461113959088
    }
  ];
*/
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

  const $renderTweets = function (array) {
    for (const item of array) {
      //calling createTweet on each tweet
      const $singleTweet = $createTweetElement(item);
      //appending each tweet to the tweet-container on the page
      $('#tweets-container').append($singleTweet);
    }
  };
  // $renderTweets(data);

  const $form = $('form');
  const $tweetInput = $('#tweet-text');

  $form.submit(function (event) {
    event.preventDefault();

    const $tweetValue = $tweetInput.val();
    console.log($tweetValue);
    $(this).serialize();
    // console.log($(this).serialize());
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
