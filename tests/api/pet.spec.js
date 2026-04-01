import { test, expect } from '@playwright/test';
import { PetAPI } from './apiHelper/petApi';
import Ajv from 'ajv';
import { petSchema } from './schemas/petSchema.js';

    const ajv = new Ajv();
    const validate = ajv.compile(petSchema);

    //failure attachment
    async function attachOnFailure(name, data) {
    await test.info().attach(`${name}.json`, {
    body: JSON.stringify(data || {}, null, 2),
    contentType: 'application/json'
  });
}

test('E2E simple flow', async ({ request }) => {

    const api = new PetAPI(request);
    const petId = Date.now();
    let createBody, getBody;

    // =========================
    //Create 
    // =========================
    await test.step(`Create pet via Id ${petId} `, async () => {
        const createRes = await api.createPet({
            id: petId,
            name: "Dog WFM",
            status: "sold"
        });
        expect(createRes.status()).toBe(200);

        createBody = await createRes.json();

        //attachment
        await test.info().attach('Create Response', {
            body: JSON.stringify(createBody, null, 2),
            contentType: 'application/json' 
        });


    });

    // =========================
    //Get
    // =========================
 await test.step('Fetch pet and validate', async () => {


  try {
    const getRes = await api.getPet(petId);
    expect(getRes.status()).toBe(200);

    getBody = await getRes.json();

    
    const isValid = validate(getBody);
    if (!isValid) {
        console.log("Schema Errors:", validatePet.errors);
    }
    expect(isValid).toBe(true);

  } catch (error) {

    // Attach ONLY on failure
   await attachOnFailure('GET Failure Response', getBody);
    console.log("Failure captured:", error.message);
    throw error; 
  }

});


    // =========================
    //delete
    // =========================

    await test.step('Delete pet and verify ', async () => {
        const deleRes = await api.deletePet(petId);
        expect(deleRes.status()).toBe(200);

        const verifyRes = await api.getPet(petId);
        expect(verifyRes.status()).toBe(404);
        console.log("Deleted Pet:", petId);
    });

});