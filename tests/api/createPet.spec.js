import{test,expect} from '@playwright/test';

test('Create Pet', async ({request}) =>{

const petId= Date.now();

const response =await request.post('https://petstore.swagger.io/v2/pet', {

    data:{

        id:petId,
        name: 'golden ret',
        status: 'avialable'
    }
});


expect(response.status()).toBe(200);

const body = await response.json();
console.log("Created Pet", body);


});

test('Get pet', async({ request})=>{
    
    const petId = 1774864088190;

    const response = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(response.status()).toBe(200);

    const body =  await response.json();

    console.log('Feteched Pet:', body);

});

test('Update pet', async ({request}) =>{

    const petId = 1774864088190;

    //update

    const response = await request.put(`https://petstore.swagger.io/v2/pet/`,{

        data :{id: petId, name : 'Golden retriver', status : 'sold'}

    });

    
    expect (response.status()).toBe(200);

    const body = await response.json();
    console.log("Updated Pet: ", body);

});


test('Delete Pet', async ({ request }) => {

    const petId = Date.now();


    //create 

    const create = await request.post(`https://petstore.swagger.io/v2/pet/`, {
        data: { id: petId, name: "Doggie", status: 'available' }
    });

    const body = await create.json();
    console.log("created", body)



    // delete

    const response = await request.delete(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(response.status()).toBe(200);
    console.log("Deleted Pet:", petId);

    //verify deleted
    const res = await request.get(`https://petstore.swagger.io/v2/pet/${petId}`);

    expect(res.status()).toBe(404);
    const body1 = await res.json();
    console.log(body1);
});
