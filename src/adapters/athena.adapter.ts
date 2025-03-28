import { EHRAdapter } from '../types/ehrAdapter.type';
import { MappedPatient, GroupedPatient, GroupedFields } from '../types/patient.type';
import { typedEntries } from '../utils';

const endpointRegistry = {
    details: '/details',
    coverage: '/coverage',
    records: '/records',
};

type EndpointKeys = keyof typeof endpointRegistry;

const submissionEndpoints: Record<EndpointKeys, (data: GroupedFields) => Promise<void>> = {
    details: async (data) => console.info(`Sending patient details to Athena:`, data),
    coverage: async (data) => console.info(`Sending coverage info to Athena:`, data),
    records: async (data) => console.info(`Sending medical records to Athena:`, data),
};

const athenaAdapter: EHRAdapter = {
    async submitPatient(mappedData: MappedPatient<EndpointKeys>): Promise<string> {
        const groupedPatient: GroupedPatient<EndpointKeys> = {};

        for (const [key, field] of typedEntries(mappedData)) {
            const endpoint = field.endpoint;
            if (endpoint) {
                if (!groupedPatient[endpoint]) {
                    groupedPatient[endpoint] = {};
                }
                groupedPatient[endpoint][key] = field.value;
            }
        }

        for (const [endpoint, fields] of typedEntries(groupedPatient)) {
            if (endpoint in submissionEndpoints) {
                if (fields) {
                    await submissionEndpoints[endpoint](fields);
                }
            } else {
                throw new Error(`Unsupported endpoint: ${endpoint}`);
            }
        }

        return 'Data submitted successfully to Athena';
    },
};

export default athenaAdapter;
