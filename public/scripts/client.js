/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
					<p>${new Date(data.created_at).toDateString()}</p>
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
      $('#tweets-container').append($singleTweet);
    }
  };

  $renderTweets(data);

  //appending the tweet to the tweet-container on the page
});
