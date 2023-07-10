$(document).ready(function () {
  $('textarea').on('input', function () {
    let inputTextNumber = $(this).val().length; // this refers to textarea and .val captures the input value
    let tweetCounter = 140 - inputTextNumber;
    $('output').first().text(tweetCounter);
    //logic to add class to counter for easy css manipulation
    if (tweetCounter < 0) {
      $('output').first().addClass('danger');
    } else {
      $('output').first().removeClass('danger');
    }
  });
});
