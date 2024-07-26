import express from 'express' 
import { createUser, deleteUserById, getAllUsers, getAllUsersOfOrganization, getUserById, updateUserById } from '../controllers/user.controllers.js'
import { authorize, isAdmin, protect } from '../middlewares/auth.js'

const router = express.Router()

router.post('/',protect, authorize('admin'),createUser)

router.get('/',protect, authorize('admin'),getAllUsers)
router.get('/:id',getUserById)
router.put('/:id',protect,updateUserById)
router.delete('/:id',protect, authorize('admin'),deleteUserById)

router.get('/organization/users',protect, isAdmin, getAllUsersOfOrganization);


export default router