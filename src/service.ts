import { utils } from './utils';

class Service {
  async process(): Promise<void> {
    console.log('Service: Processing');
    utils.transform();
  }
}

export { Service }; 