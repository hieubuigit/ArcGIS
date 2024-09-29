import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { GisMap } from '../gis-map.model';

@Component({
  selector: 'app-map-info-popup',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './map-info-popup.component.html',
})
export class MapInfoPopupComponent implements OnInit {
  transPopup: GisMap.TransactionPopUp = {
    name: '',
    status: '',
    upTime: '',
    customerQty: 0,
    employeeQty: 0,
    totalCost: 0,
    latestMaintain: '',
  }

  ngOnInit(): void {
  }

}
