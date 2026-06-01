export type PwaRole = 'motorista' | 'monitor' | 'aluno' | 'paciente';

export interface EdgeContext {
  edgeId?: string;
  sync?: {
    mode?: string;
    target?: string;
  };
  capabilities?: string[];
  pwas?: string[];
}

export interface WebRoleContext {
  source: 'web';
  role: PwaRole;
  title: string;
  description: string;
  actions: string[];
  capabilities: string[];
  strategy: string;
  web: {
    portalAluno?: string;
    login?: string;
  };
}

export interface HubItem {
  role: PwaRole;
  title: string;
  description: string;
  webContext: string;
  edgeContext: string;
}

export interface HubStatus {
  edgeAvailable: boolean;
  webAvailable: boolean;
  strategy: 'edge-first-web-fallback';
  items: HubItem[];
}

export interface ResolvedRoleContext {
  role: PwaRole;
  source: 'edge' | 'web';
  title: string;
  description: string;
  status: string;
  actions: string[];
  capabilities: string[];
}

export interface ResolverEndpoints {
  edgeContextUrl: string;
  webHubUrl: string;
  webRoleContextBaseUrl: string;
}