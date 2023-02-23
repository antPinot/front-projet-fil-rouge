import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatListModule
  ],
  exports:[
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatListModule
  ]
})
export class MaterialModule { }