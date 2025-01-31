import { Component, Input } from '@angular/core';
import Icon from '../../../core/models/icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true
})
export class IconComponent {
  @Input() icon: Icon = { name: 'border-none', color: 'black' };
  @Input() size = '1em';
  @Input() style: 'solid' | 'regular' | 'brands' = 'solid';
}
