import { Component } from '@angular/core';

import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

  export class HeaderComponent { 
    constructor(title: Title) {  }
   }
