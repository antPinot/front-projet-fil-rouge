import { Adresse } from "./adresse";
import { Collaborateur } from "./collaborateur.model";
import { VehiculePersonnel } from "./vehicule-personnel";

/**
 * Modèle de covoiturage
 * 
 */
export interface Covoiturage {
    
    id?: any;
    dateDepart?: string,
    placesRestantes?: number,
    nbPersonnes?: number,
    dureeTrajet?: number, 
    distance?: number,
    organisateurId?: number,
    vehiculePersonnelId?: number,
    adresseDepart?: Adresse,
    adresseArrivee?: Adresse,
    collaborateurs?: Collaborateur[]
    organisateur?: Collaborateur,
    vehiculePersonnel?: VehiculePersonnel
}
