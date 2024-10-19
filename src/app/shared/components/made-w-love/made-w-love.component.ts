import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rgs-made-w-love',
  templateUrl: './made-w-love.component.html',
  styleUrls: ['./made-w-love.component.scss'],
})
export class MadeWLoveComponent  implements OnInit {

  @Input() color: string = 'gray-text';

  @Input() centered: boolean;

  constructor() { }

  ngOnInit() {}

}
