import { RawPatient, MappedPatient } from './types/patient.type';
import { FieldMapping, MappingRecipe } from './types/mapping.type';
import { readMappingFile } from './utils';
import { typedEntries } from './utils';

async function mapPatient(rawPatient: RawPatient, ehrName: string): Promise<MappedPatient> {
    const mappingRecipe: MappingRecipe = readMappingFile(ehrName);
    const mappedPatient: MappedPatient = {};

    for (const [internalField, fieldMapping] of typedEntries(mappingRecipe)) {
        if (internalField in rawPatient) {
            mappedPatient[fieldMapping.key] = {
                value: rawPatient[internalField],
                endpoint: fieldMapping.endpoint
            };
        }
    }

    return mappedPatient;
}

export { mapPatient };