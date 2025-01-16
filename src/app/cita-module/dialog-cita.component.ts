import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IdataModel, Imedico, Ipasiente, Irequest, ItipoCita } from '../model/Icita';

@Component({
  selector: 'app-dialog-cita',
  templateUrl: './dialog-cita.component.html',
})
export class DialogCitaComponent implements OnInit {
  pasiente = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IdataModel,
    public dialogRef: MatDialogRef<DialogCitaComponent>,
    private formBuilder: FormBuilder
  ) {
    this.pasienteData = this.data.pasientes;
    this.selectMedico = this.data.medicos;
    this.selectTipoCita = this.data.tipoCita;
  }

  pasienteData = {} as Ipasiente;
  selectMedico = [] as Array<Imedico>;
  selectTipoCita = [] as Array<ItipoCita>;
  cita = 'Nueva';
  minDate = new Date();

  citaForm = this.formBuilder.group({
    fechaCita: new FormControl(this.data.datestring, Validators.required),
    tipoCita: new FormControl(this.data.tipoCitaId, Validators.required),
    medico: new FormControl(this.data.medicoId, Validators.required),
    idCitas: new FormControl(this.data.cita),
  });

  ngOnInit(): void {
    this.citaForm.get('idCitas')?.disable({ emitEvent: false });
    this.citaForm.get('pasientes')?.disable({ emitEvent: false });
    console.log('this.data.datestring ', this.data.datestring);
    if (this.data.element) {
      this.cita = 'Editar';
      console.log('medico Id ', this.data.element.medicoId);

    } else {
      this.cita = 'Nueva';
    }
  }

  onSubmit() {

    if (
      this.citaForm.controls.medico.value === 0 ||
      this.citaForm.controls.tipoCita.value === 0
    ) {
      Swal.fire({
        title: 'Alerta!',
        text: 'Existen campos vacios',
      });
    } else {
      let citaId = this.citaForm.controls.idCitas.value;
      if (!this.data.element) { citaId = null}

      const cita = {
        citaId: citaId,
        pasienteId: this.data.pasientes.id,

        medicoId: this.citaForm.controls.medico.value,

        tipoCitaId: this.citaForm.controls.tipoCita.value,
       
        fechaCita: this.citaForm.controls.fechaCita.value
      } ;

      this.closeModal(cita);
    }
  }

  closeModal(cita: any) {
    this.dialogRef.close(cita);
  }
}
