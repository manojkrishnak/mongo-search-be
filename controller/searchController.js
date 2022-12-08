const express = require('express');
const mongoConfig = require('../config/db');
const router = express.Router()

router.get('/search', async (req, res) => {
    try {
        const { q: search } = req.query;
        console.log('<<<>>', search)
        const result = await mongoConfig.getDb().collection('listingsAndReviews').aggregate(
            [
                {
                    '$search': {
                        'index': 'default',
                        'autocomplete': {
                            'query': search,
                            'path': 'address.market'
                        }
                    }
                }, {
                    '$group': {
                        _id: "$address.market"
                    }
                }, {
                    '$limit': 20
                }, {
                    '$project': {
                        '_id': 1,
                        'address': {
                            'market': 1
                        }
                    }
                }
            ]
        ).toArray();
        console.log('r', result)
        return res.status(200).json({
            message: 'Fetched posts',
            data: result
        })
    } catch (error) {
        throw new Error(error);
    }
});


router.get("/search-selected-city", async (req, res) => {
    try {
        const { city } = req.query;
        console.log("value", city)
        const result = await mongoConfig.getDb().collection('listingsAndReviews').find({ "address.market": city }).limit(10).toArray();
        // console.log("b r", result)
        return res.status(200).json({
            message: 'Fetched Stay details',
            data: result
        })
    } catch (error) {
        throw new Error(error);
    }
})

router.get("/operating-at", async (req, res) => {
    try {
        const result = await mongoConfig.getDb().collection('listingsAndReviews').distinct("address.market");
        return res.status(200).json({
            message: 'Fetched operating places',
            data: result
        })
    } catch (error) {
        throw new Error(error);

    }
})




module.exports = router