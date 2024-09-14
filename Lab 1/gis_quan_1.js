import * as geo from "./geo-infor.js";

const point_template_tree = {
  title: "{Name}",
  content: "Cây này ở <b>{Location}</b>.",
};
const point_template_light = {
  title: "{Name}",
  content: "Bóng đèn này ở <b>{Location}</b>.",
};
const point_template_chair = {
  title: "{Name}",
  content: "Cái ghế này ở <b>{Location}</b>.",
};
const point_template_area = {
  title: "{Name}",
  content: "Khu vực này ở <b>{Location}</b>.",
};
const point_template_university = {
  title: "{Name}",
  content: "Trường ở <b>{Location}</b>.",
};

const polygons = [
  {
    type: "polygon",
    rings: geo.wardsGeo.TanDinh,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.DaKao,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.BenNghe,
    Name: "Phường Bến Nghé",
    Location: "Phường Bến Nghé",
    symbol: {
      type: "simple-fill",
      color: [204, 153, 0, 0.4],
      outline: {
        color: [255, 255, 255],
        width: 1,
      },
    },
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.BenThanh,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.NguyeThaiBinh,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.PhamNguLao,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.CauOngLanh,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.CoGiang,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.NguyenCuTrinh,
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
    popupTemplate: point_template_university,
  },
  {
    type: "polygon",
    rings: geo.wardsGeo.CauKho,
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
    popupTemplate: point_template_university,
  },
];

const points = [
  {
    type: "point",
    latitude: geo.points.DenGiaoThong[0],
    longitude: geo.points.DenGiaoThong[1],
    Name: "Đèn giao thông 1",
    Location: "ở quận 1., TPHCM",
    symbol: {
      type: "simple-marker",
      color: [255, 0, 0],
      outline: {
        color: [255, 0, 0],
        width: 2,
      },
    },
    popupTemplate: point_template_tree,
  },
  {
    type: "point",
    latitude: geo.points.DinhDocLap[0],
    longitude: geo.points.DinhDocLap[1],
    Name: "Dinh Độc Lập",
    Location: "Dinh Độc Lập",
    symbol: {
      type: "simple-marker",
      color: [0, 255, 51],
      outline: {
        color: [0, 255, 51],
        width: 4,
      },
    },
    popupTemplate: point_template_tree,
  },
  {
    type: "point",
    latitude: geo.points.ThapCham[0],
    longitude: geo.points.ThapCham[1],
    Name: "Tháp Chàm",
    Location: "Tháp Chàm",
    symbol: {
      type: "simple-marker",
      color: [2, 31, 247],
      outline: {
        color: [2, 31, 247],
        width: 2,
      },
    },
    popupTemplate: point_template_tree,
  },
];

const lines = [
  {
    type: "polyline",
    paths: geo.district1Geo,
    symbol: {
      type: "simple-line",
      color: [226, 119, 40], // orange
      width: 2,
    },
    Name: "Quận 1",
    Location: "Tp. Hồ Chí Minh",
    popupTemplate: point_template_area,
  },
  {
    type: "polyline",
    paths: geo.streets.NguyenHueBouleconstd,
    symbol: {
      type: "simple-line",
      color: [0, 30, 255], // orange
      width: 2,
    },
    Name: "Đại lộ Nguyễn Huệ",
    Location: "Đại lộ Nguyễn Huệ",
  },
  {
    type: "polyline",
    paths: geo.streets.DongKhoiStreet,
    symbol: {
      type: "simple-line",
      color: [0, 30, 255], // orange
      width: 2,
    },
    Name: "Đường Ðồng Khởi",
    Location: "Đường Ðồng Khởi",
  },
  {
    type: "polyline",
    paths: geo.streets.NguyenThiMinhKhai,
    symbol: {
      type: "simple-line",
      color: [0, 30, 255], // orange
      width: 2,
    },
    Name: "Nguyễn Thị Minh Khai",
    Location: "Nguyễn Thị Minh Khai",
  },
  {
    type: "polyline",
    paths: geo.streets.Pasteur,
    symbol: {
      type: "simple-line",
      color: [0, 30, 255], // orange
      width: 2,
    },
    Name: "Đường Pasteur",
    Location: "Đường Pasteur",
  },
  {
    type: "polyline",
    paths: geo.streets.HamNghi,
    symbol: {
      type: "simple-line",
      color: [0, 30, 255], // orange
      width: 2,
    },
    Name: "Đại lộ Hàm Nghi",
    Location: "Đại lộ Hàm Nghi",
  },
];

const jsondata = {
  points,
  lines,
  polygons,
};

require([
  "esri/Map",
  "esri/views/MapView",
  "esri/Graphic",
  "esri/layers/GraphicsLayer",
], function (Map, MapView, Graphic, GraphicsLayer) {
  const map = new Map({
    basemap: "topo-vector",
  });
  map.on("load", function () {
    map.graphics.enableMouseEvents();
  });

  const view = new MapView({
    container: "viewDiv",
    map: map,
    center: [106.703362, 10.776971], // Tọa độ trung tâm của Quận 1
    zoom: 14,
    highlightOptions: {
      color: "blue",
    },
  });
  const createGraphic = function (data) {
    return new Graphic({
      geometry: data,
      symbol: data.symbol,
      attributes: data,
      popupTemplate: data.popupTemplate,
    });
  };
  const graphicsLayer = new GraphicsLayer();
  jsondata.points.forEach(function (data) {
    graphicsLayer.add(createGraphic(data));
  });
  jsondata.lines.forEach(function (data) {
    graphicsLayer.add(createGraphic(data));
  });
  jsondata.polygons.forEach(function (data) {
    graphicsLayer.add(createGraphic(data));
  });
  map.add(graphicsLayer);
});
