import { Request, Response } from 'express';
import { validateSubmitRequest, SubmitRequestBody, validateMappingUpdate } from './validation';
import { mapPatient } from './service';
import { adapterRegistry } from './adapters/adapterRegistry';
import { MappingUpdate } from './dtos/mappings.dto';
import { readMappingFile, writeMappingFile } from './utils';

const controller = {
  async submit(req: Request, res: Response): Promise<void> {
    const input: SubmitRequestBody = req.body;
    const { valid, errors } = validateSubmitRequest(input);

    if (!valid) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    try {
      const mappedPatient = await mapPatient(input.patient, input.ehr);
      const adapter = adapterRegistry[input.ehr];
      if (!adapter) {
        res.status(400).json({ message: 'Unsupported EHR provider' });
        return;
      }

      const submitResponse = await adapter.submitPatient(mappedPatient);
      res.status(200).json({ message: submitResponse });
    } catch (error) {
      res.status(500).json({ message: 'Error processing request', error: (error as Error).message });
    }
  },

  async getMapping(req: Request, res: Response): Promise<void> {
    const ehrSystem = req.params.ehr;
    try {
      const mapping = readMappingFile(ehrSystem);
      res.status(200).json(mapping);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Mapping file not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  async updateMapping(req: Request, res: Response): Promise<void> {
    const ehrSystem = req.params.ehr;
    const updates: MappingUpdate = req.body;

    const { valid, errors } = validateMappingUpdate(updates, ehrSystem);
    if (!valid) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    try {
      const existingMapping = readMappingFile(ehrSystem);
      const updatedMapping = { ...existingMapping, ...updates };

      console.info(`Updating mapping for EHR system: ${ehrSystem}`);

      writeMappingFile(ehrSystem, updatedMapping);

      res.status(200).json(updatedMapping);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Mapping file not found')) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },
};

export { controller }; 