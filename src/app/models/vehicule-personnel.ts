/**
 * Modèle représentant un véhicule personnel
 * 
 */
export interface VehiculePersonnel {
    id?: number,
    immatriculation?: string,
    marque?: string,
    modele?: string,
    places?: number,
    limitePlace?: number,
    collaborateursId?: number[]
}
