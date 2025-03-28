import fs from 'fs';
import path from 'path';
import { MappingRecipe } from './types/mapping.type';

function getValidEHRNames(): string[] {
  const mappingsDir = path.join(__dirname, 'mappings');
  return fs.readdirSync(mappingsDir)
    .filter(file => file.endsWith('.mapping.json'))
    .map(file => file.replace('.mapping.json', ''));
}

function readMappingFile(ehrName: string): MappingRecipe {
  const mappingsDir = path.join(__dirname, 'mappings');
  const mappingFilePath = path.join(mappingsDir, `${ehrName}.mapping.json`);
  
  if (!fs.existsSync(mappingFilePath)) {
    throw new Error(`Mapping file not found: ${mappingFilePath}`);
  }
  return JSON.parse(fs.readFileSync(mappingFilePath, 'utf-8'));
}

function writeMappingFile(ehrName: string, mapping: MappingRecipe): void {
  const mappingFilePath = path.join(__dirname, 'mappings', `${ehrName}.mapping.json`);
  fs.writeFileSync(mappingFilePath, JSON.stringify(mapping, null, 2), 'utf-8');
}

function typedEntries<T extends object>(obj: T): Array<[keyof T, T[keyof T]]> {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
}

export { getValidEHRNames, readMappingFile, writeMappingFile, typedEntries }; 
