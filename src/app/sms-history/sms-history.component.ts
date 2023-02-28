import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Sms } from '../Sms.interface';

@Component({
  selector: 'app-sms-history',
  templateUrl: './sms-history.component.html',
  styleUrls: ['./sms-history.component.scss']
})
export class SmsHistoryComponent implements OnInit, OnChanges {

  @Input() smsList: Sms[] = [];



  ngOnInit(): void {
    console.log(this.smsList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log(this.smsList);
  }





}
