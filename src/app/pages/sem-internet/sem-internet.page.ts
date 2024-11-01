import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'anfitrion-sem-internet',
  templateUrl: './sem-internet.page.html',
  styleUrls: ['./sem-internet.page.scss'],
})
export class SemInternetPage implements OnInit {

  constructor(
    private title : Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Sem internet')
  }

}
