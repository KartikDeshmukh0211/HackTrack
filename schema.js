// this we will use to validata all the schemes of our project

const Joi = require("joi");

module.exports.problemSchema = Joi.object({
  // here we are trating problem as a object because we are passing th problem object from "new.ejs" form as
  // (problem[title], problem[description], in this manner)
  problem: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    posted_by: Joi.string().required(),
  }),
});
