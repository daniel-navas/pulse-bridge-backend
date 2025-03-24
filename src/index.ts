import { controller } from './controller';

async function main(): Promise<void> {
  console.log('Main: Starting application');
  await controller.handle();
}

main(); 