import { Collaborateur } from "./collaborateur.model";
import { VehiculeSociete } from "./vehicule-societe";

/**
 * Modèle représentant une réservation de véhicule de société
 * 
 */
export interface ReservationVehiculeSociete{
    id?: number,
    dateDepart?: string,
    dateRetour?: string,
    collaborateur?: Collaborateur,
    vehiculeSociete?: VehiculeSociete,
    collaborateurId?: number,
    vehiculeSocieteId?: number
}