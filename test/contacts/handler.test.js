jest.mock('../../src/services/repositories/contacts');
const mockRepository = require('../../src/services/repositories/contacts');
const sut = require('../../src/handlers/contacts');

describe('test contacts handler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('test create contact', () => {
        test('should call persist with some parameter received', async () => {
            const paramTest = {test: 'test'};
            await sut.createContact(paramTest);
            expect(mockRepository.persist).toHaveBeenCalledWith(paramTest); 
        });
        test('should return whats function persist returns', async () => {
            const paramTest = {test: 'test'};
            mockRepository.persist.mockResolvedValue(paramTest);
            const paramReceived = await sut.createContact(undefined);            
            expect(paramReceived).toBe(paramTest);
        });
        test('should returns whats function persist returns if it thwows exception', async () => {
            mockRepository.persist.mockImplementation(()=>{
                throw new Error('Can not persist contact')});
            expect(async()=>{
               await sut.createContact(undefined)
            }).rejects.toThrow(Error);
        });
    });
    describe('test getAll contact paginated', () => {
        test('should call gellAll with some parameter received', async () => {
            const paramTest = {test: 'test'};
            await sut.getAllContactsPaginate(paramTest);
            expect(mockRepository.getAll).toHaveBeenCalledWith(paramTest);
        })
        test('should return whats function getAll returns', async () => {
            const paramTest = {test: 'test'};
            mockRepository.getAll.mockResolvedValue(paramTest);
            const paramReceived = await sut.getAllContactsPaginate(undefined);
            expect(paramReceived).toBe(paramTest);
        });
        test('should returns whats function getAll returns if it thwows exception', async () => {
            mockRepository.getAll.mockImplementation(()=>{
                throw new Error('Can not persist contact')});
            expect(async()=>{
               await sut.getAllContactsPaginate(undefined)
            }).rejects.toThrow(Error);
        });
    });
});