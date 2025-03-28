import { MappedPatient } from "./patient.type";

interface EHRAdapter {
    submitPatient(mappedData: MappedPatient): Promise<string>;
}

export { EHRAdapter };