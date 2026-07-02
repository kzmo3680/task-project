import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../../app-routing.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone : true,
  imports: [RouterOutlet],
})
export class LayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
