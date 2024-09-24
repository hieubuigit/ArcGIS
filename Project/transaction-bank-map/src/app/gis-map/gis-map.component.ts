import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import { MatButtonModule } from '@angular/material/button';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Color from '@arcgis/core/Color';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateOrUpdateBankBranchPopupComponent } from './create-or-update-bank-branch-popup/create-or-update-bank-branch-popup.component';
import { PopUpType, SelectItem } from '../share/common';
import { UserType } from '../user-management/user-management.model';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmComponent } from '../share/confirm.component';
import { UpdatePasswordComponent } from '../user-authentication/update-password/update-password.component';
import { GisMapService } from './gis-map.service';
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatMenuModule,
    MatCheckboxModule,
  ],
  providers: [GisMapService],
  templateUrl: './gis-map.component.html',
})
export class GisMapComponent implements OnInit {
  userType: UserType = UserType.Admin;
  userTypes = UserType;
  private view!: MapView;
  private dialogRef!: MatDialogRef<ConfirmComponent>;
  descriptionItems : SelectItem<string>[] = [
    {name: 'Ít', value: 'blue'},
    {name: 'Vừa', value: 'orange'},
    {name: 'Đông đảo', value: 'red'},
    {name: 'Bảo trì', value: 'gray'},
    {name: 'Đóng cửa', value: 'black'},
  ];

  constructor(
    private _dialog: MatDialog,
    private _router: Router,
    private _gisMapSvc: GisMapService
  ) {}

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

    const graphicsLayer = new GraphicsLayer();
    this._gisMapSvc.getPolygons().forEach((data) => {
      graphicsLayer.add(this._gisMapSvc.createGraphic(data));
    });

    this._gisMapSvc.getLines().forEach((data) => {
      graphicsLayer.add(this._gisMapSvc.createGraphic(data));
    });

    this._gisMapSvc.getPoints().forEach((data) => {
      graphicsLayer.add(this._gisMapSvc.createGraphic(data));
    });

    // Add Icon to map
    // const iconGraphic = new Graphic({
    //   geometry: {},
    //   symbol: new PictureMarkerSymbol({
    //     url: 'assets/bank.png',
    //     width: '28px',
    //     height: '28px',
    //   }),
    //   attributes: {},
    //   popupTemplate: {
    //     title: 'Bank Information',
    //     content: 'This is a bank info',
    //   },
    // });

    // this._gisMapSvc.addTransactionBankGeos().forEach((point) => {
    //   graphicsLayer.add(iconGraphic);
    // });

    map.add(graphicsLayer);
  }

  onCloseTransaction(): void {
    this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có chắc chắn muốn phòng giao dịch này không? `,
        content:
          'Hành động này không thể hoàn tác.PGD sẽ bị xóa ra khỏi hệ thống vĩnh viễn.',
        popupType: PopUpType.Delete,
      },
    });
  }

  onAddTrans(): void {
    this._dialog.open(CreateOrUpdateBankBranchPopupComponent, {
      width: '700px',
      data: { popupType: PopUpType.Add },
    });
  }

  maintainList() {
    this._router.navigate(['/maintain-transaction-list']);
  }

  onTransaction() {
    this._router.navigate(['/transaction-management']);
  }

  onUser() {
    console.log('user clicked');
  }

  onUserManagement() {
    this._router.navigate(['user-management']);
  }

  onChangePass() {
    const dialogRef = this._dialog.open(UpdatePasswordComponent, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((resp) => {
      console.log(resp);
    });
  }

  onLogOut() {
    const dialogRef = this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có muốn đăng xuất?`,
        content: '',
        popupType: PopUpType.Logout,
      },
    });

    dialogRef.afterClosed().subscribe((resp) => {
      console.log(resp);
    });
  }
}
