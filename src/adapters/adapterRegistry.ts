import allscriptsAdapter from './allscripts.adapter';
import athenaAdapter from './athena.adapter';
import { EHRAdapter } from '../types/ehrAdapter.type';

const adapters = {
    allscripts: allscriptsAdapter,
    athena: athenaAdapter,
};

type ehrKeys = keyof typeof adapters;

const adapterRegistry: Record<ehrKeys, EHRAdapter> = adapters;

export { adapterRegistry, ehrKeys }; 