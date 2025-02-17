var express = require('express');
const RenderControllers = require("../controllers/render.controllers");
var router = express.Router();

/* GET home page. */
router.get('/signin', RenderControllers.signin);

module.exports = router;
