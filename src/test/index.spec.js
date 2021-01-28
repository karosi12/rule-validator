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
});