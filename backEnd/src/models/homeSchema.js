const mongoose = require('mongoose');


const homeSchma = new mongoose.Schema({
    banners: [{
        title: String,
        image: String,
        link: String
    }],
    categories: [{
        name: String,
        icon: String,
        link: String
    }]

});

const homeSchema = mongoose.model('Home', homeSchma);
module.exports = homeSchema;

/*

title = what text user sees.
image = what picture is shown.
link = where user goes when clicked.


making schma to want admin control on home page.

If data is static → keep JSON file or hardcode in backend.
If data is dynamic (admin can change banners/categories) → make a schema.
 */