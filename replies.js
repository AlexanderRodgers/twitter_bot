console.log('bot is starting.');
// I'm too lazy to properly split out the files.
let Twit = require('twit');
let config = require('./config');
let localDate = require('@js-joda/core').LocalDate;
let ChronoUnit = require('@js-joda/core').ChronoUnit;
let ZoneOffset = require('@js-joda/core').ZoneOffset;

let T = new Twit(config);

let mentions = ['@IsItFri13th', '@isitfri13th', '@Isitfri13th', '@IsitFri13th', '@isitFri13th'];

console.log('streaming');
var stream = T.stream('statuses/filter', { track: mentions });

stream.on('tweet', (tweet) => {
   console.log(tweet);
   let formattedText = tweet.text.toLowerCase();
   if (tweet.in_reply_to_screen_name === 'IsItFri13th' 
   && formattedText.includes('friday the 13th')) {
      newTweet(tweet);
   }
});

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

let newTweet = (tweet) => {

   let response = (err, data, response) => {
      if (err) {
         console.log('something went wrong!');
      } else {
         console.log(data.text);
      }
   }
   
   T.post('statuses/update', {
      status: `@${tweet.user.screen_name} ${isItFri13th()}`,
      in_reply_to_status_id: tweet.id_str
   }, response);
}