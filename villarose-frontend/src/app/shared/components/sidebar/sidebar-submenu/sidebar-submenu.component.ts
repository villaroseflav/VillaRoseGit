import { Component, Input, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { SubMenuItem } from '../../../../core/models/menu.model';
import { MenuService } from '../../../../core/services/menu.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
    selector: 'app-sidebar-submenu',
    templateUrl: './sidebar-submenu.component.html',
    styleUrls: ['./sidebar-submenu.component.scss'],
    standalone: true,
    imports: [
      AngularSvgIconModule,
      NgClass,
      NgFor,
      NgTemplateOutlet,
      RouterLinkActive,
      RouterLink,
    ],
})
export class SidebarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem>{};

  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMenu(menu: any) {
    this.menuService.toggleSubMenu(menu);
  }

  private collapse(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = false;
      if (item.children) this.collapse(item.children);
    });
  }
}
