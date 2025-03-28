type FieldMapping = {
    key: string;
    endpoint: string;
};

interface MappingRecipe {
    name: FieldMapping;
    gender: FieldMapping;
    dob: FieldMapping;
    address: FieldMapping;
    phone: FieldMapping;
    email: FieldMapping;
    emergencyContact: FieldMapping;
    insuranceProvider: FieldMapping;
    insurancePolicyNumber: FieldMapping;
    primaryCarePhysician: FieldMapping;
    allergies: FieldMapping;
    currentMedications: FieldMapping;
    medicalHistory: FieldMapping;
    socialHistory: FieldMapping;
    familyHistory: FieldMapping;
}

export type { MappingRecipe, FieldMapping };
