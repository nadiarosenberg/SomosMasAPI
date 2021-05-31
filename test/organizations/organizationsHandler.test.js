jest.mock('./../../src/services/repositories/organization');
const mockRepository = require('./../../src/services/repositories/organization');
const sut = require('./../../src/handlers/organizations');

describe('test organizations handler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('test createOrganization', () => {
        test('should call repository.persist with the parameter received', async () => {
            const parameterPassed = { test: 'test' };
            await sut.createOrganization(parameterPassed);
            expect(mockRepository.persist).toHaveBeenCalledWith(parameterPassed);
        });
        test('should returns whats repository.persist returns', async () => {
            const response = { test: 'test' };
            mockRepository.persist.mockResolvedValue(response);
            const responseReceived = await sut.createOrganization(undefined);
            expect(responseReceived).toBe(response);
        });
        test('should returns whats repository.persist returns if it thwows exception', async () => {
            mockRepository.persist.mockImplementation(()=>{
                throw new Error('Can not persist the organization')});
            expect(async()=>{
               await sut.createOrganization(undefined)
            }).rejects.toThrow(Error);
        });
    });
    describe('test getOrganization', () => {
        test('should call repository.getOne with the parameter received', async () => {
            const parameterPassed = { test: 'test' };
            await sut.getOrganization(parameterPassed);
            expect(mockRepository.getOne).toHaveBeenCalledWith(parameterPassed);
        });
        test('should returns whats repository.getOne returns', async () => {
            const response = { test: 'test' };
            mockRepository.getOne.mockResolvedValue(response);
            const responseReceived = await sut.getOrganization(undefined);
            expect(responseReceived).toBe(response);
        });
        test('should returns whats repository.getOne returns if it thwows exception', async () => {
            mockRepository.getOne.mockImplementation(()=>{
                throw new Error('Can not get the organization')});
            expect(async()=>{
               await sut.getOrganization(undefined)
            }).rejects.toThrow(Error);
        });
    });
    describe('test deleteOrganization', () => {
        test('should call repository.destroy with the parameter received', async () => {
            const parameterPassed = { test: 'test' };
            await sut.deleteOrganization(parameterPassed);
            expect(mockRepository.destroy).toHaveBeenCalledWith(parameterPassed);
        });
        test('should returns whats repository.destroy returns', async () => {
            const response = { test: 'test' };
            mockRepository.destroy.mockResolvedValue(response);
            const responseReceived = await sut.deleteOrganization(undefined);
            expect(responseReceived).toBe(response);
        });
        test('should returns whats repository.delete returns if it thwows exception', async () => {
            mockRepository.destroy.mockImplementation(()=>{
                throw new Error('Can not delete the organization')});
            expect(async()=>{
               await sut.deleteOrganization(undefined)
            }).rejects.toThrow(Error);
        });
    });
    describe('test updateOrganization', () => {
        test('should call repository.update with the parameteres received', async () => {
            const parameterPassed1 = { test: 'test' };
            const parameterPassed2 = { test: 'test' };
            await sut.updateOrganization(parameterPassed1, parameterPassed2);
            expect(mockRepository.update).toHaveBeenCalledWith(parameterPassed1, parameterPassed2);
        });
        test('should returns whats repository.update returns', async () => {
            const response = { test: 'test' };
            mockRepository.update.mockResolvedValue(response);
            const responseReceived = await sut.updateOrganization(undefined);
            expect(responseReceived).toBe(response);
        });
        test('should returns whats repository.update returns if it thwows exception', async () => {
            mockRepository.update.mockImplementation(()=>{
                throw new Error('Can not update the organization')});
            expect(async()=>{
               await sut.updateOrganization(undefined)
            }).rejects.toThrow(Error);
        });
    });
    describe('test getAllOrganizations', () => {
        test('should call repository.getAll with no parameters', async () => {
            await sut.getAllOrganizations();
            expect(mockRepository.getAll).toHaveBeenCalledWith();
        });
        test('should returns whats repository.getAll returns', async () => {
            const response = { test: 'test' };
            mockRepository.getAll.mockResolvedValue(response);
            const responseReceived = await sut.getAllOrganizations(undefined);
            expect(responseReceived).toBe(response);
        });
        test('should returns whats repository.getAll returns if it thwows exception', async () => {
            mockRepository.getAll.mockImplementation(()=>{
                throw new Error('Can not get the organizations')});
            expect(async()=>{
               await sut.getAllOrganizations(undefined)
            }).rejects.toThrow(Error);
        });
    });
})