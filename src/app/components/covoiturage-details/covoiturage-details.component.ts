import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Covoiturage } from 'src/app/models/covoiturage';
import { CovoiturageService } from 'src/app/services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-details',
  templateUrl: './covoiturage-details.component.html',
  styleUrls: ['./covoiturage-details.component.css']
})
export class CovoiturageDetailsComponent {

  public covoiturage$  = new BehaviorSubject<Covoiturage>({});

  //inject activatedRoute
  constructor(private _activatedRoute: ActivatedRoute, private _covoiturageService: CovoiturageService){



  /**recuperation des params de la route ici id */

  this._activatedRoute.paramMap.subscribe(paramMap =>{

    let n: string = paramMap.get('id')as string  
    
      this._covoiturageService.findById(n).subscribe( data => this.covoiturage$.next(data) )
    
    
  });
  /**this._activatedRoute.paramMap
    .pipe(
  
      map((paramMap: { get: (arg0: string) => any; }) => paramMap.get('id')),
      switchMap((covoiturageId: string) =>  this._covoiturageService.findById(covoiturageId))
    )
    **/
  }


  ngOnInit(){}

}
