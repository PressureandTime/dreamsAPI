const express = require( 'express' );
const {
  getDreams,
  getDream,
  getAllDreams,
  createDream,
  updateDream,
  deleteDream,
} = require( '../controllers/dreams' );

const Dream = require( '../models/Dream' );

const router = express.Router();
const advancedResults = require( '../middleware/advancedResults' );

router
  .route( '/' )
  .get( advancedResults( Dream, 'dreams' ), getAllDreams )
  .post( createDream );

router.route('/getAllDreamTypes').get(advancedResults(Dream, 'dreams'), getDreams);

router
  .route( '/:id' )
  .get( getDream )
  .delete( deleteDream )
  .put( updateDream );

module.exports = router;
