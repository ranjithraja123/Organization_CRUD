import express from 'express'
import { createOrganization, deleteOrganizationById, getAllOrganizations, getOrganizationById, updateOrganizationById } from '../controllers/organization.controllers.js'
import { authorize, protect } from '../middlewares/auth.js'



const router = express.Router()

router.post('/',protect, authorize('admin'),createOrganization)
// router.route('/').get(getAllOrganizations)
router.get('/',getAllOrganizations)
router.get('/:id',protect, authorize('admin'), getOrganizationById);
router.put('/:id',protect, authorize('admin'),updateOrganizationById)
router.delete('/:id',protect, authorize('admin'),deleteOrganizationById)




export default router