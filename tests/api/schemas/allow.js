import Ajv from "ajv";
import { petSchema } from "../schemas/petSchema";

const ajv = new Ajv();
const validate = ajv.compile(petSchema);

export function validateSchema(data) {
    const valid = validate(data);

    if (!valid) {
        console.log("Schema Errors:", validate.errors);
        return false;
    }

    return true;
}