import { Component, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Board, Column, Task } from '../../iterfaces/board';
import { FirestoreService } from '../../services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(private boardService: FirestoreService) {}
  board!: Board;

  ngOnInit() {
    this.boardService.getFullBoard('hFOcPrZR9gzg6GoQMO4Y').subscribe((data) => {
      if (data) {
        console.log(data);

        this.board = data;
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createNewTask(index: number, text: string) {
    const newTastk: Task = {
      description: text,
    };
    this.board.columns[index].tasks.push(newTastk);
  }
}
