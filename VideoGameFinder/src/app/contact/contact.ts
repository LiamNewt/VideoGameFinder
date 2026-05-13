import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  contactData = {
    name: '',
    email: '',
    comment: ''
  }

  constructor(private router: Router)
  {

  }

  submitForm()
  {
    localStorage.setItem(
      'contactForm', JSON.stringify(this.contactData)
    );
    this.router.navigate(['/formresults']);
  }
}
