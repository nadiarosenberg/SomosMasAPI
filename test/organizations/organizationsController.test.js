const request = require('supertest');
const app = require('../../src/server.js');

const repositoryOrganization = require('./../../src/services/repositories/organization.js');
const repositorySlides = require('./../../src/services/repositories/slides.js');
const repositorySocialMedia = require('./../../src/services/repositories/socialmedia.js');
const mockUploadImage = require('./../../src/handlers/middlewares/uploadImage');

jest.mock('./../../src/handlers/middlewares/uploadImage', () => ({
    uploadImage: jest.fn().mockResolvedValue('http://link.png'),
    uploadBase64Image: jest.fn().mockResolvedValue('http://link.png'),
}));

jest.mock('./../../src/services/repositories/organization.js');
jest.mock('./../../src/services/repositories/slides.js');
jest.mock('./../../src/services/repositories/socialmedia.js');
jest.mock('./../../src/controllers/middlewares/auth', () =>
    jest.fn((req, res, next) => next())
);

const base64 = require('./imageBase64');

describe('test organizations controller', () => {
    beforeEach(()=>{
        jest.clearAllMocks();
    })
    describe('test GET/organizations', ()=>{
        it('should show all organizations', async () => {
            const repositoryResult = [{ test: 'test' }];
            repositoryOrganization.getAll.mockResolvedValue(repositoryResult);
            const res = await request(app).get('/organizations');
            expect(repositoryOrganization.getAll).toHaveBeenCalledTimes(1)
            expect(res.header).toMatchObject({'content-type': 'application/json; charset=utf-8'});
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(repositoryResult)
        });
        it('should return error when something wrong happen', async()=>{
            repositoryOrganization.getAll.mockImplementation(async ()=>{
                throw new Error('Error getting organizations')
            });
            const res = await request(app).get('/organizations')
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error getting organizations');
        });
    });

    describe('test GET/organizations/:orgId', ()=>{
        it('should return one organization if exist', async () => {
            const repositoryResult = { test1: 'test1', test2: 'test2', test3: 'test3' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResult);
            const repositorySlidesResult = [{test:'test'}]
            repositorySlides.getSlidesByOrgId.mockResolvedValue(repositorySlidesResult);
            const repositorySocialMediaResult = {test: 'test'};
            repositorySocialMedia.getOne.mockResolvedValue(repositorySocialMediaResult);
            const res = await request(app).get('/organizations/1');
            const expectedResponse = {organization: repositoryResult, slides: repositorySlidesResult, socialMedia: repositorySocialMediaResult}
            expect(repositoryOrganization.getOne).toHaveBeenCalledTimes(1);
            expect(res.header).toMatchObject({'content-type': 'application/json; charset=utf-8'});
            expect(res.body).toMatchObject(expectedResponse)
        });
        it('should return error when organization does not exist', async()=>{
            const repositoryResult = undefined;
            repositoryOrganization.getOne.mockResolvedValue(repositoryResult);
            const res = await request(app).get('/organizations/1')
            expect(repositoryOrganization.getOne).toHaveBeenCalledTimes(1)
            expect(res.statusCode).toEqual(404);
            expect(res.body.message).toEqual('Organization not found');
        });
        it('should return error when something wrong happen', async()=>{
            repositoryOrganization.getOne.mockImplementation(async ()=>{
                throw new Error('Error getting organization')
            });
            const res = await request(app).get('/organizations/1')
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error getting organization');
        });
    });

    describe('test POST/organizations', ()=>{
        it('should return organization created', async () => {
            const repositoryResult = {test: 'test' };
            repositoryOrganization.persist.mockResolvedValue(repositoryResult);
            const res = await request(app).post('/organizations').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test'
            });
            expect(repositoryOrganization.persist).toHaveBeenCalledTimes(1);
            expect(res.body.message).toEqual('Organization created successfully');
            expect(res.header).toMatchObject({'content-type': 'application/json; charset=utf-8'});
            expect(res.body.result).toMatchObject(repositoryResult);
            expect(res.statusCode).toEqual(200);
        });
        it('should return organization and socialmedia created', async () => {
            const repositoryResult = {test: 'test' };
            const repositorySocialMediaResult = {test: 'test' };
            repositoryOrganization.persist.mockResolvedValue(repositoryResult);
            repositorySocialMedia.persist.mockResolvedValue(repositorySocialMediaResult);
            const res = await request(app).post('/organizations').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test',
                facebook: 'facebook.com',
                instagram: 'instagram.com',
                linkedin: 'linkedin.com'
            })
            expect(repositoryOrganization.persist).toHaveBeenCalledTimes(1);
            expect(repositorySocialMedia.persist).toHaveBeenCalledTimes(1);
            expect(res.header).toMatchObject({'content-type': 'application/json; charset=utf-8'});
            expect(res.body.message).toEqual('Organization created successfully');
            expect(res.body.result).toMatchObject(repositoryResult);
            expect(res.body.socialMedia).toMatchObject(repositorySocialMediaResult);
            expect(res.statusCode).toEqual(200);
        });
        it('should return error when something wrong happen', async()=>{
            repositoryOrganization.persist.mockImplementation(async ()=>{
                throw new Error('Error posting organization')
            });
            const res = await request(app).post('/organizations').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test',
                facebook: 'facebook.com',
                instagram: 'instagram.com',
                linkedin: 'linkedin.com'
            })
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error posting organization');
        });
    });

    describe('test PUT/organizations/:orgId', ()=>{
        it('should return error if organization doesnt exist', async () => {
            const repositoryResultOrgExists = undefined;
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = undefined;
            repositoryOrganization.update.mockResolvedValue(repositoryResult);
            const res = await request(app).put('/organizations/1');
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Organization not found');
        });
        it('should return error if body is empty', async () => {
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = [0]
            repositoryOrganization.update.mockResolvedValue(repositoryResult);
            const res = await request(app).put('/organizations/1').send({})
            expect(repositoryOrganization.update).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Error updating organization');
        });
        it('should update an organization if exists', async () => {
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = [1];
            repositoryOrganization.update.mockResolvedValue(repositoryResult);
            const res = await request(app).put('/organizations/1').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test'
            })
            expect(repositoryOrganization.update).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Organization updated successfully');
        });
        it('should update an organization and socialMedia if both exist', async () => {
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = [1];
            repositoryOrganization.update.mockResolvedValue(repositoryResult);
            repositorySocialMedia.update.mockResolvedValue(repositoryResult);
            const res = await request(app).put('/organizations/1').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test',
                facebook: 'facebook.com',
                instagram: 'instagram.com',
                linkedin: 'linkedin.com'
            })
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Organization updated successfully');
        });
        it('should update an organization if exists and create socialMedia if it doesnt exist', async () => {
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = [1];
            const repositorySocialMediaResult = {test: 'test' };
            repositoryOrganization.update.mockResolvedValue(repositoryResult);
            repositorySocialMedia.persist.mockResolvedValue(repositorySocialMediaResult);
            const res = await request(app).put('/organizations/1').send({
                name: 'name',
                image: base64,
                email: 'test@gmail.com',
                welcomeText: 'test test',
                facebook: 'facebook.com',
                instagram: 'instagram.com',
                linkedin: 'linkedin.com'
            })
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Organization updated successfully');
        });
        it('should return error when something wrong happen', async()=>{
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            repositoryOrganization.update.mockImplementation(async ()=>{
                throw new Error('Error updating organization')
            });
            const res = await request(app).put('/organizations/1')
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error updating organization');
        });
    });

    describe('test DELETE/organizations/:orgId', ()=>{
        it('should return error if organization doesnt exist', async () => {
            const repositoryResultOrgExists = undefined;
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = undefined;
            repositoryOrganization.destroy.mockResolvedValue(repositoryResult);
            const res = await request(app).delete('/organizations/1');
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toEqual('Organization not found');
        });
        it('should delete an organization if exists', async () => {
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            const repositoryResult = 1
            repositoryOrganization.destroy.mockResolvedValue(repositoryResult);
            const res = await request(app).delete('/organizations/1');
            expect(repositoryOrganization.destroy).toHaveBeenCalledTimes(1);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toEqual('Organization deleted successfully');
        });
        it('should return error when something wrong happen', async()=>{
            const repositoryResultOrgExists = {test: 'test' };
            repositoryOrganization.getOne.mockResolvedValue(repositoryResultOrgExists);
            repositoryOrganization.destroy.mockImplementation(async ()=>{
                throw new Error('Error deleting organization')
            });
            const res = await request(app).delete('/organizations/1')
            expect(res.statusCode).toEqual(500);
            expect(res.body.message).toEqual('Error deleting organization');
        });
    });
});