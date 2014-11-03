'use strict';

var graph = require('fbgraph'),
    likedPosts = [],
    lastPost = null,
    _accessToken = 'CAACEdEose0cBAMzoMOrv66I0ucgyZCnFrRQZAyAfwmGCZCPA04fSZAvUB5aFF90AilRNlJ5xYkZACtkAWRG3KjkqMuhHyYbQm6ziYMBEnDuIL8nPToJ2yEEodGa6GdnV48pY4NMpCVdcxCiZAwXpd84VrdEiGctZCVZAL5ja2up9PePnZCDwFdAqgV3qoTC38t8esUZAl0MEdIkQiwYaQ3Grjr';

graph.setAccessToken(_accessToken);

/*
graph.extendAccessToken({
  'access_token': _accessToken
}, function (err, res) {
  console.log(res);
});*/


setInterval(function() {

  console.log('Checking for new page posts..\n');

  graph.get('/119269378147423/feed', function (err, res) {
    if (res && res.data) {
      lastPost = res.data[0];
      if (likedPosts.indexOf(lastPost.id) < 0)
      {
        // like post and add its ID to likedPosts
        console.log('\nI haven\'t liked post "' + lastPost.message + '". I\'ll do it now.\n');

        graph.post(lastPost.id + '/likes', function (err, res) {
          if (res.data === 'true') {
            console.log('Done!\n\n');

            likedPosts.push(lastPost.id);
          }
        });
      } else {
        console.log('I have already liked post "' + lastPost.message + '"...\n\n');
      }
    }

  });

}, 2300);
