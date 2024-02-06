import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: { id: number, username: string } | null = null;

  // Simulating login with a user ID and username
  login(userId: number, username: string) {
    this.loggedInUser = { id: userId, username: username };
  }

  // Simulating logout
  logout() {
    this.loggedInUser = null;
  }

  // Get the logged-in user ID
  getUserId(): number | null {
    return this.loggedInUser ? this.loggedInUser.id : null;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }

  // Get the logged-in user's username
  getUsername(): string | null {
    return this.loggedInUser ? this.loggedInUser.username : null;
  }
}
