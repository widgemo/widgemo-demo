import React from 'react';
import { Form, Alert, Card, Row, Col } from 'react-bootstrap';

interface IconsTabProps {
  /** Current icon library selection */
  iconLibrary: 'none' | 'react-icons' | 'lucide' | 'heroicons';
  /** Callback when icon library changes */
  onIconLibraryChange: (library: 'none' | 'react-icons' | 'lucide' | 'heroicons') => void;
}

/**
 * IconsTab - A focused component for testing and configuring icon renderers
 *
 * Features:
 * - Icon library selector (Widgemo defaults, React Icons, Lucide, Heroicons)
 * - Interactive icon testing with name, size, and className controls
 * - Live preview of selected icons
 * - Custom renderIcon function editor
 * - Mini Widgemo preview showing icon integration
 * - Apply icons functionality with feedback
 * - Coming soon alerts for planned libraries
 *
 * Future extensibility:
 * - Add more icon libraries (Material Icons, Feather, etc.)
 * - Dynamic imports for actual icon libraries
 * - Icon search and filtering
 * - Icon pack management
 * - Custom icon upload
 * - Icon theme variants (filled, outlined, etc.)
 * - Accessibility icon validation
 * - Icon performance metrics
 * - Export/import icon configurations
 */
export const IconsTab: React.FC<IconsTabProps> = ({
  iconLibrary,
  onIconLibraryChange,
}) => {

  return (
    <div className="d-flex flex-column h-100">
      <div className="flex-grow-1 overflow-auto" style={{ overflowX: 'hidden' }}>
        <div className="row g-3">
          <div className="col-12">
            <Form.Label className="small fw-bold">Icon Library</Form.Label>
            <Form.Select
              size="sm"
              value={iconLibrary}
              onChange={(e) => onIconLibraryChange(e.target.value as typeof iconLibrary)}
              aria-label="Select icon library"
            >
              <option value="none">None (Widgemo Defaults)</option>
              <option value="react-icons">React Icons</option>
              <option value="lucide">Lucide</option>
              <option value="heroicons">Heroicons</option>
            </Form.Select>
          </div>

          {iconLibrary === 'none' && (
            <div className="col-12">
              <Alert variant="info" className="py-2 small">
                <strong>Widgemo Defaults:</strong> Uses inline SVG icons or no icons. Perfect for zero-dependency setups.
              </Alert>
            </div>
          )}

          {iconLibrary === 'react-icons' && (
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>React Icons:</strong> Maps common icon names used by Widgemo (like 'plus', 'settings', 'table', 'refresh') to FontAwesome icons from react-icons. 
                Provides a modern, consistent icon set with proper accessibility.
              </Alert>
            </div>
          )}

          {iconLibrary === 'lucide' && (
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>Lucide:</strong> Maps common icon names to Lucide icons from react-icons. 
                Features a clean, modern design with excellent readability and consistency.
              </Alert>
            </div>
          )}

          {iconLibrary === 'heroicons' && (
            <div className="col-12">
              <Alert variant="success" className="py-2 small">
                <strong>Heroicons:</strong> Maps common icon names to Heroicons from react-icons. 
                Features a clean, consistent design system with both outline and solid variants.
              </Alert>
            </div>
          )}

          <div className="col-12">
            <Form.Label className="small fw-bold">Available Icons & Mappings</Form.Label>
            <Card className="border">
              <Card.Body className="p-3">
                <small className="text-muted d-block mb-3">
                  Below are all default Widgemo icons and their mappings to external icon libraries.
                  <strong className="text-success"> Green badges</strong> indicate suggested mappings.
                </small>
                <Row className="g-2">
                  {[
                    { name: 'plus', aliases: ['add'], reactIcons: 'FaPlus', lucide: 'LuPlus', heroicons: 'HiPlus', suggested: true },
                    { name: 'edit', aliases: ['pencil'], reactIcons: 'FaPencilAlt', lucide: 'LuEdit', heroicons: 'HiPencil', suggested: false },
                    { name: 'delete', aliases: ['trash'], reactIcons: 'FaTrash', lucide: 'LuTrash', heroicons: 'HiTrash', suggested: false },
                    { name: 'view', aliases: ['eye'], reactIcons: 'FaEye', lucide: 'LuEye', heroicons: 'HiEye', suggested: true },
                    { name: 'refresh', aliases: ['reload'], reactIcons: 'FaSync', lucide: 'LuRefreshCw', heroicons: 'HiRefresh', suggested: true },
                    { name: 'settings', aliases: ['config', 'cog'], reactIcons: 'FaCog', lucide: 'LuSettings', heroicons: 'HiCog', suggested: true },
                    { name: 'close', aliases: ['x'], reactIcons: 'FaTimes', lucide: 'LuX', heroicons: 'HiX', suggested: false },
                    { name: 'chevron-down', aliases: [], reactIcons: 'FaChevronDown', lucide: 'LuChevronDown', heroicons: 'HiChevronDown', suggested: true },
                    { name: 'chevron-up', aliases: [], reactIcons: 'FaChevronUp', lucide: 'LuChevronUp', heroicons: 'HiChevronUp', suggested: false },
                    { name: 'chevron-left', aliases: [], reactIcons: 'FaChevronLeft', lucide: 'LuChevronLeft', heroicons: 'HiChevronLeft', suggested: false },
                    { name: 'chevron-right', aliases: [], reactIcons: 'FaChevronRight', lucide: 'LuChevronRight', heroicons: 'HiChevronRight', suggested: true },
                    { name: 'search', aliases: [], reactIcons: 'FaSearch', lucide: 'LuSearch', heroicons: 'HiSearch', suggested: false },
                    { name: 'filter', aliases: [], reactIcons: 'FaFilter', lucide: 'LuFilter', heroicons: 'HiFilter', suggested: false },
                    { name: 'sort', aliases: [], reactIcons: 'FaSort', lucide: 'LuArrowUpDown', heroicons: 'HiBarsArrowUp', suggested: false },
                    { name: 'chart-bar', aliases: [], reactIcons: 'FaChartBar', lucide: 'LuChartBar', heroicons: 'HiChartBar', suggested: true },
                    { name: 'chart-line', aliases: [], reactIcons: 'FaChartLine', lucide: 'LuChartLine', heroicons: 'HiChartLine', suggested: true },
                    { name: 'chart-pie', aliases: [], reactIcons: 'FaChartPie', lucide: 'LuChartPie', heroicons: 'HiChartPie', suggested: true },
                    { name: 'table', aliases: [], reactIcons: 'FaTable', lucide: 'LuTable', heroicons: 'HiTable', suggested: true },
                    { name: 'grid', aliases: [], reactIcons: 'FaTh', lucide: 'LuLayoutGrid', heroicons: 'HiViewGrid', suggested: true },
                    { name: 'board', aliases: [], reactIcons: 'FaColumns', lucide: 'LuKanban', heroicons: 'HiQueueList', suggested: false },
                    { name: 'copy', aliases: [], reactIcons: 'FaCopy', lucide: 'LuCopy', heroicons: 'HiClipboardCopy', suggested: true },
                    { name: 'ellipsis-vertical', aliases: [], reactIcons: 'FaEllipsisV', lucide: 'LuEllipsisVertical', heroicons: 'HiDotsVertical', suggested: true },
                  ].map((icon) => (
                    <Col xs={12} sm={6} lg={4} key={icon.name} className="mb-2">
                      <div className="d-flex align-items-center p-2 border rounded bg-light">
                        <div className="me-3">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {icon.name === 'plus' && <path d="M12 5v14M5 12h14" />}
                            {icon.name === 'edit' && <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></>}
                            {icon.name === 'delete' && <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />}
                            {icon.name === 'view' && <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>}
                            {icon.name === 'refresh' && <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" /></>}
                            {icon.name === 'settings' && <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></>}
                            {icon.name === 'close' && <path d="M18 6L6 18M6 6l12 12" />}
                            {icon.name === 'chevron-down' && <path d="M6 9l6 6 6-6" />}
                            {icon.name === 'chevron-up' && <path d="M18 15l-6-6-6 6" />}
                            {icon.name === 'chevron-left' && <path d="M15 18l-6-6 6-6" />}
                            {icon.name === 'chevron-right' && <path d="M9 18l6-6-6-6" />}
                            {icon.name === 'search' && <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>}
                            {icon.name === 'filter' && <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3" />}
                            {icon.name === 'sort' && <path d="M7 16V4m0 0L3 8m4-4 4 4m6 0v12m0 0 4-4m-4 4-4-4" />}
                            {icon.name === 'chart-bar' && <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>}
                            {icon.name === 'chart-line' && <><path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.1-2.8-2.8L7 14.2" /></>}
                            {icon.name === 'chart-pie' && <><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10Z" /></>}
                            {icon.name === 'table' && <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />}
                            {icon.name === 'grid' && <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></>}
                            {icon.name === 'board' && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /></>}
                            {icon.name === 'copy' && <><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></>}
                            {icon.name === 'ellipsis-vertical' && <><circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" /></>}
                          </svg>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold small">{icon.name}</div>
                          {icon.aliases.length > 0 && (
                            <div className="small text-muted">({icon.aliases.join(', ')})</div>
                          )}
                          <div className="d-flex gap-1 mt-1 flex-wrap">
                            {icon.reactIcons && (
                              <span className={`badge ${icon.suggested ? 'bg-success' : 'bg-secondary'} small`}>
                                {icon.reactIcons}
                              </span>
                            )}
                            {icon.lucide && (
                              <span className={`badge ${icon.suggested ? 'bg-success' : 'bg-secondary'} small`}>
                                {icon.lucide}
                              </span>
                            )}
                            {icon.heroicons && (
                              <span className={`badge ${icon.suggested ? 'bg-success' : 'bg-secondary'} small`}>
                                {icon.heroicons}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </div>

          <div className="col-12">
            <Form.Label className="small fw-bold">Example Integration</Form.Label>
            <div className="border rounded p-3">
              <small className="text-muted d-block mb-2">Mini Widgemo preview with current icon settings:</small>
              <div style={{
                border: '1px solid #dee2e6',
                borderRadius: '4px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                fontSize: '12px'
              }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span>📊</span>
                  <span className="fw-bold">Sample Data Table</span>
                  <span>⚙️</span>
                </div>
                <div className="small text-muted">
                  {iconLibrary === 'none' ? 'Using default inline SVGs from widgemo-core' :
                   iconLibrary === 'react-icons' ? 'Using FontAwesome icons from react-icons library' :
                   iconLibrary === 'lucide' ? 'Using Lucide icons from react-icons library' :
                   iconLibrary === 'heroicons' ? 'Using Heroicons from react-icons library' :
                   'Custom icon renderer'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};