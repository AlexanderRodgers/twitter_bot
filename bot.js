console.log('bot is starting.');

let Twit = require('twit');

let config = require('./config');

var T = new Twit(config);

let newTweet = () => {
   
   let tweet = {};
   let dateObj = new Date();
   let dayOfWeek = dateObj.getDay();
   let date = dateObj.getDate();
   if (dayOfWeek === 5 && date === 13) {
      tweet.status = 'Yes.'
   } else {
      tweet.status = 'No.'
   }
   
   let response = (err, data, response) => {
      if (err) {
         console.log('something went wrong!');
      } else {
         console.log(data.status);
      }
   }
   
   T.post('statuses/update', tweet, response);
}

newTweet();