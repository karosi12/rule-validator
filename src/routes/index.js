import express from 'express';
import Responses from '../helper/responses';
import validate from '../helper/validator';
import Controller from '../controller/index';
const router = express.Router();
const basePayload = {
  name: "Adeyemi Kayode",
  github: "@karosi12",
  email: "adekayor@gmail.com",
  mobile: "07053310301",
  twitter: "@karosi12"
}
router.get('/', (req, res) => res.status(200).send(Responses.success("My Rule-Validation API", basePayload)));
router.post('/validate-rule', validate.validateRuleJoi, Controller.validateRule)

export default router;
