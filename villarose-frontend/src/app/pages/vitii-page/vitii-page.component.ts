import { AfterViewInit, Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-vitii-page',
  standalone: true,
  templateUrl: './vitii-page.component.html',
  styleUrl: './vitii-page.component.scss',
  imports: [CommonModule, HeaderComponent]
})
export class VitiiPageComponent implements AfterViewInit {
  safeUrl?: SafeResourceUrl;
  // unsafeUrl = "https://bo.vitii.be/home.php"; // 
  unsafeUrl = "https://bo.vitii.be/one_pool.php?pg=1&id_wp=259&id_we=8714983";
  username = '';
  password = '';
  passwordFieldType: 'password' | 'text' = 'password'; // Initial state is password (hidden)


  constructor(private authService: AuthService, private sanitizer: DomSanitizer) {
    // Example of a dynamic URL that might come from an external source

    // Sanitize the URL to make it safe for use in a resource URL context
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);
  }

  ngAfterViewInit() {
    // After the view is initialized, fetch login credentials and log in
    this.authService.login().subscribe((credentials) => {
      this.username = credentials.username;
      this.password = credentials.password;
    });
  }
  
  // Toggle password visibility
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
