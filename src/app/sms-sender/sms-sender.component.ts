import {Component, EventEmitter, NgZone, Output, ViewChild} from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { SmsServiceService } from '../sms-service.service';
import { tap } from 'rxjs/operators';
import { Sms } from '../Sms.interface';


// interface Sms {
//   phoneNumber: string;
//   message: string;
// }

type SmsControls = { [key in keyof Sms]: AbstractControl };
type SmsFormGroup = FormGroup & { value: Sms, controls: SmsControls };

@Component({
  selector: 'app-sms-sender',
  templateUrl: './sms-sender.component.html',
  styleUrls: ['./sms-sender.component.scss']
})
export class SmsSenderComponent {
  @Output() sendSms: EventEmitter<any> = new EventEmitter<any>();
  smsEntries: Sms[] = []

  constructor(private smsService: SmsServiceService) {}

  smsForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]{6,}')]),
    message: new FormControl('', Validators.required)
  } as SmsControls) as SmsFormGroup;

  clearForm() {
    this.smsForm.reset();
  }

  onSubmit(){
    const phoneNumber: string = this.smsForm.value.phoneNumber;
    const message = this.smsForm.value.message;
    this.smsService.sendSms(this.smsForm.value.phoneNumber, this.smsForm.value.message).subscribe(response => {
      console.log(response);
      this.smsForm.reset();
      this.smsEntries.push({phoneNumber,message, timestamp: Date.now()})
      this.sendSms.emit(this.smsEntries);
    })

  }
}
