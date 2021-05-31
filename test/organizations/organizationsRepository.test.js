jest.mock('./../../src/models');

describe('Organizations repository should', ()=>{
    const sut = require('./../../src/services/repositories/organization');
    describe('test persist function', ()=>{
        it('should add a valid organization', async() => {
            const organizationToCreate = {               
                    name: 'test',
                    image: 'test.png',
                    address: 'testaddress',
                    phone: '12345',
                    email: 'test@gmail.com',
                    welcomeText: 'Welcome test',
                    aboutUsText: 'AboutUs text'
            }
            const result = await sut.persist(organizationToCreate);
            expect(result).toBeInstanceOf(Object);
            expect(result).toMatchObject(organizationToCreate);
        })
    });

    describe('test getAll function', ()=>{
        it('should return organizations', async() => {
            const result = await sut.getAll();
            expect(result).toBeInstanceOf(Array)
    })
    });
    describe('test getOne function', ()=>{
        it('should return organization', async() => {
            const id = 1;
            const result = await sut.getOne(id);
            expect(result).toHaveProperty('name', 'image', 'phone', 'address');
            expect(result).toBeInstanceOf(Object)
    })
    });
    describe('test update function', ()=>{
        it('should update an organization', async() => {
            const organizationToUpdate = {               
                name: 'test',
                image: 'test.png',
                address: 'testaddress',
                phone: '12345',
                email: 'test@gmail.com',
                welcomeText: 'Welcome test',
                aboutUsText: 'AboutUs text'
            }
            const id = 2;
            const result = await sut.update(organizationToUpdate, id);
            expect(result[0]).toEqual(1);
        })
    });
    describe('test delete function', ()=>{
        it('should delete organization', async() => {
            const id = 1;
            const result = await sut.destroy(id);
            expect(result).toEqual(1);
        })
    });
});