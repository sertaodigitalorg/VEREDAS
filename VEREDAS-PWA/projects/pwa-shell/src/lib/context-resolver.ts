import {
  EdgeContext,
  HubItem,
  HubStatus,
  PwaRole,
  ResolvedRoleContext,
  ResolverEndpoints,
  WebRoleContext,
} from './context-types';

const DEFAULT_ENDPOINTS: ResolverEndpoints = {
  edgeContextUrl: 'http://localhost:9080/api/v1/context',
  webHubUrl: 'http://localhost:8000/api/v1/pwa/hub',
  webRoleContextBaseUrl: 'http://localhost:8000/api/v1/pwa/context',
};

const ROLE_PORT_MAP: Record<PwaRole, string> = {
  aluno: '4401',
  motorista: '4402',
  monitor: '4403',
  paciente: '4404',
};

async function fetchJson<T>(url: string, timeoutMs = 3000): Promise<T> {
  const controller = new AbortController();
  const timeoutHandle = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status}) for ${url}`);
    }

    return (await response.json()) as T;
  } finally {
    window.clearTimeout(timeoutHandle);
  }
}

function normalizeActions(actions: string[] | undefined, role: PwaRole): string[] {
  if (actions && actions.length > 0) {
    return actions;
  }

  if (role === 'aluno') {
    return ['Consultar atendimento', 'Ver comunicados', 'Acompanhar transporte', 'Abrir portal web'];
  }

  if (role === 'paciente') {
    return ['Consultar agenda', 'Abrir triagem', 'Ver historico', 'Acessar unidade'];
  }

  if (role === 'motorista') {
    return ['Iniciar viagem', 'Confirmar checklist', 'Abrir navegacao', 'Ver alertas'];
  }

  return ['Validar presenca', 'Registrar ocorrencia', 'Verificar alertas', 'Confirmar desembarque'];
}

export async function fetchHubStatus(endpoints?: Partial<ResolverEndpoints>): Promise<HubStatus> {
  const cfg: ResolverEndpoints = { ...DEFAULT_ENDPOINTS, ...endpoints };

  let edgeAvailable = false;
  let webAvailable = false;
  let items: HubItem[] = [];

  try {
    await fetchJson<EdgeContext>(cfg.edgeContextUrl);
    edgeAvailable = true;
  } catch {
    edgeAvailable = false;
  }

  try {
    const payload = await fetchJson<{ items?: HubItem[] }>(cfg.webHubUrl);
    webAvailable = true;
    items = payload.items ?? [];
  } catch {
    webAvailable = false;
  }

  if (items.length === 0) {
    items = [
      {
        role: 'aluno',
        title: 'Portal Aluno',
        description: 'Canal de aluno e familia no projeto VEREDAS-PWA.',
        webContext: `${cfg.webRoleContextBaseUrl}/aluno`,
        edgeContext: cfg.edgeContextUrl,
      },
      {
        role: 'motorista',
        title: 'PWA Motorista',
        description: 'Operacao de bordo com prioridade de contexto no Edge.',
        webContext: `${cfg.webRoleContextBaseUrl}/motorista`,
        edgeContext: cfg.edgeContextUrl,
      },
      {
        role: 'monitor',
        title: 'PWA Monitor',
        description: 'Supervisao de bordo com fallback web no Core.',
        webContext: `${cfg.webRoleContextBaseUrl}/monitor`,
        edgeContext: cfg.edgeContextUrl,
      },
      {
        role: 'paciente',
        title: 'PWA Paciente',
        description: 'Acesso de saude para atendimento e transporte sanitario.',
        webContext: `${cfg.webRoleContextBaseUrl}/paciente`,
        edgeContext: cfg.edgeContextUrl,
      },
    ];
  }

  return {
    edgeAvailable,
    webAvailable,
    strategy: 'edge-first-web-fallback',
    items,
  };
}

export async function resolveRoleContext(
  role: PwaRole,
  endpoints?: Partial<ResolverEndpoints>
): Promise<ResolvedRoleContext> {
  const cfg: ResolverEndpoints = { ...DEFAULT_ENDPOINTS, ...endpoints };

  try {
    const edgePayload = await fetchJson<EdgeContext>(cfg.edgeContextUrl);
    const edgeHasRole = !Array.isArray(edgePayload.pwas) || edgePayload.pwas.includes(role);

    if (edgeHasRole) {
      const edgeCapabilities = edgePayload.capabilities ?? [];

      return {
        role,
        source: 'edge',
        title: role === 'aluno' ? 'Portal Aluno' : `PWA ${role.charAt(0).toUpperCase()}${role.slice(1)}`,
        description: 'Contexto resolvido no Edge local com prioridade operacional.',
        status: edgePayload.edgeId
          ? `Edge ${edgePayload.edgeId} ativo em modo ${edgePayload.sync?.mode ?? 'unknown'}.`
          : 'Edge local ativo e respondendo contexto.',
        actions: normalizeActions(undefined, role),
        capabilities: edgeCapabilities,
      };
    }
  } catch {
    // If Edge is unavailable, continue to web fallback.
  }

  const webPayload = await fetchJson<WebRoleContext>(`${cfg.webRoleContextBaseUrl}/${role}`);

  return {
    role,
    source: 'web',
    title: webPayload.title,
    description: webPayload.description,
    status: `Fallback web ativo com estrategia ${webPayload.strategy}.`,
    actions: normalizeActions(webPayload.actions, role),
    capabilities: webPayload.capabilities ?? [],
  };
}

export function getRoleAppUrl(role: PwaRole): string {
  return `http://localhost:${ROLE_PORT_MAP[role]}`;
}

export function getRoleLabel(role: PwaRole): string {
  if (role === 'aluno') {
    return 'Portal Aluno';
  }

  return `PWA ${role.charAt(0).toUpperCase()}${role.slice(1)}`;
}