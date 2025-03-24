import { Service } from './service';

const service = new Service();

const controller = {
  async handle(): Promise<void> {
    console.log('Controller: Handling');
    await service.process();
  }
};

export { controller }; 