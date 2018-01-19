let mongoose = require('mongoose');
let Bar = require('./models/bar');
let Comment = require('./models/comment');

let data = [
  {
    name: 'Chestnut Club',
    image: 'http://photosforclass.com/download/4715570840',
    description: 'Bar in Santa Monica'
  },

  {
    name: '1886',
    image: 'https://farm6.staticflickr.com/5470/30628303705_7c3bf612db.jpg',
    description: 'Bar in Pasadena'
  },

  {
    name: 'Red Lion',
    image: 'https://farm6.staticflickr.com/5138/5426597650_b936644212.jpg',
    description: 'Bar in Woodbridge'
  }
]


const seedDb = () => {
  Bar.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database has been cleared");
    data.forEach((seed) => {
      Bar.create(seed, (err, bar) => {
        if (err) {
          console.log(err);
        } else {
          console.log('A bar has been added to the database');
          Comment.create(
            {
              text: 'This is a great bar',
              author: 'Doug'
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                bar.comments.push(comment._id);
                bar.save();
                console.log('created new comment');
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDb;
