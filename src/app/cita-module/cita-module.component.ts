import { Component, OnInit } from '@angular/core';
import { DialogCitaComponent } from './dialog-cita.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from '../service/api.service';
import {
  IdataModel,
  Icita,
  Imedico,
  Ipasiente,
  ItipoCita,
  Irequest,
  IresponsePost,
} from '../model/Icita';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita-module',
  templateUrl: './cita-module.component.html',
  styleUrls: ['./cita-module.component.css'],
})
export class CitaModuleComponent implements OnInit {
  displayedColumns: string[] = [
    'idCita',
    'fechaCita',
    'tipoCita',
    'pasiente',
    'medico',
    'acciones',
  ];
  dataSource = [] as Array<Icita>;
  pasiente = {} as Ipasiente;
  selectMedico = [] as Array<Imedico>;
  selectTipoCita = [] as Array<ItipoCita>;

  constructor(public dialog: MatDialog, private apiservice: ApiService) {}

  ngOnInit(): void {
    console.log('Inicializa');
    this.apiservice
      .getCitas()
      .subscribe((data) => (this.dataSource = data.data));

    this.apiservice
      .getCMedico()
      .subscribe((data) => (this.selectMedico = data.data));
    this.apiservice
      .getCPasiente()
      .subscribe((data) => (this.pasiente = data.data));
    this.apiservice
      .getCTipoCita()
      .subscribe((data) => (this.selectTipoCita = data.data));
  }

  editarCita(element: Icita) {
    //para input calendar
    const datestring = element.fechaCita.toString().replace(' ', 'T');
    const data = {
      pasientes: this.pasiente,
      medicos: this.selectMedico,
      tipoCita: this.selectTipoCita,
      datestring: datestring,
      element: element,
      medicoId: element.medicoId,
      tipoCitaId: element.tipoCitaId,
      cita: element.id,
    } as IdataModel;
    this.openDialog(data);
  }
  nuevaCita() {
    const d = new Date();

    //2025-01-16T01:46
    const datestring =
      d.getFullYear() +
      '-' +
      this.formatNum(d.getMonth() + 1) +
      '-' +
      this.formatNum(d.getDate()) +
      'T' +
      this.formatNum(d.getHours()) +
      ':' +
      this.formatNum(d.getMinutes());

    console.log('datestring', datestring);
    let idCita = 0;
    if (this.dataSource.length > 0) {
      idCita = this.dataSource.slice(-1)[0].id;
    }
    idCita = idCita + 1;

    console.log('idCita ', idCita);
    const data = {
      pasientes: this.pasiente,
      medicos: this.selectMedico,
      tipoCita: this.selectTipoCita,
      cita: idCita,
      datestring: datestring,
      medicoId: 0,
      tipoCitaId: 0,
    } as IdataModel;
    this.openDialog(data);
  }

  openDialog(data: IdataModel) {
    const configDialog = {
      hasBackdrop: true,
      disableClose: true,
      width: '40%',
      position: {
        top: '5%',
      },
      data: data,
    } as MatDialogConfig;
    const dialogRef = this.dialog.open(DialogCitaComponent, configDialog);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.fechaCita = result.fechaCita.toString().replace('T', ' ');

        let text = '';
        let respose;
          this.apiservice
          .postNuevaCita(result)
          .subscribe(data=> respose = data) ;

          console.log ('respose', respose)
          if (!result.citaId) {

            text = 'Se ha creado con exito la nueva cita';

          } else {
            text = 'Se ha editado con exito la cita';
          }
          Swal.fire({
            title: 'Exito!',
            text: text,
          });

      }
    });
  }

  deleteCita(idCita: number) {
    const request = {
      citaId: idCita,
    } as Irequest;

    Swal.fire({
      title: '¿Esta seguro de eliminar la Cita?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiservice.deleteCita(request).subscribe();

        this.dataSource = this.dataSource.filter((item) => item.id != idCita);
        Swal.fire({
          title: 'Eliminado!',
          text: 'Su cita ha sido eliminda.',
          icon: 'success',
        });
      }
    });
  }

  formatNum(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
