const express = require('express');
const auth = require("../middleware/auth");

const {getCategories,createCategory,getCategory,updateCategory,deleteCategory} =require ('../services/categoryService');
const router = express.Router();


router.route("/").get(auth, getCategories).post(auth, createCategory);
router.route("/:id").get(auth, getCategory).put(auth, updateCategory).delete(auth,deleteCategory);


module.exports= router;
