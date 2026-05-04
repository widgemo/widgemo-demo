/**
 * DemoActionBus — a module-level singleton event bus that lets static data
 * definitions in widgemoExamples.tsx fire action events that React components
 * (like SimplifiedTest) can subscribe to and display as a rich modal.
 *
 * Pattern: widgemoExamples closures call `fireDemoAction(payload)`.
 *          SimplifiedTest calls `setDemoActionListener(fn)` on mount.
 */

export type DemoActionSource =
  | 'interactions.onEvent'
  | 'action.onAction'
  | 'gestures[item-click].onTrigger'
  | 'gestures[item-drag-start].onTrigger'
  | 'gestures[item-drop].onTrigger';

export interface DemoBoardLocation {
  columnId: string;
  swimlaneValue?: string;
  index?: number;
}

export interface DemoActionPayload {
  /** The action id from ActionConfig */
  actionId: string;
  /** The action label from ActionConfig */
  actionLabel: string;
  /** Which callback shape triggered this event in the demo */
  source: DemoActionSource;
  /** The entity the action was triggered on (present for item-level actions) */
  entity?: Record<string, unknown>;
  /** The full dataset in scope at the time of the action (zone actions typically use this) */
  data?: Record<string, unknown>[];
  /** The zone name where the action was triggered */
  zone?: string;
  /** Optional source location for board drag interactions */
  from?: DemoBoardLocation;
  /** Optional destination location for board drag interactions */
  to?: DemoBoardLocation;
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
    console.info('[Demo Interaction]', payload.actionLabel, payload);
  }
};
