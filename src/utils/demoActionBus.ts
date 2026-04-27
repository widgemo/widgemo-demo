/**
 * DemoActionBus — a module-level singleton event bus that lets static data
 * definitions in widgemoExamples.tsx fire action events that React components
 * (like SimplifiedTest) can subscribe to and display as a rich modal.
 *
 * Pattern: widgemoExamples closures call `fireDemoAction(payload)`.
 *          SimplifiedTest calls `setDemoActionListener(fn)` on mount.
 */

export type DemoActionSource = 'onClick' | 'handler';

export interface DemoActionPayload {
  /** The action id from ActionConfig */
  actionId: string;
  /** The action label from ActionConfig */
  actionLabel: string;
  /** Whether this came from onClick (entity only) or handler (full ActionContext) */
  source: DemoActionSource;
  /** The entity the action was triggered on (present for item-level actions) */
  entity?: Record<string, unknown>;
  /** The full dataset in scope at the time of the action (present when using handler) */
  data?: Record<string, unknown>[];
  /** The zone name where the action was triggered (present when using handler) */
  zone?: string;
}

type Listener = (payload: DemoActionPayload) => void;

let _listener: Listener | null = null;

/**
 * Register the single active listener. Call this from a React useEffect.
 * Pass null to unsubscribe (call in the useEffect cleanup).
 */
export const setDemoActionListener = (fn: Listener | null): void => {
  _listener = fn;
};

/**
 * Fire an action event. Called from action handlers in widgemoExamples.tsx.
 * Falls back to console.info when no listener is registered (e.g. Gallery/Teaser previews).
 */
export const fireDemoAction = (payload: DemoActionPayload): void => {
  if (_listener) {
    _listener(payload);
  } else {
    console.info('[Demo Action]', payload.actionLabel, payload);
  }
};
