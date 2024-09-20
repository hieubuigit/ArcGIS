import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import { MatButtonModule } from '@angular/material/button';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Color from '@arcgis/core/Color';
import { CloseTransactionPopupComponent } from './close-transaction-popup/close-transaction-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateOrUpdateBankBranchPopupComponent } from './create-or-update-bank-branch-popup/create-or-update-bank-branch-popup.component';

@Component({
  selector: 'app-guest-map',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatInputModule,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './gis-map.component.html',
  styleUrl: './gis-map.component.scss',
})
export class GisMapComponent implements OnInit {
  @Input() isAdmin = true;
  private view!: MapView;
  private dialogRef!: MatDialogRef<CloseTransactionPopupComponent>;

  constructor(private _dialog: MatDialog, private _router: Router) {}

  ngOnInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    // Create map
    const map = new Map({
      basemap: 'topo-vector',
    });

    // Create a new MapView
    this.view = new MapView({
      container: 'mapViewDiv',
      map: map,
      center: [106.703362, 10.776971],
      zoom: 14,
      highlightOptions: {
        color: new Color([255, 0, 0, 0.5]),
      },
    });

    // const createGraphic = new Graphic({
    //   geometry: {},
    //   symbol: {},
    //   attributes: {},
    //   popupTemplate: {},
    // });

    // Add Icon to map
    const bankIcon = new PictureMarkerSymbol({
      url: '../assets/bank.png', // URL to your icon image
      width: '28px',
      height: '28px',
    });

    // const iconGraphic = new Graphic({
    //   geometry: {},
    //   symbol: bankIcon,
    //   attributes: {},
    //   popupTemplate: {},
    // });

    const graphicsLayer = new GraphicsLayer();

    //   jsondata.polygons.forEach(function (data) {
    //     graphicsLayer.add(createGraphic(data));
    //   });
    //   jsondata.lines.forEach(function (data) {
    //     graphicsLayer.add(createGraphic(data));
    //   });
    //   jsondata.points.forEach(function (data) {
    //     graphicsLayer.add(createGraphic(data));
    //   });
    //   transactionPoints.forEach(function (point) {
    //     graphicsLayer.add(iconGraphic(point));
    //   });

    map.add(graphicsLayer);
  }

  onOpenAddTransaction(): void {
    this._dialog.open(CloseTransactionPopupComponent, {
      width: '700px',
    });
  }

  onAddTrans(): void {
    this._dialog.open(CreateOrUpdateBankBranchPopupComponent, {
      width: '700px',
    });
  }

  maintainList() {
    this._router.navigate(['/transaction-list'])
  }

  onTicket() {}

  onUser() {}
}
