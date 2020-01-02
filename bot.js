console.log('bot is starting.');

let Twit = require('twit');

let config = require('./config');

let localDate = require('@js-joda/core').LocalDate;
let ChronoUnit = require('@js-joda/core').ChronoUnit;

let T = new Twit(config);

let newTweet = () => {
   
   let tweet = {};
   let dateObj = new Date();
   let dayOfWeek = dateObj.getDay();
   let date = dateObj.getDate();

   let daysBetween = localDate.ofEpochDay(0).until(localDate.now(), ChronoUnit.DAYS);
   // Twitter API prevents tweeting the same status twice in a row so that means the 'No.' needs to be modified to include a 
   // blank character every other day. 
   if (dayOfWeek === 5 && date === 13) {
      tweet.status = 'Yes.';
   } else {
      if (daysBetween % 2 === 0) {
         tweet.status = 'No.';
      } else {
         tweet.status = 'No.‎ㅤ';
      }
   }
   
   let response = (err, data, response) => {
      if (err) {
         console.log('something went wrong!');
      } else {
         console.log(data.status);
      }
   }
   
   // T.post('statuses/update', tweet, response);
}

newTweet();