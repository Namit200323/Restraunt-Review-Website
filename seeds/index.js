const mongoose = require('mongoose');
const Restr = require('../models/restr');

const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/MERN');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


const sample = array=> array[Math.floor(Math.random()*array.length)];
// Gives a random element of the array


const seedDB = async()=>{
    await Restr.deleteMany({});
    for(let i = 0;i<50;i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const rest = new Restr({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image : 'https://source.unsplash.com/collections/483251',
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, dignissimos voluptate adipisci fuga nihil voluptatibus odit doloribus aperiam nulla perspiciatis repudiandae impedit ipsam odio quae, quasi delectus numquam deleniti doloremque?'
        })
        await rest.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})