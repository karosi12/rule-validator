import expect from 'expect.js';
import request from 'supertest';
import app from '../app';

describe('My Rule-Validation API', () => {
  it('should give the welcome address', async () => {
    try {
      const res = await request(app).get('/').expect(200);
      expect(res.status).equal(200);
      expect(res.body).have.property('status');
      expect(res.body).have.property('message');
      expect(res.body).have.property('data');
      expect(res.body.message).equal('My Rule-Validation API');
      expect(res.body.status).equal('success');
      expect(typeof res.body.data).to.eql('object')
      expect(res.body.data).have.property('github')
      expect(res.body.data).have.property('name')
      expect(res.body.data).have.property('email')
      expect(res.body.data).have.property('mobile')
      expect(res.body.data).have.property('twitter')
    } catch (error) {
      throw new Error(error);
    }
  });
  describe('Validate-rule', () => {
    it('#1 validate-rule', async () => {
      try {
        const payload = {
          "rule": { 
            "field": "missions.count",
            "condition": "gte",
            "condition_value": 30
          },
          "data": {
            "missions": {
              count: 50,
              "successful": 1,
              failed: 12
          }
        }};  
        const res = await request(app).post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload)
        .expect(200);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('validation')
        expect(res.body.data.validation.error).to.equal(false)
        expect(res.body.data.validation).to.have.property('error')
        expect(res.body.data.validation).to.have.property('field')
        expect(res.body.data.validation).to.have.property('condition')
        expect(res.body.data.validation).to.have.property('field_value')
        expect(res.body.data.validation).to.have.property('condition_value')
      } catch (error) {
        throw new Error(error);
      }
    });
    it('#2 validate-rule', async () => {
      try {
        const payload = {
          "rule": { 
            "field": "missions.count",
            "condition": "gte",
            "condition_value": 30
          },
          "data": {
            "missions": {count: 10, "successful": 1, failed: 12}
          }
        }
        const res = await request(app).post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload)
        .expect(400);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('validation')
        expect(res.body.data.validation.error).to.equal(true)
        expect(res.body.data.validation).to.have.property('error')
        expect(res.body.data.validation).to.have.property('field')
        expect(res.body.data.validation).to.have.property('condition')
        expect(res.body.data.validation).to.have.property('field_value')
        expect(res.body.data.validation).to.have.property('condition_value')
      } catch (error) {
        throw new Error(error);
      }
    });
    it('#3 validate-rule', async () => {
      try {
        const payload =    {
          "rule": {
            "field": "5",
            "condition": "contains",
            "condition_value": "rocinante"
          },
          "data": ["The Nauvoo", "The Razorback", "The Roci", "Tycho"]
        }
        const res = await request(app).post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload)
        .expect(400);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.equal(null)
      } catch (error) {
        throw new Error(error);
      }
    });
    it('#4 validate-rule', async () => {
      try {
        const payload =  {
          "rule": {
            "field": "0",
            "condition": "eq",
            "condition_value": "a"
          },
          "data": "damien-marley"
        } 
        const res = await request(app).post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload)
        .expect(400);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('validation')
        expect(res.body.data.validation.error).to.equal(true)
        expect(res.body.data.validation).to.have.property('error')
        expect(res.body.data.validation).to.have.property('field')
        expect(res.body.data.validation).to.have.property('condition')
        expect(res.body.data.validation).to.have.property('field_value')
        expect(res.body.data.validation).to.have.property('condition_value')
      } catch (error) {
        throw new Error(error);
      }
    });
    it('#5 validate-rule', async () => {
      try {
        const payload = {
          "rule": {
            "field": "missions",
            "condition": "gte",
            "condition_value": 30
          },
          "data": {
            "name": "James Holden",
            "crew": "Rocinante",
            "age": 34,
            "position": "Captain",
            "missions": 45
          }
        } 
        const res = await request(app).post('/validate-rule')
        .set('Accept', 'application/json')
        .send(payload)
        .expect(200);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('status')
        expect(res.body).to.have.property('data')
        expect(res.body.data).to.have.property('validation')
        expect(res.body.data.validation.error).to.equal(false)
        expect(res.body.data.validation).to.have.property('error')
        expect(res.body.data.validation).to.have.property('field')
        expect(res.body.data.validation).to.have.property('condition')
        expect(res.body.data.validation).to.have.property('field_value')
        expect(res.body.data.validation).to.have.property('condition_value')
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});