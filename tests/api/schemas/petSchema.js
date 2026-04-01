export const petSchema = {

    type : "object",
    properties : {

        id : {type : "number"},

        name : {
            
            type : "string",
            minLength : 1    //must not be empty
        },
        status: {
            type: "string",
            enum:["available", "pending", "sold"] //allowed values
        }
    },

    required : ["id", "name", "status"],
    additionalProperties : true  // no extra fields allowed
};