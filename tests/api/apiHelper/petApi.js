export class PetAPI{

    constructor(request){

        this.request= request;
        this.baseUrl ='https://petstore.swagger.io/v2/pet';
    }

    async createPet(data){

        return await this.request.post(this.baseUrl,{ data });
    }

    async getPet(id){

        return await this.request.get(`${this.baseUrl}/${id}`);
    }

    async deletePet(id){

        return await this.request.delete(`${this.baseUrl}/${id}`);
        
    }
}