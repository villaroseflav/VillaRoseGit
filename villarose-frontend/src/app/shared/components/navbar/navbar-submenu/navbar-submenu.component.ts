import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SubMenuItem } from '../../../../core/models/menu.model';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { NgFor, NgTemplateOutlet, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'div[navbar-submenu]',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, NgFor, NgTemplateOutlet, RouterLinkActive, RouterLink, NgIf],
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};
  @ViewChild('submenuRef') submenuRef: ElementRef<HTMLDivElement> | undefined;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    /**
     * check if component is out of the screen
     */
    if (this.submenuRef) {
      const submenu = this.submenuRef.nativeElement.getBoundingClientRect();
      const bounding = document.body.getBoundingClientRect();

      if (submenu.right > bounding.right) {
        const childrenElement = this.submenuRef.nativeElement.parentNode as HTMLElement;
        if (childrenElement) {
          childrenElement.style.left = '-100%';
        }
      }
    }
  }
}
