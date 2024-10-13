import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Map from '@arcgis/core/Map';
import { MatButtonModule } from '@angular/material/button';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateBankBranchPopupComponent } from './create-or-update-bank-branch-popup/create-or-update-bank-branch-popup.component';
import { PopUpType, SelectItem } from '../share/common';
import { UserType } from '../user-management/user-management.model';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmComponent } from '../share/confirm.component';
import { UpdatePasswordComponent } from '../user-authentication/update-password/update-password.component';
import { GisMapService } from './gis-map.service';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { LocalStorageService } from '../share/local-storage/local-storage.service';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import MapView from '@arcgis/core/views/MapView';
import { TransactionOfficeService } from '../transaction-office/transaction-office.service';
import { TransactionOffice } from '../transaction-office/transaction-office.model';
import { HttpClientModule } from '@angular/common/http';
import { on } from '@arcgis/core/core/reactiveUtils';
import { MaintainTransactionListService } from '../maintain-transaction-list/maintain-transaction-list.service';
import { CreateOrUpdateScheduleMaintainPopupComponent } from '../maintain-transaction-list/create-or-update-schedule-maintain-popup/create-or-update-schedule-maintain-popup.component';
import { MaintainTransaction } from '../maintain-transaction-list/maintain-transaction-list.model';
import {
  SnackbarService,
  SnackbarStatus,
} from '../share/ui/snackbar-notification/snackbar.service';
import Graphic from '@arcgis/core/Graphic';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import Point from '@arcgis/core/geometry/Point';
import { GisMap } from './gis-map.model';

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
    MatSliderModule,
    FormsModule,
    MatDividerModule,
    HttpClientModule,
  ],
  providers: [
    GisMapService,
    LocalStorageService,
    TransactionOfficeService,
    MaintainTransactionListService,
    SnackbarService,
  ],
  templateUrl: './gis-map.component.html',
  styleUrl: './gis-map.component.scss',
})
export class GisMapComponent implements OnInit, AfterViewInit {
  userType: UserType = UserType.Admin;
  userTypes = UserType;
  view!: MapView;
  graphicsLayer = new GraphicsLayer();
  pointGraphicsLayer = new GraphicsLayer();
  locationLayer = new GraphicsLayer();
  directionLayer = new GraphicsLayer();
  @ViewChild('mapViewNode', { static: true })
  isAdmin = false;
  descriptionItems: SelectItem<string>[] = [
    { name: 'Ít', value: 'bg-blue-500' },
    { name: 'Vừa', value: 'bg-orange-500' },
    { name: 'Đông đảo', value: 'bg-red-500' },
    { name: 'Bảo trì', value: 'bg-gray-500' },
    { name: 'Đóng cửa', value: 'bg-black' },
  ];

  year: number[] = [];
  chooseYear = new Date().getFullYear();
  max = this.chooseYear;
  min = this.max - 10;
  step = 1;
  showClosedTransaction: boolean = false;
  wards = signal<TransactionOffice.Ward[]>([]);
  transactionOffices = signal<TransactionOffice.CreateOrUpdate[]>([]);
  yourLocation!: GisMap.APoint;
  directionData!: GisMap.RedirectRequest;
  isShowRedirect: boolean = false;

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _gisMapSvc: GisMapService,
    private readonly _ls: LocalStorageService,
    private readonly _transOffSvc: TransactionOfficeService,
    private readonly _maintainSvc: MaintainTransactionListService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._ls.isExistToken();
    console.log(this.isAdmin);

    for (let index = this.min; index < this.max; index++) {
      this.year.push(index);
    }

    this.getAllTransactionOfficeAndCreatePoints();
    this.getAllWardAndCreatePolygons();
    this.getCurrentLocation();
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap() {
    const map = new Map({
      basemap: 'topo-vector',
    });

    // Create a new MapView
    this.view = new MapView({
      container: 'mapView',
      map: map,
      center: [106.703362, 10.776971],
      zoom: 14,
    });

    this.setupPopupClickHandler();
    map.add(this.graphicsLayer);
    map.add(this.pointGraphicsLayer);
    map.add(this.locationLayer);
    map.add(this.directionLayer);
  }

  private handleMapClick(event: Point) {
    const locationIcon = new PictureMarkerSymbol({
      url: 'assets/gps.png',
      width: '30px',
      height: '30px',
    });

    const pointGraphic = new Graphic({
      geometry: new Point(event),
      symbol: locationIcon,
    });
    this.locationLayer.removeAll();
    this.locationLayer.add(pointGraphic);
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.yourLocation = { latitude: latitude, longitude: longitude };
          this.handleMapClick(
            new Point({ latitude: latitude, longitude: longitude })
          );
        },
        (error) => {
          switch (error.code) {
            case 1:
              return 'Permission denied.';
            case 2:
              return 'Position unavailable.';
            case 3:
              return 'Timeout.';
            default:
              return 'An unknown error occurred.';
          }
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getStreet(destination: GisMap.APoint) {
    const modelRequest: GisMap.RedirectRequest = {
      origin: `${this.yourLocation.latitude},${this.yourLocation.longitude}`,
      destination: `${destination.latitude},${destination.longitude}`,
    };
    this.directionData = modelRequest;
    this._gisMapSvc.redirectToBank(modelRequest).subscribe({
      next: (resp) => {
        const streetLine = this._gisMapSvc.createLines(resp['data']);
        this.directionLayer.removeAll();
        streetLine.forEach((tr: any) => {
          this.directionLayer.add(this._gisMapSvc.createGraphic(tr));
        });
      },
      error: (err) => {},
    });
  }

  getAllTransactionOfficeAndCreatePoints() {
    this._transOffSvc
      .getPaging({ page: 1, pageSize: 9999 })
      .subscribe((resp) => {
        if (!resp.data) return;

        // Update year to show by control
        resp.data.transactionOffices.forEach((trans) => {
          const date = new Date(trans.createdAt * 1000);
          trans.yearCreated = date.getFullYear();
        });

        this.transactionOffices.set(resp.data.transactionOffices);
        let transOffices = resp.data.transactionOffices.filter(
          (i) =>
            (this.showClosedTransaction ||
              (!this.showClosedTransaction &&
                Number(i.officeStatus) !== TransactionOffice.Status.Closed)) &&
            i.yearCreated === this.chooseYear
        );

        this.pointGraphicsLayer.removeAll();
        const transPoint = this._gisMapSvc.createPoints(transOffices);
        transPoint.forEach((tr: TransactionOffice.CreateOrUpdate) => {
          this.pointGraphicsLayer.add(this._gisMapSvc.createGraphic(tr));
        });
      });
  }

  getAllWardAndCreatePolygons() {
    this._transOffSvc.getWard().subscribe({
      next: (resp) => {
        if (resp.data) {
          const wardPolygons = this._gisMapSvc.createPolygons(resp.data);
          wardPolygons.forEach((tr: any) => {
            this.graphicsLayer.add(this._gisMapSvc.createGraphic(tr));
          });
        }
      },
      error: (err) => {},
    });
  }

  setupPopupClickHandler() {
    on(
      () => this.view.popup,
      'trigger-action',
      (event) => {
        if (event.action.id) {
          switch (event.action.id) {
            case 'close':
              this.onCloseTransaction(event.action.className);
              break;
            case 'edit':
              this.onEditTrans(event.action.className);
              break;
            case 'maintain':
              this.onAddMaintain(event.action.className);
              break;
            case 'direction':
              this.getStreet(event.action.className as Point);
              this.isShowRedirect = true;
              break;
          }
        }
      }
    );
  }

  onCloseTransaction(id: string): void {
    let transOffices = this.transactionOffices().find((i) => i.id === id);
    if (!transOffices) {
      return;
    }
    const dialogRef = this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có chắc chắn muốn đóng phòng giao dịch này không? `,
        content:
          'Hành động này không thể hoàn tác.PGD sẽ bị xóa ra khỏi hệ thống vĩnh viễn.',
        popupType: PopUpType.Delete,
      },
    });
    dialogRef.afterClosed().subscribe((isAccept) => {
      if (isAccept && transOffices) {
        transOffices.officeStatus = TransactionOffice.Status.Closed.toString();
        this._transOffSvc.update(id, transOffices).subscribe({
          next: (result) => {
            this.getAllTransactionOfficeAndCreatePoints();
          },
          error: (err) => {
          },
        });
      }
    });
  }

  onEditTrans(id: string): void {
    const rowData = this.transactionOffices().find((i) => i.id === id);
    if (!rowData) {
      return;
    }
    const dialogRef = this._dialog.open(
      CreateOrUpdateBankBranchPopupComponent,
      {
        width: '700px',
        data: { popupType: PopUpType.Update, rowData: rowData },
      }
    );
    dialogRef
      .afterClosed()
      .subscribe((value: TransactionOffice.CreateOrUpdate) => {
        if (value) {
          console.log(value);

          rowData.officeName = value.officeName;
          rowData.officeAddress = value.officeAddress;
          rowData.officeDescriptions = value.officeDescriptions;
          rowData.wardId = value.wardId ?? '';
          rowData.officeStatus = value.officeStatus;
          rowData.officeUptime = value.officeUptime;
          rowData.officeCost = value.officeCost;
          rowData.latitude = value.latitude;
          rowData.longitude = value.longitude;

          this._transOffSvc.update(rowData.id, rowData).subscribe({
            next: (result) => {
              this.getAllTransactionOfficeAndCreatePoints();
            },
            error: (err) => {
            },
          });
        }
      });
  }

  onAddMaintain(id: string) {
    this._maintainSvc.getCode().subscribe({
      next: (resp) => {
        if (resp) {
          const dialogRef = this._dialog.open(
            CreateOrUpdateScheduleMaintainPopupComponent,
            {
              width: '700px',
              data: { popupType: PopUpType.Add, code: resp.data },
            }
          );
          dialogRef
            .afterClosed()
            .subscribe((value: MaintainTransaction.Response) => {
              if (value) {
                value.officeId = id;
                value.maintenaceStatus =
                  MaintainTransaction.MaintainStatus.Doing;
                this._maintainSvc.create(value).subscribe({
                  next: (result) => {
                    this.getAllTransactionOfficeAndCreatePoints();
                  },
                  error: (err) => {
                  },
                });
              }
            });
        }
      },
      error: (err) => {},
    });
  }

  onAddTrans(): void {
    const dialogRef = this._dialog.open(
      CreateOrUpdateBankBranchPopupComponent,
      {
        width: '700px',
        data: { popupType: PopUpType.Add },
      }
    );
    dialogRef
      .afterClosed()
      .subscribe((value: TransactionOffice.CreateOrUpdate) => {
        if (value) {
          // value.countEmployee;
          this._transOffSvc.create(value).subscribe({
            next: (result) => {
              this.getAllTransactionOfficeAndCreatePoints();
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
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
      // Call api update password here
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
      if (resp) {
        this._ls.clearCurrentUser();
        this._router.navigate(['admin']);
      }
    });
  }

  onShowClosed(event: MatCheckboxChange) {
    this.showClosedTransaction = event.checked;
    this.getAllTransactionOfficeAndCreatePoints();
  }

  onDirection(isClose: boolean) {
    if (isClose) {
      this.directionLayer.removeAll();
      this.isShowRedirect = false;
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${this.directionData.origin}&destination=${this.directionData.destination}`;
      window.open(url, '_blank');
    }
  }

  onChooseYearChange(year: any) {
    console.log(year);
    this.pointGraphicsLayer.removeAll();
    let transOffices: TransactionOffice.CreateOrUpdate[];
    transOffices = this.transactionOffices().filter(
      (i) =>
        (this.showClosedTransaction ||
          (!this.showClosedTransaction &&
            Number(i.officeStatus) !== TransactionOffice.Status.Closed)) &&
        i.yearCreated === this.chooseYear
    );
    this.pointGraphicsLayer.removeAll();
    const transPoint = this._gisMapSvc.createPoints(transOffices);
    transPoint.forEach((tr: TransactionOffice.CreateOrUpdate) => {
      this.pointGraphicsLayer.add(this._gisMapSvc.createGraphic(tr));
    });
  }
}
