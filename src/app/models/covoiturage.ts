import { Adresse } from "./adresse";

export interface Covoiturage {
    id?: any;

    dateDepart?: string,
    placesRestantes?: number,
    nbPersonnes?: number,
    dureeTrajet?: number, 
    distance?: number,
    organisateur?: number,
    vehiculePersonnel?: number,
    adresse?: Adresse
}
