import { CommonModule } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
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
import Color from '@arcgis/core/Color';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateOrUpdateBankBranchPopupComponent } from './create-or-update-bank-branch-popup/create-or-update-bank-branch-popup.component';
import { PopUpType, SelectItem } from '../share/common';
import { UserType } from '../user-management/user-management.model';
import { MatMenuModule } from '@angular/material/menu';
import { ConfirmComponent } from '../share/confirm.component';
import { UpdatePasswordComponent } from '../user-authentication/update-password/update-password.component';
import { GisMapService } from './gis-map.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LocalStorageService } from '../share/local-storage/local-storage.service';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import MapView from '@arcgis/core/views/MapView';
import { TransactionOfficeService } from '../transaction-office/transaction-office.service';
import { TransactionOffice } from '../transaction-office/transaction-office.model';
import { HttpClientModule } from '@angular/common/http';

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
  providers: [GisMapService, LocalStorageService, TransactionOfficeService],
  templateUrl: './gis-map.component.html',
  styleUrl: './gis-map.component.scss',
})
export class GisMapComponent implements OnInit, AfterViewInit {
  userType: UserType = UserType.Admin;
  userTypes = UserType;
  view!: MapView;
  @ViewChild('mapViewNode', { static: true })
  private readonly mapViewEl!: ElementRef;

  private readonly dialogRef!: MatDialogRef<ConfirmComponent>;
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

  constructor(
    private readonly _dialog: MatDialog,
    private readonly _router: Router,
    private readonly _gisMapSvc: GisMapService,
    private readonly _ls: LocalStorageService,
    private readonly _transOffSvc: TransactionOfficeService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this._ls.isExistToken();
    for (let index = this.min; index < this.max; index++) {
      this.year.push(index);
    }
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

    const graphicsLayer = new GraphicsLayer();
    this._gisMapSvc.getPolygons().forEach((data) => {
      graphicsLayer.add(this._gisMapSvc.createGraphic(data));
    });

    // this._gisMapSvc.getLines().forEach((data) => {
    //   graphicsLayer.add(this._gisMapSvc.createGraphic(data));
    // });

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

    // Click event to show the popup
    this.view.when(() => {
      this.view.on('click', (event) => {
        this.view.hitTest(event).then((response) => {
          if (response.results.length > 0) {
            const graphic = (response.results[0] as any)?.graphic;
            if (graphic) {
              this.onEditButton();
            }
          }
        });
      });
    });
  }

  private onEditButton() {
    setTimeout(() => {

      const content = this.view.popup.viewModel.content;
      // console.log(content);
      debugger

      if (typeof content === 'string') {
        // const button = (content as HTMLElement).querySelector('#edit-trans-btn');
        // console.log(button);

        const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;

            // Now we can use querySelector on the temporary div
            const editButton = tempDiv.querySelector('#edit-trans-btn');
            if (editButton) {
                editButton.addEventListener('click', () => {
                    alert('Edit button clicked!'); // Handle the button click
                    this.view.popup.close(); // Optionally close the popup
                });
            }

        // if (button) {
        //   button.addEventListener('click', () => {
        //     console.log('hello');
        //   });
        // }
      }
    }, 0);
  }

  onCloseTransaction(): void {
    this._dialog.open(ConfirmComponent, {
      width: '700px',
      data: {
        title: `Bạn có chắc chắn muốn đóng phòng giao dịch này không? `,
        content:
          'Hành động này không thể hoàn tác.PGD sẽ bị xóa ra khỏi hệ thống vĩnh viễn.',
        popupType: PopUpType.Delete,
      },
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
          value.countEmployee;
          this._transOffSvc.create(value).subscribe({
            next: (result) => {
              // Reload map here. show new transaction on map
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
}
