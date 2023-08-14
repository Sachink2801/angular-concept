import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent {
  public buttonText: String = 'Submit';
  selectedHobbies: string = '';
  userForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      //hobbies: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.Data().subscribe((user) => {
      this.userForm.reset();
      if (user && user['type'] === 'edit') {
        this.buttonText = 'Update';
        this.userForm.patchValue(user['data']);
      }
    });
  }

  onSubmit() {
    let user = this.userForm.value;
    // user.hobbies = user.hobbies.split(',');
    if (this.buttonText.toLowerCase() === 'update') {
      let userAllData: any = localStorage.getItem("userData");
      let userArray: any[] = userAllData = JSON.parse(userAllData);
      userArray.filter(data => data.userid == user['userid']).map(opt => { Object.assign(opt, user) });
      localStorage.setItem("userData", JSON.stringify(userArray));
      this.router.navigateByUrl('/');
    } else {
      this.buttonText = 'Submit';
      user.userid = Math.floor(1000 + Math.random() * 9000);
      let userAllData: any = localStorage.getItem("userData");
      let userArray: any[] = userAllData = JSON.parse(userAllData);
      userArray.push(user);
      localStorage.setItem("userData", JSON.stringify(userArray));
      this.router.navigateByUrl('/');
    }
  }
}
