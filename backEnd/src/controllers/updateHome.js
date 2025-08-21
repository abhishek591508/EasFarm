const homeSchema = require('../models/homeSchema');



const updateBanners = async(req, res) => {
    try {
        const newBannersData = req.body.banners;

        const updatedDoc = await homeSchema.findOneAndUpdate({}, {
            $set: {
                banners: newBannersData

            }
        }, {
            new: true,
            upsert: true
        });


        if (updatedDoc) {
            return res.status(200).send({
                message: "Banners array replaced successfully.",
                data: updatedDoc
            });
        } else {
            return res.status(404).send("No document found to update.");
        }

    } catch (err) {
        console.error("Error updating banners:", err);
        return res.status(500).send("Failed to update banners.");
    }
};


const updateCategories = async(req, res) => {
    try {
        const newCategoriesData = req.body.categories;

        const updatedDoc = await homeSchema.findOneAndUpdate({}, // Find the single document
            { $set: { categories: newCategoriesData } }, // Use $set to replace only the categories array
            {
                new: true,
                upsert: true
            }
        );

        if (updatedDoc) {
            return res.status(200).send({
                message: "Categories array replaced successfully.",
                data: updatedDoc
            });
        } else {
            return res.status(404).send("No document found to update.");
        }

    } catch (err) {
        console.error("Error updating categories:", err);
        return res.status(500).send("Failed to update categories.");
    }
};


const createHome = async(req, res) => {

    try {

        const newHomeData = req.body;


        const newDoc = await homeSchema.create(newHomeData); // create and try to save immediately

        if (newDoc) {
            return res.status(200).send({
                message: "Homepage document created successfully.",
                data: newDoc
            });
        } else {
            return res.status(404).send("Failed to create the document");
        }

    } catch (err) {
        console.error("Error creating document:", err);
        return res.status(500).send("Failed to create data inside homepage.");
    }
}

module.exports = { updateBanners, updateCategories, createHome };


/*https://g.co/gemini/share/d1d5f8324ea0 */
//https://gemini.google.com/app/26a7c8cb8749eabf // to get total chatbox