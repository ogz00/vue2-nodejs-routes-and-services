var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send([
        {
            name: "Oğuzhan Karacüllü",
            pos: "Software Engineer"
        },
        {
            name: "Burak Doma",
            pos: "Software Manager"
        }
    ]);
});

module.exports = router;
