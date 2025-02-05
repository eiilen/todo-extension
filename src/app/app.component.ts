import { Component, inject, model, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmationComponent } from './confirmation/confirmation.component';


interface Todo {
  id: number;
  description: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
  ],
})
export class AppComponent {
  title = 'todo';
  readonly dialog = inject(MatDialog);
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ConfirmationComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  todoList: Signal<Todo[]> = signal([]);

  description = model('');

  selectedIndex: number = -1;

  save() {
    const obj: Todo = {
      description: this.description(),
      done: false,
      id: this.todoList().length + 1
    }
    this.todoList().push(obj)
    this.description.set('');
  }
  updateItem() {
    if (this.selectedIndex >= 0) {
      this.todoList()[this.selectedIndex].description = this.description();
      this.description.set('');
      this.selectedIndex = -1;
    }
  }
  checkmarkChanged(data: Todo) {
    data.done = !data.done
  }
  deleteConfirmation(index: number) {
    this.dialog.open(ConfirmationComponent, {
      width: '250px'
    }).afterClosed().subscribe((res: any) => {
      if (res === 'Yes') {
        this.todoList().splice(index, 1)
      }
    });
  }
  editItem(data: Todo, index: number) {
    this.selectedIndex = index;
    this.description.set(data.description);

   } 
}
