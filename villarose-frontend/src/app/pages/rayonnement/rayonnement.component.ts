import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HeaderComponent } from "../../layout/header/header.component";

@Component({
  selector: 'app-rayonnement',
  standalone: true,
  templateUrl: './rayonnement.component.html',
  // templateUrl: './florennes.html',
  styleUrl: './rayonnement.component.scss',
  imports: [HeaderComponent],
})
export class RayonnementComponent implements OnInit {
  srcUrl: string = 'https://fr.tutiempo.net/radiation-solaire/florennes.html';

  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document) {}

  public ngOnInit() {
    let script = this._renderer2.createElement('script');
    script.type = `text/javascript`;
    script.src = 'https://fr.tutiempo.net/s-widget/rad/CpYBAAVpg';

    this._renderer2.appendChild(this._document.body, script);
  }
}
