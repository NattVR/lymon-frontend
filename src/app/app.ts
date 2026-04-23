import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.updateFavicon(e.urlAfterRedirects));
  }

  private updateFavicon(url: string): void {
    const favicon = this.document.getElementById('app-favicon') as HTMLLinkElement | null;
    if (!favicon) return;
    favicon.href = url.startsWith('/lyhost') ? '/LyHostfavicon.ico' : '/Lymonfavicon.ico';
  }
}
