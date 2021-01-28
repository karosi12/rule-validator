import Joi from "joi";
import Response from "./responses";
import logger from '../utils/logger';

const validateRuleJoi = async (req, res, next) => {
  try {
    const data = await Joi.validate(req.body, validateRuleSchema);
    if (data) return next();
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, "").replace(/must/, 'should') + '.',
      }));
      return res.status(400).send(Response.error(errDetails[0].message));
    }
    return res.status(400).send(Response.error('Invalid JSON payload passed.'));
  }
};

const validateRuleSchema = Joi.object().keys({
  rule: Joi.object().keys({
    field: Joi.string().required(),
    condition: Joi.string().required(),
    condition_value: Joi.number().required(),
  }).required(),
  data: Joi.object().required()
});

export default { validateRuleJoi };
