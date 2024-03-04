import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { VehiculePersonnel } from 'src/app/core/models/vehicule-personnel';
import { CovoiturageService } from 'src/app/core/services/covoiturage.service';
import { VehiculePersonnelService } from 'src/app/core/services/vehicule-personnel.service';

@Component({
  selector: 'app-delete-vehicule-personnel',
  templateUrl: './delete-vehicule-personnel.component.html',
  styleUrls: ['./delete-vehicule-personnel.component.css']
})
export class DeleteVehiculePersonnelComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<DeleteVehiculePersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VehiculePersonnel, private vehiculePersonnelService:VehiculePersonnelService, private covoiturageService:CovoiturageService){}

  ngOnInit(): void {
    console.log(this.data)
  }

  onDelete(){
    this.covoiturageService.covoituragesByVehiculePersonnel$.pipe(
      tap((covoiturages) => {
        covoiturages.forEach((c) => this.covoiturageService.deleteOne(c.id).subscribe())
      }),
      tap(() =>  this.vehiculePersonnelService.deleteVehiculePersonnel(this.data.id).subscribe())
    ).subscribe()
  }

}
