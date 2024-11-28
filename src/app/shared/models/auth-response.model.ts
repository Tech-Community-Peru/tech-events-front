export interface AuthResponse{
  token:string;
  rol:string;

  idUsuario?: number;

  id?: number;
  correoElectronico?: string;
  idParticipante?: number;
  roles?: { id?: number; nombre?: string; rol?: string};

  nombre?: string;
  apellido?: string;

  // Depende del tipo de usuario se intente registrar
  // Sea ponente
  cargo?: string;
  especialidad?: string;
  // Sea participante
  habilidades?: string;
  paisOrigen?: string;
  ubicacion?: string;
  informacionAdicional?: string;
  linkedin?: string;
  edad?: number;

}
