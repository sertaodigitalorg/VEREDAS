import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ResolvedRoleContext, resolveRoleContext } from 'pwa-shell';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = 'PWA Monitor';
  protected readonly context = signal<ResolvedRoleContext | null>(null);
  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    try {
      const payload = await resolveRoleContext('monitor');
      this.context.set(payload);
    } catch {
      this.error.set('Nao foi possivel resolver o contexto da aplicacao.');
    } finally {
      this.loading.set(false);
    }
  }
}