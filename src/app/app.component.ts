import { Component, inject, model, OnInit, signal, Signal } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'todo';

  readonly dialog = inject(MatDialog);

  todoList: Signal<Todo[]> = signal([]);

  description = model('');

  selectedIndex: number = -1;

  ngOnInit(): void {
    const storageValue = localStorage.getItem('todoList');
    this.todoList = signal(storageValue ? JSON.parse(storageValue) : []);    
  }

  save() {
    const obj: Todo = {
      description: this.description(),
      done: false,
      id: this.todoList().length + 1
    }
    this.todoList().push(obj)
    this.description.set('');
    localStorage.setItem('todoList', JSON.stringify(this.todoList()));
  }
  updateItem() {
    if (this.selectedIndex >= 0) {
      this.todoList()[this.selectedIndex].description = this.description();
      this.description.set('');
      this.selectedIndex = -1;
    }
    localStorage.setItem('todoList', JSON.stringify(this.todoList()));

  }
  checkmarkChanged(data: Todo) {
    data.done = !data.done;
    localStorage.setItem('todoList', JSON.stringify(this.todoList()));
  }
  deleteConfirmation(index: number) {
    this.dialog.open(ConfirmationComponent, {
      width: '250px'
    }).afterClosed().subscribe((res: any) => {
      if (res === 'Yes') {
        this.todoList().splice(index, 1)
        localStorage.setItem('todoList', JSON.stringify(this.todoList()));
      }
    });
  }
  editItem(data: Todo, index: number) {
    this.selectedIndex = index;
    this.description.set(data.description);

   } 
}
