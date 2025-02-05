import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationComponent>);

  closeDialog(message: string) {
    this.dialogRef.close(message);
  }
}
