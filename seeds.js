let mongoose = require('mongoose');
let Bar = require('./models/bar');
let Comment = require('./models/comment');

let data = [
  {
    name: 'Chestnut Club',
    image: 'http://photosforclass.com/download/4715570840',
    description: 'The Chestnut Club is a modern cocktail bar by the hospitality team of Mario Guddemi, Sal Aurora, Pablo Moix & Steve Livigni of Black Market Liquor Bar and Scopa Italian Roots.The inviting and intimate space offers a number of seating options ranging from high tops, long leather banquettes, 4-12 person Chesterfield booths and an intimate private room that seats up to 15 guests.'
  },

  {
    name: '1886',
    image: 'https://farm6.staticflickr.com/5470/30628303705_7c3bf612db.jpg',
    description: 'Bar 1886 remains not just a staple, but an institution in the Los Angeles craft cocktail scene. First opened in 2010, the cocktail program was created by Aidan Demarest  (The Edison, 7 Grand, Tom Bergins) and has continued growing and evolving ever since. Bar 1886 has a strong foundation in classic techniques, which means you can expect that your Manhattans, Old-Fashions, Sidecars, and Sours will be prepared to perfection, the way they were during the pre-Prohibition era– with fresh juices and hand-cut chunks of ice. A seasoned staff of bartenders and a healthy relationship of collaboration with our chefs ensure that every syrup, infusion, tincture and foam is house-made and perfectly tailored to suit the recipes that call for them. A breadth of knowledge about spirit and cocktail history means your bartender will know the reasons your drink is prepared exactly as it is, and may even tell you a story about it. Finally, a humble, low-stakes vibe means you can order and enjoy one of the best craft cocktails in town in an inviting, relaxed setting.'
  },

  {
    name: 'Red Lion',
    image: 'https://farm6.staticflickr.com/5138/5426597650_b936644212.jpg',
    description: 'The Red Lion is situated near Martlesham in the ancient riverside market town of Woodbridge, not far from the Suffolk coast. A former coaching inn on the old London to Yarmouth turnpike road, this handsome Grade II listed country pub with a timber framed plastered exterior and colour washed brick has retained many of its 16th century features, including exposed wooden beams and open fireplaces. The most famous and striking feature, though, is the Red Lion figurehead which graces the exterior, captured in 1672 from a Dutch ship at the Battle of Sole Bay, just off the Suffolk coastline.'
  }
]


const seedDb = () => {
  Bar.remove({}, (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log("Database has been cleared");
  //   data.forEach((seed) => {
  //     Bar.create(seed, (err, bar) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('A bar has been added to the database');
  //         Comment.create(
  //           {
  //             text: 'This is a great bar',
  //             author: 'Doug'
  //           }, (err, comment) => {
  //             if (err) {
  //               console.log(err);
  //             } else {
  //               bar.comments.push(comment._id);
  //               bar.save();
  //               console.log('created new comment');
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  });
}

module.exports = seedDb;
