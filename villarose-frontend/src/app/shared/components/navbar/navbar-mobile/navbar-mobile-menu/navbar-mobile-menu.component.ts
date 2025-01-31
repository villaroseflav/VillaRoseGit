import { Component, OnInit } from '@angular/core';
import { NavbarMobileSubmenuComponent } from '../navbar-mobile-submenu/navbar-mobile-submenu.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { MenuService } from '../../../../../core/services/menu.service';
import { SubMenuItem } from '../../../../../core/models/menu.model';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-navbar-mobile-menu',
    templateUrl: './navbar-mobile-menu.component.html',
    styleUrls: ['./navbar-mobile-menu.component.scss'],
    standalone: true,
    imports: [
      AngularSvgIconModule,
      NgFor,
      NgClass,
      NgTemplateOutlet,
      RouterLink,
      RouterLinkActive,
      NgIf,
      NavbarMobileSubmenuComponent,
    ],
})
export class NavbarMobileMenuComponent implements OnInit {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {}
}
