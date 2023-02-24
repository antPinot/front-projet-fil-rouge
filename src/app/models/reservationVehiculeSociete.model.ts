import { Collaborateur } from "./collaborateur.model";
import { VehiculeSociete } from "./vehicule-societe";

export interface ReservationVehiculeSociete{
    id?: number,
    dateDepart?: string,
    dateRetour?: string,
    collaborateur?: Collaborateur,
    vehiculeSociete?: VehiculeSociete
}