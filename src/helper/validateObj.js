import Joi from "joi";
import Response from "./responses";
import logger from '../utils/logger';

Joi.objectId = require('joi-objectid')(Joi);

const createUserJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, userSchema);
    if (data) return next();
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, ""),
      }));
      return res.status(400).send(Response.error(400, errDetails[0].message));
    }
    return res.status(400).send(Response.error(400, 'some parameter are missing'));
  }
};

const clinicBasicSignupJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, clinicSchema);
    if (data) return next();
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, ""),
      }));
      return res.status(400).send(Response.error(400, errDetails[0].message));
    }
    return res.status(400).send(Response.error(400, 'some parameter are missing'));
  }
};

const loginJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, loginSchema);
    if (data) return next();
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, ""),
      }));
      return res.status(400).send(Response.error(400, errDetails[0].message));
    }
    return res.status(400).send(Response.error(400, 'some parameter are missing'));
  }
};

const verifyClinicSignupJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, verifyClinicSignupSchema);
    if (data) return next();
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, ""),
      }));
      return res.status(400).send(Response.error(400, errDetails[0].message));
    }
    return res.status(400).send(Response.error(400, 'some parameter are missing'));
  }
};


const clinicSchema = Joi.object().keys({
  contactEmail: Joi.string().required(),
  contactPhoneNumber: Joi.string().required(),
  contactName: Joi.string().required(),
  clinicName: Joi.string().required(),
  clinicAddress: Joi.string().required(),
  clinicPhoneNumber: Joi.string().required(),
  clinicEmail: Joi.string().required(),
  question: Joi.objectId().required(),
  answer: Joi.string().required(),
});

const userSchema = Joi.object().keys({
  fullName: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  dob: Joi.string(),
  mobileToken: Joi.string(),
  invitationSentBy: Joi.string(),
})

const verifyClinicSignupSchema = Joi.object().keys({
  password: Joi.string().required(),
  answer: Joi.string().required()
})

const loginSchema = Joi.object().keys({
  password: Joi.string().required(),
  email: Joi.string(),
  phoneNumber: Joi.string()
})

export default { clinicBasicSignupJoi, verifyClinicSignupJoi, createUserJoi, loginJoi };
