import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild, viewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'anfitrion-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit, AfterViewInit {

  @ViewChild('map', { static: true}) mapElementRef!: ElementRef;

  @Input() center: { lat: number, lng: number} | undefined;
  googleMaps: any;
  map: any;
  marker: any;
  mapListener: any;
  markerListener: any;
  intersectionObserver: any;

  constructor(
    private renderer : Renderer2
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    const { Map } = await google.maps.importLibrary("maps");

    const mapEl = this.mapElementRef.nativeElement;

    const location = new google.maps.LatLng(this.center?.lat, this.center?.lng);

    this.map = new Map(mapEl, {
      center: location,
      zoom: 14,
      mapId: "4504f8b37365c3d0",
      // scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      overviewMapControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });

    const coordinates = [
      { lat: -23.968840041045453, lng: -46.35642662740474 },
      { lat: -23.97000667023874, lng: -46.356458813909676 },
      { lat: -23.970036080922267, lng: -46.35576143963613 },
      { lat: -23.96903611391709, lng: -46.35577216847111 },
      { lat: -23.968840041045453, lng: -46.35642662740474 }
    ];

    const polygon = new google.maps.Polygon({
      paths: coordinates,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });

    polygon.setMap(this.map);

    // Gerar o KML com a geometria do polígono
    const kml = this.generateKML(coordinates);

    console.log(kml);  // Aqui você pode exportar ou fazer o download do KML

    this.renderer.addClass(mapEl, 'is-visible');
  }

  generateKML(coordinates: google.maps.LatLngLiteral[]): string {
    let kmlString = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    kmlString += `<kml xmlns="http://www.opengis.net/kml/2.2">\n`;
    kmlString += `<Document>\n`;

    // Definir o polígono no KML
    kmlString += `<Placemark>\n`;
    kmlString += `<Polygon>\n`;
    kmlString += `<outerBoundaryIs>\n`;
    kmlString += `<LinearRing>\n`;
    kmlString += `<coordinates>\n`;

    // Adicionar as coordenadas ao KML
    coordinates.forEach(coord => {
      kmlString += `${coord.lng},${coord.lat},0\n`;
    });

    kmlString += `</coordinates>\n`;
    kmlString += `</LinearRing>\n`;
    kmlString += `</outerBoundaryIs>\n`;
    kmlString += `</Polygon>\n`;
    kmlString += `</Placemark>\n`;

    kmlString += `</Document>\n`;
    kmlString += `</kml>\n`;

    return kmlString;
  }

}
