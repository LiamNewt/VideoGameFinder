import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formresults',
  imports: [RouterLink],
  templateUrl: './formresults.html',
  styleUrl: './formresults.css',
})
export class Formresults implements OnInit {
  formData: any;

  ngOnInit(): void {
    const data = localStorage.getItem('contactForm');

    if(data){
      this.formData = JSON.parse(data);
    }
  }
}
