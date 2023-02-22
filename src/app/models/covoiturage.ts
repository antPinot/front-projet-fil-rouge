import { Adresse } from "./adresse";

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
}
