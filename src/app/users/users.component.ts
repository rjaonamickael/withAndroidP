import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['email', 'name', 'uid'];
  users = [];
  selectedUser: any;


  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res.allUsers;
    });
  }


  selectUser(user: any) {
    this.selectedUser = user; 
  }

  searchUser() {
    this.router.navigate(["/taskuser/",this.selectedUser.uid]);
  }
}
