import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'anfitrion-adsense',
  templateUrl: './adsense.component.html',
  styleUrls: ['./adsense.component.scss'],
})
export class AdsenseComponent  implements OnInit {

  @Input() color: string = 'gray-ec';

  constructor() { }

  ngOnInit() {}

}
