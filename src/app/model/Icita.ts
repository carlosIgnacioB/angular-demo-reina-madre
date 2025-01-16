
export interface response {
  mensaje: string
  data: Array<Icita>
}

export interface IresponsePost {
  mensaje: string
  data: Icita
}

export interface Icita {
  id: number
  fechaCreacion: number
  fechaModificacion: any
  estatus: boolean
  fechaCita: string
  pasiente: string
  tipoCita: string
  tipoCitaId: number
  medico: string
  medicoId: number
}

export interface IdataModel {
  pasientes: Ipasiente ;
  medicos: Array<Imedico>;
  tipoCita: Array<ItipoCita>;
  cita: number;
  datestring: string;
  element: Icita;
  tipoCitaId: number;
  medicoId: number;
}

export interface Ipasiente {
  id: number
  fechaCreacion: Date
  fechaModificacion: Date
  estatus: boolean
  nombre: string
  apellidoMaterno: string
  apellidoParterno: string
  fechaNacimiento: Date

}

export interface Imedico {
  id: number
  fechaCreacion: Date
  fechaModificacion: Date
  estatus: boolean
  nombre: string
  apellidoMaterno: string
  apellidoParterno: string
  fechaNacimiento: Date
  cedula: string
}

export interface ItipoCita {
  id: number
  fechaCreacion: string
  fechaModificacion: any
  estatus: boolean
  tipoCita: string
}

export interface Irequest {
  citaId: number
  pasienteId: number
  medicoId: number
  tipoCitaId: number
  fechaCita: string
}
