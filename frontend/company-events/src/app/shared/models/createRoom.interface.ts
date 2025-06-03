import {FormControl} from '@angular/forms';

export interface ICreateRoom {
  name: FormControl<string>;
  capacity: FormControl<number>;
  description?: FormControl<string>;
  isAvailable?: FormControl<boolean>;
}
