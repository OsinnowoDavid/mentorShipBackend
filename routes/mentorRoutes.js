import express from "express"
import { addMentor, getMentor, uploadMentorImage, deleteMentorImage } from "../controller/mentorcontroller.js"
import upload from "../middleware/uploadMiddleware.js";

const mentorRoutes = express.Router()

mentorRoutes.post("/addMentor", addMentor)
mentorRoutes.get("/get-mentors", getMentor)
mentorRoutes.post("/uploadImage/:id", upload.single('profileImage'), uploadMentorImage)
mentorRoutes.delete("/deleteImage/:id", deleteMentorImage)

export default mentorRoutes