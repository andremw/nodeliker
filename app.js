'use strict';

var graph = require('fbgraph'),
    notifier = require('node-notifier'),
    likedPosts = [],
    lastPost = null,
    _accessToken = '';

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
    if (err) {
      notifier.notify({
        title: 'Error!',
        message: 'Something went wrong: ' + err.message + '\nType: ' + err.type,
        time: 50000,
        wait: true
      });
    }
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
