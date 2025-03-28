import { SubmitRequestBody } from './dtos/submit.dto';
import { MappingUpdate } from './dtos/mappings.dto';
import { getValidEHRNames } from './utils';
import { typedEntries } from './utils';

const validateSubmitRequest = (input: SubmitRequestBody): { valid: boolean; errors?: string[] } => {
    const errors: string[] = [];
    let valid = true;

    const validEHRs = getValidEHRNames();

    if (!validEHRs.includes(input.ehr)) {
        valid = false;
        errors.push(`Invalid 'ehr' value. Must be one of: ${validEHRs.join(', ')}.`);
    }

    for (const [key, value] of typedEntries(input.patient)) {
        if (!value || typeof value !== 'string' || value.trim() === '') {
            valid = false;
            errors.push(`Field '${key}' is required and must be a non-empty string.`);
            console.error(`Field '${key}' is required and must be a non-empty string.`);
        }
    }

    return { valid, errors: valid ? undefined : errors };
};

const validateMappingUpdate = (updates: MappingUpdate, ehrName: string): { valid: boolean; errors?: string[] } => {
    const errors: string[] = [];
    let valid = true;

    const validEHRs = getValidEHRNames();

    if (!validEHRs.includes(ehrName)) {
        valid = false;
        errors.push(`Invalid 'ehr' value. Must be one of: ${validEHRs.join(', ')}.`);
    }

    for (const field in updates) {
        if (!updates[field] || typeof updates[field].key !== 'string') {
            valid = false;
            errors.push(`Field '${field}' is required and must have a 'key' property of type string.`);
        }
    }

    return { valid, errors: valid ? undefined : errors };
};

export { SubmitRequestBody, validateSubmitRequest, validateMappingUpdate }; 