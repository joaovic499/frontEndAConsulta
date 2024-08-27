import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit {

  spinnerValue: number | undefined;

  ngOnInit(): void {
    this.spinnerValue = (1657/2000) * 100;
  }


}
