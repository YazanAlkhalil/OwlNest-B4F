const Company = require('../models/companyModel')
const Course = require('../models/coursesModel')
const crypto = require('crypto')
const fs = require('fs').promises;
const path = require('path')

const getCourses = async (req, res) => {
    try {
        const { companyId } = req.params
        const loggedInUserId = req.user._id
        let course = await Course.find({ companyId }).select("courseName image trainers")
        course = course.filter(course => course.trainers.find(trainer => trainer._id.toString() === loggedInUserId.toString()))
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const addUnit = async (req, res) => {
    try {
        const course = req.course
        const { title } = req.body

        const id = crypto.randomUUID().toString()
        course.content.push({
            type: "Unit",
            _id: id,
            title
        })
        await course.save()
        res.status(201).json({ msg: 'Unit Created Successfully' })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const getUnits = async (req, res) => {
    try {
        const course = req.course
        course.content.forEach(unit => {
            unit.id = unit._id
            delete unit._id
        })
        res.status(200).json(course)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const removeUnits = async (req, res) => {
    try {
        const course = req.course
        const { unitId } = req.params
        const unitIndex = course.content.findIndex(item => item._id === unitId && item.type === 'Unit');
        if (unitIndex === -1) {
            return res.status(404).json({ msg: "Units not found" });
        }

        const nextUnitIndex = course.content.slice(unitIndex + 1).findIndex(item => item.type === 'Unit');
        const endIndex = nextUnitIndex === -1 ? course.content.length : unitIndex + nextUnitIndex + 1;

        course.content = course.content.filter((_, index) => index < unitIndex || index >= endIndex);

        await course.save()
        res.status(200).json({ msg: "Deleted Unit Successfully" })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


const addPdf = async (req, res) => {
    try {
        const { unitId } = req.params
        const course = req.course
        const { title } = req.body
        const newContent = []
        const { filename } = req.file;

        let foundUnit = false;
        const _id = crypto.randomUUID().toString()

        for (let index = course.content.length - 1; index >= 0; index--) {
            if (course.content[index].type === 'Unit')
                if (course.content[index]._id === unitId) {
                    course.lessonCount += 1
                    course.content.push({
                        type: 'pdf',
                        _id,
                        title,
                        filename
                    })
                    await course.save()
                    return res.status(201).json({ msg: "Pdf add successfully" })
                } else
                    break;

        }

        course.content.forEach(
            obj => {
                if (obj._id === unitId)
                    foundUnit = true
                if (foundUnit) {
                    if (obj.type === "Unit" && obj._id !== unitId) {
                        course.lessonCount += 1
                        newContent.push({
                            type: 'pdf',
                            _id,
                            title,
                            filename
                        })
                        foundUnit = false
                        newContent.push(obj)
                    } else {
                        newContent.push(obj)
                    }
                } else {
                    newContent.push(obj)
                }
            }
        )
        course.content = newContent

        await course.save()
        res.status(201).json({ msg: "Pdf add successfully" })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


const addVideo = async (req, res) => {
    try {
        const { unitId } = req.params
        const course = req.course
        const { title, description } = req.body
        const { filename } = req.file;
        const newContent = []
        let foundUnit = false;
        const _id = crypto.randomUUID().toString()

        for (let index = course.content.length - 1; index >= 0; index--) {
            if (course.content[index].type === 'Unit')
                if (course.content[index]._id === unitId) {
                    course.lessonCount += 1

                    course.content.push({
                        type: 'video',
                        _id,
                        title,
                        description,
                        filename
                    })
                    await course.save()
                    return res.status(201).json({ msg: "Video add successfully" })
                } else
                    break;

        }

        course.content.forEach(
            obj => {
                if (obj._id === unitId)
                    foundUnit = true
                if (foundUnit) {
                    if (obj.type === "Unit" && obj._id !== unitId) {
                        course.lessonCount += 1

                        newContent.push({
                            type: 'video',
                            _id,
                            title,
                            description,
                            filename
                        })
                        foundUnit = false
                        newContent.push(obj)
                    } else {
                        newContent.push(obj)
                    }
                } else {
                    newContent.push(obj)
                }
            }
        )
        course.content = newContent

        await course.save()
        res.status(201).json({ msg: "Video add successfully" })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const addQuiz = async (req, res) => {
    try {
        const { unitId } = req.params
        const course = req.course
        const { title, quiz } = req.body
        const newContent = []
        let foundUnit = false;
        const _id = crypto.randomUUID().toString()

        for (let index = course.content.length - 1; index >= 0; index--) {

            if (course.content[index].type === 'Unit') {
                if (course.content[index]._id === unitId) {
                    course.lessonCount += 1
                    course.content.push({
                        type: 'quiz',
                        _id,
                        title,
                        quiz
                    })
                    await course.save()
                    return res.status(201).json({ msg: "Quiz add successfully" })
                }
                else
                    break;
            }

        }

        course.content.forEach(
            obj => {
                if (obj._id === unitId)
                    foundUnit = true
                if (foundUnit) {
                    if (obj.type === "Unit" && obj._id !== unitId) {
                        course.lessonCount += 1
                        newContent.push({
                            type: 'quiz',
                            _id,
                            title,
                            quiz
                        })
                        foundUnit = false
                        newContent.push(obj)
                    } else {
                        newContent.push(obj)
                    }
                } else {
                    newContent.push(obj)
                }
            }
        )
        course.content = newContent

        await course.save()
        res.status(201).json({ msg: "Quiz add successfully" })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const removeLessons = async (req, res) => {
    try {
        const courseId = req.course
        const { lessonId } = req.params
        const course = await Course.findById(courseId)
        if (!course)
            return res.status(404).json({ msg: "Course not found" })
        let index = course.content.findIndex(lesson => lesson._id === lessonId && lesson.type !== "Unit")
        if(index != -1){
            if(course.content[index].filename){
                const filePath = path.join('./uploads', course.content[index].filename);
                await fs.unlink(filePath);
            }
            course.lessonCount -= 1
            course.content.splice(index,1)
            await course.save()
            res.status(200).json({ msg: "Lesson remove successfully" })
        }
        else{
            res.status(404).json({msg: "Lesson not found" })
        }
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

const updateContent = async (req, res) => {
    try {
        const course = req.course
        const { content } = req.body
        content.forEach(item => {
            item._id = item.id,
            delete item.id
        })
        course.content = content
        await course.save()
        res.status(200).json({ msg: "Content updated successfully", course })

    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}



module.exports = {
    getCourses,
    addUnit,
    getUnits,
    removeUnits,
    addPdf,
    addVideo,
    addQuiz,
    removeLessons,
    updateContent
}