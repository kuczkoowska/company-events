import {ChangeDetectionStrategy, Component, inject, OnInit, output, OutputEmitterRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ICreateRoom} from '@company/shared/models/createRoom.interface';
import {IRoom} from '@company/shared/models/room.interface';

@Component({
  selector: 'app-room-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomFormComponent implements OnInit {
  public onSubmit: OutputEmitterRef<Omit<IRoom, 'id' | 'events'>> = output();
  public onCancel: OutputEmitterRef<void> = output();

  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup<ICreateRoom>;

  public ngOnInit(): void {
    this.buildForm();
  }

  public submitHandler(): void {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.getRawValue());
      this.form.reset();
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<ICreateRoom>({
      name: new FormControl('', [Validators.required]),
      capacity: new FormControl<number | null>(null, [Validators.required, Validators.min(5)]),
      description: new FormControl(null, [Validators.maxLength(500)]),
      isAvailable: new FormControl(true, [])
    })
  }

  public onCancelHandler(): void {
    this.onCancel.emit();
  }

}
