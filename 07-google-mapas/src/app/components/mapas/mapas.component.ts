import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Lugar } from 'src/app/interfaces/lugar';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.css']
})
export class MapasComponent implements OnInit, AfterViewInit {

  @ViewChild('map', {static: true} ) mapaElement: ElementRef
  map: google.maps.Map;

  marcadores: google.maps.Marker[] = [];
  infoWindows: google.maps.InfoWindow[] = [];

  lugares: Lugar[] = [
    {
      nombre: 'Udemy',
      lat: 37.784679,
      lng: -122.395936
    },
    {
      nombre: 'Bahía de San Francisco',
      lat: 37.798933,
      lng: -122.377732
    },
    {
      nombre: 'The Palace Hotel',
      lat: 37.788578,
      lng: -122.401745
    }
  ];

  constructor() { }

  ngOnInit() {
    this.escucharSockets();
  }

  ngAfterViewInit() {
    this.cargarMapa();
  }


  escucharSockets() {
    // marcajdro-nuevo


    // marcador-mover


    // marcador-borrar
  }

  cargarMapa() {
    const latLng = new google.maps.LatLng( 37.784679, -122.395936 );

    const mapaOpciones: google.maps.MapOptions = {
      center: latLng,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };


    this.map = new google.maps.Map( this.mapaElement. nativeElement, mapaOpciones );

    // CREAR UN MARKER EN EL MAPA

    this.map.addListener( 'click', ( coors: any ) => {
      const nuevoMarcador: Lugar = {
        nombre: 'Nuevo Lugar',
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        id: new Date().toISOString()
      };
      this.agregarMarcador( nuevoMarcador );

      // ========================
      //  Se coloca un socket para que los demás lo sepan
      // ========================
    })


    for ( const lugar of this.lugares ) {
      this.agregarMarcador( lugar );
    }
  }


  agregarMarcador( marcador: Lugar ) {

    const latLng = new google.maps.LatLng( marcador.lat, marcador.lng );

    const marker = new google.maps.Marker({

      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng,
      draggable: true
    });

  // ================================================
  //  referencia al marcador
  //  creamos la instancia de marcadores
  // ================================================

    this.marcadores.push( marker );

    const contenido = `<b>${ marcador.nombre }</b>`;
    const infoWindow = new google.maps.InfoWindow({
      content: contenido
    });

    this.infoWindows.push( infoWindow );

    google.maps.event.addDomListener( marker, 'click', (coors) => {

      this.infoWindows.forEach( infoW => infoW.close() );
      infoWindow.open( this.map, marker );
    });


    google.maps.event.addDomListener( marker, 'dblclick', (coors) => {
      marker.setMap( null );

      // ========================
      //  disparar un evento del sokets
      // ========================
    });

    google.maps.event.addDomListener( marker, 'drag', ( coors: any ) => {

      const nuevoMarcador = {
        lat: coors.latLng.lat(),
        lng: coors.latLng.lng(),
        nombre: marcador.nombre
      };


      // ========================
      //  disparar un evento del sokets
      // ========================
    });
  }

}
