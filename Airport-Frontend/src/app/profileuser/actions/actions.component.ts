import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/Interfaces';
import { selectTheUser } from 'src/app/State/Actions/users.service';
import { AppState } from 'src/app/State/appState';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  user!: User;
  form!: FormGroup;
  name: string | undefined;
  email!: string;
  checkPasswords: string | undefined;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(selectTheUser).subscribe((user: User): void => {
      this.user = user;
      this.initializeForm();
    });
  }
  initializeForm(): void {
    this.form = this.fb.group({
      name: [this.user.Name, Validators.required],
      email: [this.user.Email, [Validators.required, Validators.email]],
      password: ['', Validators.minLength(8)],
      confirmPassword: ['']
    });
  }
  
  setProfile(): void {
    const { name, email, password } = this.form.value;
    const updatedUser = { ...this.user, name, email, password };

  }
}
