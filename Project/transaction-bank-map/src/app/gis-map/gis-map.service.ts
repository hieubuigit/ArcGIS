import { Injectable } from '@angular/core';
import {
  district1Geo,
  points,
  streets,
  transactionBankGeos,
  wardsGeo,
} from '../share/geo-info';
import Graphic from '@arcgis/core/Graphic';
import { GisMap } from './gis-map.model';

@Injectable({
  providedIn: 'root',
})
export class GisMapService {
  readonly pointTemplate = {
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
        <strong>Tổng chi phí: </strong> <span>{totalCost} VND</span>
      </div>
      <div class="field">
        <strong>Lần bảo trì gần nhất: </strong> <span>{latestMaintain}</span>
      </div>
    </div>
    <div class="popup-buttons" style="display: flex; justify-content: end; margin: 10px 0px;">
      <div id="close-btn" style="background-color: red; color: white; padding: 5px; margin: 0 5px; border-radius: 50px; border: 1px solid red; cursor: pointer; ">Đóng PGD</div>
      <div id="edit-trans-btn" style="background-color: blue; color: white; padding: 5px; margin: 0 5px; border-radius: 50px; cursor: pointer; ">Sửa thông tin</div>
      <div id="create-maintain-btn" style="background-color: green; color: white; padding: 5px; margin: 0 5px; border-radius: 50px; cursor: pointer; ">Lên lịch bảo trì</div>
    </div>
    </div>
    `,
  };

  transPopup: GisMap.TransactionPopUp = {
    name: 'PGD-01',
    status: 'Đang hoạt động',
    upTime: '12:00 AM - 17:00 PM',
    customerQty: 100,
    employeeQty: 10,
    totalCost: 1000,
    latestMaintain: '2024-09-24',
  };

  constructor() {}

  fetchPolygons() {
    // call api here
  }
  fetchLines() {
    // call api here
  }
  fetchPoints() {
    // call api here
  }

  createGraphic = (data: any) =>
    new Graphic({
      geometry: data,
      symbol: data.symbol,
      attributes: data.attributes,
      popupTemplate: data.popupTemplate,
    });

  getPolygons() {
    return [
      {
        type: 'polygon',
        rings: wardsGeo.TanDinh,
        Name: 'Phường Tân Định',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [227, 139, 79, 0.4],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.DaKao,
        Name: 'Phường Đa Kao',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [0, 153, 0, 0.4],
          outline: {
            color: [25555255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.BenNghe,
        Name: 'Phường Bến Nghé',
        Location: 'Phường Bến Nghé',
        symbol: {
          type: 'simple-fill',
          color: [145, 145, 145, 0.4],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.BenThanh,
        Name: 'Phường Bến Thành',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [201, 79, 183, 0.4],
          outline: {
            color: [2551, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.NguyeThaiBinh,
        Name: 'Phường Nguyễn Thái Bình',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [0, 247, 255, 0.4],
          outline: {
            color: [2551, 255, 255, 0],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.PhamNguLao,
        Name: 'Phường Phạm Ngũ Lão',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [255, 157, 0, 0.4],
          outline: {
            color: [25555255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.CauOngLanh,
        Name: 'Phường Cầu Ông Lãnh',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [51, 102, 255, 0.4],
          outline: {
            color: [2557, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.CoGiang,
        Name: 'Phường Cô Giang',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [255, 251, 5, 0.4],
          outline: {
            color: [2551, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.NguyenCuTrinh,
        Name: 'Phường Nguyễn Cư Trinh',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [252, 0, 84, 0.4],
          outline: {
            color: [255, 255, 255],
            width: 1,
          },
        },
      },
      {
        type: 'polygon',
        rings: wardsGeo.CauKho,
        Name: 'Phường Cầu Kho',
        Location: '',
        symbol: {
          type: 'simple-fill',
          color: [255, 135, 163, 0.4],
          outline: {
            color: [2551, 255, 255],
            width: 1,
          },
        },
      },
    ];
  }

  getLines() {
    return [
      {
        type: 'polyline',
        paths: district1Geo,
        symbol: {
          type: 'simple-line',
          color: [226, 119, 40], // orange
          width: 2,
        },
        Name: 'Quận 1',
        Location: 'Tp. Hồ Chí Minh',
        // popupTemplate: this.point_template_area,
      },
      ...streets,
    ];
  }

  getPoints() {
    return [
      {
        type: 'point',
        latitude: points.DenGiaoThong[0],
        longitude: points.DenGiaoThong[1],
        Name: 'Đèn giao thông 1',
        Location: 'ở quận 1., TPHCM',
        symbol: {
          type: 'simple-marker',
          color: [255, 0, 0],
          outline: {
            color: [255, 0, 0],
            width: 2,
          },
        },
        attributes: this.transPopup,
        popupTemplate: this.pointTemplate,
      },
    ];
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
