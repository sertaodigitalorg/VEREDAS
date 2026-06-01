import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { HubStatus, fetchHubStatus, getRoleAppUrl, getRoleLabel } from 'pwa-shell';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly status = signal<HubStatus | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly roleLabel = getRoleLabel;
  protected readonly appUrl = getRoleAppUrl;

  async ngOnInit(): Promise<void> {
    try {
      const payload = await fetchHubStatus();
      this.status.set(payload);
    } catch {
      this.error.set('Falha ao carregar o estado do hub PWA.');
    } finally {
      this.loading.set(false);
    }
  }
}