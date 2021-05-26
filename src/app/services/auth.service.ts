import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router // Inject Firebase auth service
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log('USER', user);
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(() => {
        console.log('You have been successfully logged in!');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('USER', user);
    return user !== null;
  }
  signIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('what');
        this.router.navigate(['/game']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}
