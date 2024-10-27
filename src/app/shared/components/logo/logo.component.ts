import { Component, Input, OnInit } from '@angular/core';
import { ILang } from '../../models/ILang';

@Component({
  selector: 'rgs-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {

  @Input() asLink: boolean = false;
  @Input() route: string | string[];

  @Input() size: string;
  @Input() currentLanguage: ILang;

  constructor(

  ) { }

  ngOnInit() {}

}
