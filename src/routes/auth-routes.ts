import express from "express";

const router = express.Router();
router.post('/sighup', signup);
router.post('/signin',login);
router.post('verufyemail',verifyEmail);
router.post('/forgotpassword',forgotPassword);
router.post('/resetpassword',resetPassword);
router.post('/check-auth',checkAuth);
router.post('/logut',logout);

export default router;