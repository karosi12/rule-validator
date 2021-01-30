
import Joi from "joi";
import logger from '../utils/logger';
import Response from "../helper/responses";

const validateRule =  async (req, res) => {
  try {
    const {rule, data} = req.body;
    const dataKeys = Object.keys(data);
    const check = rule.field.split('.');
    const errorMsg =  `field ${check[0]} is missing from data.`;
    if(!dataKeys.includes(check[0])) return res.status(400).send(Response.error(errorMsg));
    if(check.length > 1) {
      const schema = Joi.object().keys({
        name: Joi.string(),
        crew: Joi.string(),
        age: Joi.number(),
        position: Joi.string(),
        [check[0]]: Joi.object().keys({
          count: Joi.number().required(),
          successful: Joi.number().optional(),
          failed: Joi.number(),
        })
      })
      const value = await Joi.validate(data, schema);
      if(value) {
        if(condition(rule.condition, data.missions.count, rule.condition_value)) {
          const successMsg = `field ${rule.field} successfully validated.`;
          const successData = {
            "validation": {
              "error": false,
              "field": `${rule.field}`,
              "field_value": data[check[0]][check[1]], 
              "condition": rule.condition,
              "condition_value": rule.condition_value
            }
          }
          return res.status(200).send(Response.success(successMsg, successData));
        } else {
          const errMsg = `field ${rule.field} failed validation.`;
          const errData = {
            validation: {
              error: true,
              field: `${rule.field}`,
              field_value: data[check[0]][check[1]],
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
          return res.status(400).send(Response.error(errMsg, errData));
        }
      }
    } else {
      if(data[check[0]] !== undefined) {
        if(condition(rule.condition, data[check[0]], rule.condition_value)) {
          const successMsg = `field ${rule.field} successfully validated.`;
          const successData = {
            validation: {
              error: false,
              field: check[0],
              field_value: data[check[0]],
              condition: rule.condition,
              condition_value: rule.condition_value
          }};
          return res.status(200).send(Response.success(successMsg, successData));
        } else {
          const errMsg = `field ${rule.field} failed validation.`;
          const errData = {
            validation: {
              error: true,
              field: check[0],
              field_value: data[check[0]],
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
          return res.status(400).send(Response.error(errMsg, errData));
        }
      } else {
        if(condition(rule.condition, data, rule.condition_value)) {
          const successMsg = `field ${rule.field} successfully validated.`;
          const successData = {
            validation: {
              error: false,
              field: check[0],
              field_value: data[check[0]],
              condition: rule.condition,
              condition_value: rule.condition_value
          }};
          return res.status(200).send(Response.success(successMsg, successData));
        } else {
          console.log(check)
          const errMsg = `field ${rule.field} failed validation.`;
          const errData = {
            validation: {
              error: true,
              field: check[0],
              field_value: data[check[0]],
              condition: rule.condition,
              condition_value: rule.condition_value
            }
          }
          return res.status(400).send(Response.error(errMsg, errData));
        }
      }
    }
  } catch (error) {
    logger.error(JSON.stringify(error.details || error))
    if (error.details) {
      const errDetails = error.details.map((i) => ({
        message: i.message.replace(/['"]/g, "").replace(/must/, 'should') + '.',
      }));
      logger.error(JSON.stringify(errDetails[0].message));
      return res.status(400).send(Response.error(errDetails[0].message));
    }
    return res.status(400).send(Response.error('Invalid JSON payload passed.'));
  }
}

const condition = (key, field_value, condition_value) => {
  return {
    gte: field_value >= condition_value,
    neq: field_value !== condition_value,
    gt: field_value > condition_value,
    eq: field_value === condition_value,
    contains: `${condition_value}`.includes(field_value)
  }[key]
}

export default  {validateRule}