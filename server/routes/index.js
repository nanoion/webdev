// Define your routes
import express from 'express';
import apicache from 'apicache';
import path from 'path';
import {getXYZ,getBC,navMap,autoPlace} from '../controllers/doscg';
const router = express.Router();
let cache = apicache.middleware

router.use(cache('5 minutes'))
// Routes go here.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.route('/xyz').get(getXYZ)
router.route('/bc').get(getBC)
router.route('/nav').get(navMap)
router.route('/auto').get(autoPlace)
// Use localhost:9000/api followed by the required path.

module.exports = router;
