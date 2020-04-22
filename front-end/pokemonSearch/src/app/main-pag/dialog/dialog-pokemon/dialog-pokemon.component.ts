import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainPagComponent } from '../../main-pag.component';
import { InformationDialog } from '../../../models/information-dialog';

@Component({
  selector: 'app-dialog-pokemon',
  templateUrl: './dialog-pokemon.component.html',
  styleUrls: ['./dialog-pokemon.component.scss']
})
export class DialogPokemonComponent implements OnInit {

  chovendo = '';

  constructor(public dialogRef: MatDialogRef<MainPagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InformationDialog) { }

  ngOnInit(): void {
    if (this.data.estaChovendo) {
      this.chovendo = 'está chovendo';
    } else {
      this.chovendo = 'não está chovendo';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
