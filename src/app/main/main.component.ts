import { Component } from '@angular/core';
import { Sms } from '../Sms.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  smsList: Sms[] = []

  onSendSms(event: any) {
    this.smsList = event;
  }

}
