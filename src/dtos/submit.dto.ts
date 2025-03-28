import { RawPatient } from "../types/patient.type";
import { ehrKeys } from '../adapters/adapterRegistry'; 

type SubmitRequestBody = {
    ehr: ehrKeys;
    patient: RawPatient;
};

export { SubmitRequestBody };