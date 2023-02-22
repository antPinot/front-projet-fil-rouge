import { Component, Input } from '@angular/core';
import { Covoiturage } from 'src/app/models/covoiturage';
import { CovoiturageService } from 'src/app/services/covoiturage.service';

@Component({
  selector: 'app-single-covoiturage',
  templateUrl: './single-covoiturage.component.html',
  styleUrls: ['./single-covoiturage.component.css']
})

/**
 * Component permettant l'affichage d'un covoiturage
 * individuel
 * 
 */
export class SingleCovoiturageComponent {


  constructor(private covoiturageService: CovoiturageService){}


  @Input()
  covoituragePersonnel!: Covoiturage


  ngOnInit(): void {
    console.log(this.covoituragePersonnel);
  }


  /**methode supprime un covoiturage */
  deleteCovoiturage(covoiturage: Covoiturage){
    if(covoiturage.id){
      this.covoiturageService.deleteOne(covoiturage.id).subscribe();
    }
  }

}
