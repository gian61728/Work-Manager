import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-list',
  imports: [MatCardModule,MatButtonModule,MatTableModule,MatDialogModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List implements OnInit,OnDestroy{
  constructor(){
    
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void { 
  }

}
