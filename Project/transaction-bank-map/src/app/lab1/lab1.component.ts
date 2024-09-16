import { Component, OnInit } from '@angular/core';
import { district1Geo, points, streets, transactionBankGeos, wardsGeo } from '../share/geo-info';

@Component({
  selector: 'app-lab1',
  standalone: true,
  imports: [],
  templateUrl: './lab1.component.html',
  styleUrl: './lab1.component.scss'
})
export class Lab1Component implements OnInit {

  constructor(){}

  ngOnInit(): void {
    this.addTransactionBankGeos();
  }

point_template_tree = {
  title: "{Name}",
  content: "{Location}</b>.",
};
point_template_area = {
  title: "{Name}",
  content: "{Location}</b>.",
};
point_template_university = {
  title: "{Name}",
  content: "{Location}</b>.",
};

commonCnf = {
  lineColor: [255, 255, 255],
};

polygons = [
  {
    type: "polygon",
    rings: wardsGeo.TanDinh,
    Name: "Phường Tân Định",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [227, 139, 79, 0.4],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.DaKao,
    Name: "Phường Đa Kao",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [0, 153, 0, 0.4],
      outline: {
        color: [25555255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.BenNghe,
    Name: "Phường Bến Nghé",
    Location: "Phường Bến Nghé",
    symbol: {
      type: "simple-fill",
      color: [145, 145, 145, 0.4],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.BenThanh,
    Name: "Phường Bến Thành",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [201, 79, 183, 0.4],
      outline: {
        color: [2551, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.NguyeThaiBinh,
    Name: "Phường Nguyễn Thái Bình",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [0, 247, 255, 0.4],
      outline: {
        color: [2551, 255, 255, 0],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.PhamNguLao,
    Name: "Phường Phạm Ngũ Lão",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [255, 157, 0, 0.4],
      outline: {
        color: [25555255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.CauOngLanh,
    Name: "Phường Cầu Ông Lãnh",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [51, 102, 255, 0.4],
      outline: {
        color: [2557, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.CoGiang,
    Name: "Phường Cô Giang",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [255, 251, 5, 0.4],
      outline: {
        color: [2551, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.NguyenCuTrinh,
    Name: "Phường Nguyễn Cư Trinh",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [252, 0, 84, 0.4],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: wardsGeo.CauKho,
    Name: "Phường Cầu Kho",
    Location: "",
    symbol: {
      type: "simple-fill",
      color: [255, 135, 163, 0.4],
      outline: {
        color: [2551, 255, 255],
        width: 1,
      },
    },
    // popupTemplate: point_template_university,
  },
];

// const points = [
//   {
//     type: "point",
//     latitude: points.DenGiaoThong[0],
//     longitude: points.DenGiaoThong[1],
//     Name: "Đèn giao thông 1",
//     Location: "ở quận 1., TPHCM",
//     symbol: {
//       type: "simple-marker",
//       color: [255, 0, 0],
//       outline: {
//         color: [255, 0, 0],
//         width: 2,
//       },
//     },
//     // popupTemplate: point_template_tree,
//   },
//   {
//     type: "point",
//     latitude: points.DinhDocLap[0],
//     longitude: points.DinhDocLap[1],
//     Name: "Dinh Độc Lập",
//     Location: "Dinh Độc Lập",
//     symbol: {
//       type: "simple-marker",
//       color: [0, 255, 51],
//       outline: {
//         color: [0, 255, 51],
//         width: 4,
//       },
//     },
//     // popupTemplate: point_template_tree,
//   },
//   {
//     type: "point",
//     latitude: points.ThapCham[0],
//     longitude: points.ThapCham[1],
//     Name: "Tháp Chàm",
//     Location: "Tháp Chàm",
//     symbol: {
//       type: "simple-marker",
//       color: [2, 31, 247],
//       outline: {
//         color: [2, 31, 247],
//         width: 2,
//       },
//     },
//     popupTemplate: point_template_tree,
//   },
// ];

addTransactionBankGeos() {
  const transactionPoints = [];
  transactionBankGeos.forEach((i, index) => {
    transactionPoints.push({
      type: "point",
      latitude: i[0],
      longitude: i[1],
      Name: `Phòng Giao Dịch ${index}`,
      Location: `Phòng Giao Dịch ${index}`,
      symbol: {
        type: "simple-marker",
        color: [255, 0, 238],
        outline: {
          color: [255, 0, 238],
          width: 2,
        },
      },
      // popupTemplate: point_template_tree,
    });
  });
};

lines = [
  {
    type: "polyline",
    paths: district1Geo,
    symbol: {
      type: "simple-line",
      color: [226, 119, 40], // orange
      width: 2,
    },
    Name: "Quận 1",
    Location: "Tp. Hồ Chí Minh",
    // popupTemplate: point_template_area,
  },
  ...streets,
];

// jsondata = {
//   points,
//   lines,
//   polygons,
// };

// require([
//   "esri/Map",
//   "esri/views/MapView",
//   "esri/Graphic",
//   "esri/layers/GraphicsLayer",
//   "esri/symbols/PictureMarkerSymbol",
// ], function (Map, MapView, Graphic, GraphicsLayer, PictureMarkerSymbol) {
//   // Create map
//   const map = new Map({
//     basemap: "topo-vector",
//   });

//   map.on("load", function () {
//     map.graphics.enableMouseEvents();
//   });

//   // Init Map View
//   const view = new MapView({
//     container: "viewDiv",
//     map: map,
//     center: [106.703362, 10.776971], // Tọa độ trung tâm của Quận 1
//     zoom: 14,
//     highlightOptions: {
//       color: "blue",
//     },
//   });

//   const createGraphic = function (data) {
//     return new Graphic({
//       geometry: data,
//       symbol: data.symbol,
//       attributes: data,
//       popupTemplate: data.popupTemplate,
//     });
//   };

//   // Add Icon to map
//   const bankIcon = new PictureMarkerSymbol({
//     url: "../assets/bank.png", // URL to your icon image
//     width: "28px",
//     height: "28px",
//   });
//   const iconGraphic = function (data) {
//     return new Graphic({
//       geometry: data,
//       symbol: bankIcon,
//       attributes: data,
//       popupTemplate: data.popupTemplate,
//     });
//   };

//   const graphicsLayer = new GraphicsLayer();

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

//   map.add(graphicsLayer);

//   view
//     .when(() => {
//       console.log("Map and view are loaded.");
//     })
//     .catch((error) => {
//       console.error("Error loading map or view:", error);
//     });
// });


}
