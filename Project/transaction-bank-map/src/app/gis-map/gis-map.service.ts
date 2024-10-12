import { inject, Injectable } from '@angular/core';
import { district1Geo, streets, transactionBankGeos } from '../share/geo-info';
import Graphic from '@arcgis/core/Graphic';
import { GisMap } from './gis-map.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { formatCurrency, formatDateTimeFromMilliSecond } from '../share/common';
import { TransactionOffice } from '../transaction-office/transaction-office.model';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import Point from '@arcgis/core/geometry/Point';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GisMapService {
  private readonly _http = inject(HttpClient);
  constructor() {}

  createGraphic = (data: any) =>
    new Graphic({
      geometry: data,
      symbol: data.symbol,
      attributes: data.attributes,
      popupTemplate: data.popupTemplate,
    });

  createPolygons(data: TransactionOffice.WardResponse) {
    let polygonConfigs: any = [];
    if (data.ward.length) {
      data.ward.forEach((w) => {
        const rings = JSON.parse(w.polygon);
        polygonConfigs.push({
          type: 'polygon',
          rings: rings,
          Name: w.wardName,
          Location: '',
          symbol: {
            type: 'simple-fill',
            color: [248, 250, 193, 0.25],
            outline: {
              color: [27, 99, 42, 0.7],
              width: 1,
            },
          },
        });
      });
      return polygonConfigs;
    }
  }

  redirectToBank(params: GisMap.RedirectRequest) {
    const prQuery = new HttpParams({ fromObject: { ...params } });
    return this._http.get<any>(`${environment.apiUrl}/ward/map/direction`, {params: prQuery});
  }

  createLines(data: any) {
    return [
      {
        type: 'polyline',
        paths: data,
        symbol: {
          type: 'simple-line',
          color: [8, 79, 247],
          width: 3,
        },
        Name: 'Quận 1',
        Location: 'Tp. Hồ Chí Minh',
      },
    ];
  }

  createPoints(data: TransactionOffice.CreateOrUpdate[]) {
    let points: any = [];
    if (data.length > 0) {
      data.forEach((item) => {
        const transOffStatus = TransactionOffice.transStatusInfo.find(
          (i) => i.value === Number(item.officeStatus)
        );

        let imageStatus: string = 'assets/bank.png';
        if (Number(item.officeStatus) === TransactionOffice.Status.Maintain) {
          imageStatus = 'assets/bank-gray.png';
        } else if (
          Number(item.officeStatus) === TransactionOffice.Status.Closed
        ) {
          imageStatus = 'assets/bank-black.png';
        } else if (item.countCustomer <= 10) {
          imageStatus = 'assets/bank-green.png';
        } else if (item.countCustomer > 10 && item.countCustomer < 20) {
          imageStatus = 'assets/bank-orange.png';
        } else if (item.countCustomer > 20) {
          imageStatus = 'assets/bank-red.png';
        }

        const attributePopup: GisMap.TransactionPopUp = {
          name: item.officeName,
          status: transOffStatus?.name ?? '',
          upTime: item.officeUptime,
          customerQty: item.countCustomer ?? 0,
          employeeQty: item.countEmployee ?? 0,
          totalCost: formatCurrency(item.officeCost, 'VN'),
          latestMaintain:
            formatDateTimeFromMilliSecond(item.latestMaintain).date ?? '',
        };

        const iconSymbol = new PictureMarkerSymbol({
          url: imageStatus,
          width: '30px',
          height: '30px',
        });

        points.push({
          type: 'point',
          latitude: item.latitude,
          longitude: item.longitude,
          Name: item.officeName,
          Location: item.officeAddress,
          symbol: iconSymbol,
          attributes: attributePopup,
          popupTemplate: this.createPointTemplate(item),
        });
      });
    }
    return points;
  }

  createPointTemplate(item: TransactionOffice.CreateOrUpdate) {
    return {
      title: '<div style="font-weight:700;">{name}</div>',
      content: `
        <div class="container">
        <div class="flex flex-col items-start">
          <div class="field">
            <strong>Trạng thái:</strong> <span>{status}</span>
          </div>
          <div class="field">
            <strong>Thời gian hoạt động:</strong> <span>{upTime}</span>
          </div>
          <div class="field">
            <strong>Số lượng khách hàng: </strong> <span>{customerQty}</span>
          </div>
          <div class="field">
            <strong>Số lượng nhân viên: </strong> <span>{employeeQty}</span>
          </div>
          <div class="field">
            <strong>Tổng chi phí: </strong> <span>{totalCost}</span>
          </div>
          <div class="field">
            <strong>Lần bảo trì gần nhất: </strong> <span>{latestMaintain}</span>
          </div>
        </div>
        </div>
      `,
      actions: [
        {
          id: 'close',
          type: 'button',
          title: 'Đóng PGD',
          image: 'assets/close.png',
          className: item.id,
        },
        {
          id: 'edit',
          type: 'button',
          title: 'Sửa thông tin',
          image: 'assets/pen.png',
          className: item.id,
        },
        {
          id: 'maintain',
          type: 'button',
          title: 'Lên lịch bảo trì',
          image: 'assets/repair-service.png',
          className: item.id,
        },
        {
          id: 'direction',
          type: 'button',
          title: 'Đến dây',
          image: 'assets/gps.png',
          className: {latitude: item.latitude, longitude: item.longitude},
        }
      ],
    };
  }

  addTransactionBankGeos() {
    const transactionPoints: {
      type: string;
      latitude: number;
      longitude: number;
      Name: string;
      Location: string;
      symbol: {
        type: string;
        color: number[];
        outline: { color: number[]; width: number };
      };
      popupTemplate: { title: string; content: string };
    }[] = [];
    transactionBankGeos.forEach((i, index) => {
      transactionPoints.push({
        type: 'point',
        latitude: i[0],
        longitude: i[1],
        Name: `Phòng Giao Dịch ${index}`,
        Location: `Phòng Giao Dịch ${index}`,
        symbol: {
          type: 'simple-marker',
          color: [255, 0, 238],
          outline: {
            color: [255, 0, 238],
            width: 2,
          },
        },
        popupTemplate: { title: '', content: '' },
      });
    });
    return transactionPoints;
  }

}
