interface RawPatient {
    name: string;
    gender: string;
    dob: string;
    address: string;
    phone: string;
    email: string;
    emergencyContact: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    primaryCarePhysician: string;
    allergies: string;
    currentMedications: string;
    medicalHistory: string;
    socialHistory: string;
    familyHistory: string;
}

interface MappedField<T extends string = string> {
    value: string;
    endpoint: T;
}

type MappedPatient<T extends string = string> ={
    [key: string]: MappedField<T>;
}

type GroupedFields = {
    [key: string]: string
};

type GroupedPatient<T extends string = string> = {
    [K in T]?: GroupedFields;
};

export { RawPatient, MappedPatient, GroupedPatient, GroupedFields };
