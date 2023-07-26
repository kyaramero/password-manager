import { Dummy } from '@models/Dummy';

export class DummyController {
  teste() {
    const dummy = new Dummy();

    console.log(dummy);
  }
}
