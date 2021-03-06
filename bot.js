console.log('bot is starting.');

let Twit = require('twit');
let config = require('./config');
let localDate = require('@js-joda/core').LocalDate;
let ChronoUnit = require('@js-joda/core').ChronoUnit;
let ZoneOffset = require('@js-joda/core').ZoneOffset;

let T = new Twit(config);

let isItFri13th = () => {
   let dateObj = new Date();
   let dayOfWeek = dateObj.getDay();
   let date = dateObj.getDate();

   let daysBetween = localDate.ofEpochDay(0).until(localDate.now(ZoneOffset.UTC), ChronoUnit.DAYS);
   // Twitter API prevents tweeting the same status twice in a row so that means the 'No.' needs to be modified to include a 
   // blank character every other day. 
   if (dayOfWeek === 5 && date === 13) {
      // It will never be friday the 13th twice in a row.
      return 'Yes.';
   } else {
      if (daysBetween % 2 === 0) {
         return 'No.';
      } else {
         return 'No.‎ㅤ';
      }
   }
}

let newTweet = () => {

   let response = (err, data, response) => {
      if (err) {
         console.log('something went wrong!');
      } else {
         console.log(data.text);
      }
   }

   let tweet = {};
   tweet.status = isItFri13th();
      
   T.post('statuses/update', tweet, response);
}

newTweet();