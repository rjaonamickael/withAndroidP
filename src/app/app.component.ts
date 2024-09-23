import { Component } from '@angular/core';
import { Task } from './models/task.model';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: Task[] = [
    {id: "1", title: "Task 1", description: "Description for task 1", isDone: false},
    {id: "2", title: "Task 2", description: "Description for task 2", isDone: true},
    {id: "3", title: "Task 3", description: "Description for task 3", isDone: false},
    {id: "4", title: "Task 4", description: "Description for task 4", isDone: true}
  ];

  isAuth: boolean;
  isMobile: boolean;
  isMenuOpen: boolean = false;  // Propriété pour gérer l'état du menu

  constructor(private authService: AuthService, private router: Router) {
    this.isAuth = this.authService.isAuthenticated();
    this.isMobile = Capacitor.isNativePlatform();
    router.events.subscribe(() => {
      this.isAuth = this.authService.isAuthenticated();
      this.isMenuOpen = false;
    });
  }

  // Méthode pour basculer l'état du menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  updateTask(updatedTask: Task) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
