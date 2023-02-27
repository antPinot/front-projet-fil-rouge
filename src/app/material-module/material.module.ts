import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule
  ],
  exports:[
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }