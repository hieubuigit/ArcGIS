export const initializeMap = () => {
  // Create map
  // const map = new Map({
  //   basemap: 'topo-vector',
  // });

  // // Create a new MapView
  // this.view = new MapView({
  //   container: 'mapViewDiv',
  //   map: map,
  //   center: [106.703362, 10.776971],
  //   zoom: 14,
  //   highlightOptions: {
  //     color: new Color([255, 0, 0, 0.5]),
  //   },
  // });

  // this.view.when(() => {
  //   this.addClickEventHandler();
  // });

  // const graphicsLayer = new GraphicsLayer();
  // this._gisMapSvc.getPolygons().forEach((data) => {
  //   graphicsLayer.add(this._gisMapSvc.createGraphic(data));
  // });

  // this._gisMapSvc.getLines().forEach((data) => {
  //   graphicsLayer.add(this._gisMapSvc.createGraphic(data));
  // });

  // this._gisMapSvc.getPoints().forEach((data) => {
  //   graphicsLayer.add(this._gisMapSvc.createGraphic(data));
  // });


  // Handle click events on the graphics layer
  // graphicsLayer.on('click', (event) => {
  //   if (event.graphic) { // Check if a graphic was clicked
  //     this.handleGraphicClick(event.graphic);
  //   }
  // });

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

  // map.add(graphicsLayer);
};
