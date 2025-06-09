import {ChangeDetectionStrategy, Component, inject, OnInit, output, OutputEmitterRef, ResourceRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RoomsService} from '@company/core/services/rooms.service';
import {ICreateEventForm} from '@company/shared/models/createEvent';
import {IEvent} from '@company/shared/models/event.interface';
import {rxResource} from '@angular/core/rxjs-interop';
import {IRoom} from '@company/shared/models/room.interface';

@Component({
  selector: 'app-event-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventFormComponent implements OnInit {
  public onSubmit: OutputEmitterRef<Omit<IEvent, 'id' | 'organizer' | 'participants' | 'location'> & {
    roomId: string
  }> = output();
  public onCancel: OutputEmitterRef<void> = output();
  private readonly roomsService = inject(RoomsService);
  private readonly formBuilder = inject(FormBuilder);
  public form: FormGroup<ICreateEventForm>;

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
    this.form = this.formBuilder.group<ICreateEventForm>({
      name: new FormControl('', [Validators.required]),
      date: new FormControl<Date | null>(null, [Validators.required]),
      eventStart: new FormControl('', [Validators.required]),
      eventEnd: new FormControl('', [Validators.required]),
      roomId: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(1000)]),
      tags: new FormControl<string[] | null>(null),
      maxParticipants: new FormControl<number | null>(null, [Validators.min(1)])
    });
  }

  public roomsResource: ResourceRef<IRoom[]> = rxResource({
    loader: () => this.roomsService.getAllRooms()
  });


  public onCancelHandler(): void {
    this.onCancel.emit();
  }
}
