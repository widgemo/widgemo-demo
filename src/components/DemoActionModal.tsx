import React from 'react';
import { Modal, Button, Badge, Table } from 'react-bootstrap';
import type { DemoActionPayload } from '../utils/demoActionBus';

interface DemoActionModalProps {
  payload: DemoActionPayload | null;
  onClose: () => void;
}

/**
 * DemoActionModal — shows the ActionContext received by an action callback.
 *
 * Purpose: teach users what data is available inside onAction(ActionContext).
 */
export const DemoActionModal: React.FC<DemoActionModalProps> = ({ payload, onClose }) => {
  if (!payload) return null;
  const isActionContext = payload.source === 'onAction';

  const renderEntityTable = (entity: Record<string, unknown>) => {
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

  const renderDataSummary = (data: Record<string, unknown>[]) => {
    if (data.length === 0) return <span className="text-muted fst-italic">Empty dataset</span>;

    // Show first 3 records summarised
    const preview = data.slice(0, 3);
    const keys = Object.keys(preview[0] ?? {}).slice(0, 4); // show up to 4 columns

    return (
      <>
        <div className="mb-2">
          <Badge bg="secondary">{data.length} record{data.length !== 1 ? 's' : ''} in scope</Badge>
        </div>
        <Table size="sm" bordered style={{ fontSize: '0.75rem' }}>
          <thead>
            <tr>
              {keys.map(k => <th key={k}>{k}</th>)}
              {data.length > 3 && <th className="text-muted">…</th>}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr key={i}>
                {keys.map(k => <td key={k}>{String(row[k] ?? '—')}</td>)}
                {data.length > 3 && i === 0 && (
                  <td rowSpan={3} className="text-muted text-center align-middle" style={{ fontSize: '0.6875rem' }}>
                    +{data.length - 3} more
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
          Action Triggered: <strong>{payload.actionLabel}</strong>
          <code className="ms-2 text-muted" style={{ fontSize: '0.75rem' }}>#{payload.actionId}</code>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Source badge */}
        <div className="mb-3 d-flex align-items-center gap-2">
          <span className="text-muted" style={{ fontSize: '0.8125rem' }}>Callback type:</span>
          {isActionContext ? (
            <Badge bg="primary">onAction(ActionContext)</Badge>
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

        {/* onAction explanation */}
        {isActionContext && (
          <div
            className="mb-3 p-2 rounded"
            style={{ backgroundColor: 'var(--bs-primary-bg-subtle, #cfe2ff)', fontSize: '0.8125rem', border: '1px solid var(--bs-primary-border-subtle, #9ec5fe)' }}
          >
            <strong>onAction(ctx)</strong> receives the full <code>ActionContext</code>:{' '}
            <code>ctx.entity</code>, <code>ctx.data</code> (all records in scope), and <code>ctx.zone</code>.
            Use this for zone-level actions like Export, Refresh, or Batch operations.
          </div>
        )}

        {/* Non-action-context explanation */}
        {!isActionContext && (
          <div
            className="mb-3 p-2 rounded"
            style={{ backgroundColor: 'var(--bs-success-bg-subtle, #d1e7dd)', fontSize: '0.8125rem', border: '1px solid var(--bs-success-border-subtle, #a3cfbb)' }}
          >
            This event did not come from <strong>onAction(ActionContext)</strong>.
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
        {!payload.entity && isActionContext && (
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
