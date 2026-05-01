import React from 'react';
import { Modal, Button, Badge, Table } from 'react-bootstrap';
import type { DemoActionPayload } from '../utils/demoActionBus';

interface DemoActionModalProps {
  payload: DemoActionPayload | null;
  onClose: () => void;
}

/**
 * DemoActionModal — shows the InteractionContext received by an action callback.
 *
 * Purpose: teach users what data is available inside interactions.onEvent(InteractionContext).
 */
export const DemoActionModal: React.FC<DemoActionModalProps> = ({ payload, onClose }) => {
  if (!payload) return null;
  const isInteractionContext = payload.source === 'interactions.onEvent';

  const renderEntityTable = (entity: unknown) => {
    // Defensive type checking — entity should be an object, not a string or array
    if (typeof entity === 'string') {
      try {
        const parsed = JSON.parse(entity);
        if (Array.isArray(parsed)) {
          return (
            <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
              <strong>Type error:</strong> entity was passed as a stringified array instead of a single object.
              This is likely a zone-level action that should have no entity.
            </div>
          );
        }
        entity = parsed;
      } catch {
        return (
          <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
            Entity was passed as a JSON string but could not be parsed.
          </div>
        );
      }
    }

    if (Array.isArray(entity)) {
      return (
        <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
          <strong>Type error:</strong> entity is an array ({entity.length} items).
          This is likely a zone-level action that should have no entity.
        </div>
      );
    }

    if (typeof entity !== 'object' || entity === null) {
      return <p className="text-muted fst-italic">Entity is not an object: {typeof entity}</p>;
    }

    const entries = Object.entries(entity);
    if (entries.length === 0) return <p className="text-muted fst-italic">No entity data</p>;

    return (
      <Table size="sm" bordered className="mb-0" style={{ fontSize: '0.8125rem' }}>
        <thead>
          <tr>
            <th style={{ width: '35%' }}>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td className="text-muted">{key}</td>
              <td>
                {typeof value === 'object' && value !== null
                  ? <code style={{ fontSize: '0.75rem' }}>{JSON.stringify(value)}</code>
                  : String(value ?? '—')}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  const renderDataSummary = (data: unknown) => {
    // Handle string data (if accidentally stringified)
    let dataArray: Record<string, unknown>[] = [];
    if (typeof data === 'string') {
      try {
        dataArray = JSON.parse(data);
      } catch {
        return (
          <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
            Data was passed as a JSON string instead of an array. Unable to parse.
          </div>
        );
      }
    } else if (Array.isArray(data)) {
      dataArray = data;
    } else {
      return (
        <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
          Data type mismatch: expected array, got {typeof data}.
        </div>
      );
    }

    if (dataArray.length === 0) return <span className="text-muted fst-italic">Empty dataset</span>;

    // Show first 3 records summarised
    const preview = dataArray.slice(0, 3);
    const firstRecord = preview[0];
    if (typeof firstRecord !== 'object' || firstRecord === null) {
      return (
        <div className="alert alert-warning mb-0" style={{ fontSize: '0.8125rem' }}>
          Records are not objects: {typeof firstRecord}
        </div>
      );
    }

    const keys = Object.keys(firstRecord).slice(0, 4); // show up to 4 columns

    return (
      <>
        <div className="mb-2">
          <Badge bg="secondary">{dataArray.length} record{dataArray.length !== 1 ? 's' : ''} in scope</Badge>
        </div>
        <Table size="sm" bordered style={{ fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {keys.map(k => <th key={k}>{k}</th>)}
              {dataArray.length > 3 && <th className="text-muted">…</th>}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr key={i}>
                {keys.map(k => <td key={k}>{String(row[k] ?? '—')}</td>)}
                {dataArray.length > 3 && i === 0 && (
                  <td rowSpan={3} className="text-muted text-center align-middle" style={{ fontSize: '0.6875rem' }}>
                    +{dataArray.length - 3} more
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  };

  return (
    <Modal show={!!payload} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: '1rem' }}>
          <span className="me-2">⚡</span>
          Interaction Triggered: <strong>{payload.actionLabel}</strong>
          <code className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>#{payload.actionId}</code>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Source badge */}
        <div className="mb-3 d-flex align-items-center gap-2">
          <span className="text-muted" style={{ fontSize: '0.8125rem' }}>Callback type:</span>
          {isInteractionContext ? (
            <Badge bg="primary">interactions.onEvent(InteractionContext)</Badge>
          ) : (
            <Badge bg="secondary">callback</Badge>
          )}
          {payload.zone && (
            <>
              <span className="text-muted" style={{ fontSize: '0.8125rem' }}>Zone:</span>
              <Badge bg="secondary">{payload.zone}</Badge>
            </>
          )}
        </div>

        {/* interactions.onEvent explanation */}
        {isInteractionContext && (
          <div
            className="mb-3 p-2 rounded"
            style={{ backgroundColor: 'var(--bs-primary-bg-subtle, #cfe2ff)', fontSize: '0.8125rem', border: '1px solid var(--bs-primary-border-subtle, #9ec5fe)' }}
          >
            <strong>interactions.onEvent(ctx)</strong> receives the full <code>InteractionContext</code>:{' '}
            <code>ctx.entity</code>, <code>ctx.data</code> (all records in scope), and <code>ctx.zone</code>.
            Use this for zone-level actions like Export, Refresh, or Batch operations.
          </div>
        )}

        {/* Non-interaction-context explanation */}
        {!isInteractionContext && (
          <div
            className="mb-3 p-2 rounded"
            style={{ backgroundColor: 'var(--bs-success-bg-subtle, #d1e7dd)', fontSize: '0.8125rem', border: '1px solid var(--bs-success-border-subtle, #a3cfbb)' }}
          >
            This event did not come from <strong>interactions.onEvent(InteractionContext)</strong>.
            Some demo interactions (such as retry callbacks) may only provide limited data.
          </div>
        )}

        {/* Entity section */}
        {payload.entity && (
          <div className="mb-3">
            <h6 className="mb-2" style={{ fontSize: '0.875rem' }}>
              <Badge bg="success" className="me-2">ctx.entity</Badge>
              The record this action was triggered on
            </h6>
            {renderEntityTable(payload.entity)}
          </div>
        )}

        {/* No entity — zone action with no entity */}
        {!payload.entity && isInteractionContext && (
          <div className="mb-3">
            <h6 className="mb-2" style={{ fontSize: '0.875rem' }}>
              <Badge bg="secondary" className="me-2">ctx.entity</Badge>
              <span className="text-muted fst-italic">undefined — zone-level action has no single entity</span>
            </h6>
          </div>
        )}

        {/* Data section */}
        {payload.data !== undefined && (
          <div>
            <h6 className="mb-2" style={{ fontSize: '0.875rem' }}>
              <Badge bg="primary" className="me-2">ctx.data</Badge>
              Full dataset in scope
            </h6>
            {renderDataSummary(payload.data)}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DemoActionModal;
