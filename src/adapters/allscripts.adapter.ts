import { EHRAdapter } from '../types/ehrAdapter.type';
import { GroupedPatient, MappedPatient, GroupedFields } from '../types/patient.type';
import { typedEntries } from '../utils';

const endpointRegistry = {
    info: '/info',
    insurance: '/insurance',
    history: '/history',
};

type EndpointKeys = keyof typeof endpointRegistry;

const submissionEndpoints: Record<EndpointKeys, (data: GroupedFields) => Promise<void>> = {
    info: async (data) => console.info(`Sending patient info to Allscripts:`, data),
    insurance: async (data) => console.info(`Sending insurance info to Allscripts:`, data),
    history: async (data) => console.info(`Sending medical history to Allscripts:`, data),
};

const allscriptsAdapter: EHRAdapter = {
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

        return 'Data submitted successfully to Allscripts';
    },
};

export default allscriptsAdapter;
