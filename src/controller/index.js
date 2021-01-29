
import Joi from "joi";
import logger from '../utils/logger';
import Response from "../helper/responses";

const validateRule =  async (req, res) => {
  try {
    const {rule, data} = req.body;
    const dataKeys = Object.keys(data);
    const check = rule.field.split('.');
    if(check.length > 1) {
      const errorMsg =  `field ${check[0]} is missing from data`;
      if(!dataKeys.includes(check[0])) return res.status(400).send(Response.error(errorMsg));
      const upperLevelData = check[0]
      const nestedData = check[1]
      const obj1 = {}, obj2 = {};
      obj2[nestedData] = Joi.number().required()
      obj2['successful'] = Joi.number().required()
      obj2['failed'] = Joi.number().required()
      obj1[upperLevelData] = Joi.object().keys({}).append(obj2); // field to add to data are name, crew, age, and position
      const schema = Joi.object().keys({}).append(obj1)
      const value = await Joi.validate(data, schema);
      console.log("result => ", value);
      return res.status(200).send('Done');
    } else {
      // const successMsg = `field ${check[0]} successfully validated.`;
      // const successData = {
      // validation: {
      //   error: false,
      //   field: check[0],
      //   field_value: check[0],
      //   condition: rule.condition,
      //   condition_value: rule.condition_value
      // }};
      // return res.status(200).send(Response.success(successMsg,successData));
      return res.status(200).send('ok');
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

export default  {validateRule}