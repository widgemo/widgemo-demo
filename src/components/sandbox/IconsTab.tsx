import React from 'react';
import { Form, Alert, Card, Row, Col } from 'react-bootstrap';
import { FaCopy, FaEye, FaEyeSlash, FaTable, FaTh, FaChartBar, FaCog, FaSync, FaPlus, FaChevronRight, FaChevronDown, FaEllipsisV, FaChartLine, FaChartPie, FaPencilAlt, FaTrash, FaTimes, FaChevronUp, FaChevronLeft, FaSearch, FaFilter, FaSort, FaColumns } from 'react-icons/fa';
import { LuCopy, LuEye, LuEyeOff, LuTable, LuLayoutGrid, LuChartBar, LuSettings, LuRefreshCw, LuPlus, LuChevronRight, LuChevronDown, LuEllipsisVertical, LuChartLine, LuChartPie, LuPencil, LuTrash, LuX, LuChevronUp, LuChevronLeft, LuSearch, LuFilter, LuArrowUpDown, LuKanban } from 'react-icons/lu';
import { HiClipboardCopy, HiEye, HiEyeOff, HiTable, HiViewGrid, HiChartBar, HiCog, HiRefresh, HiPlus, HiChevronRight, HiChevronDown, HiDotsVertical, HiChartPie, HiPencil, HiTrash, HiX, HiChevronUp, HiChevronLeft, HiSearch, HiDotsHorizontal } from 'react-icons/hi';
import { defaultRenderIcon } from 'widgemo-core';

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

  // Function to get the icon component for the selected library
  const getIconComponent = (iconName: string) => {
    if (iconLibrary === 'react-icons') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'plus': FaPlus,
        'add': FaPlus,
        'edit': FaPencilAlt,
        'pencil': FaPencilAlt,
        'delete': FaTrash,
        'trash': FaTrash,
        'view': FaEye,
        'eye': FaEye,
        'eye-slash': FaEyeSlash,
        'refresh': FaSync,
        'reload': FaSync,
        'settings': FaCog,
        'config': FaCog,
        'cog': FaCog,
        'close': FaTimes,
        'x': FaTimes,
        'chevron-down': FaChevronDown,
        'chevron-up': FaChevronUp,
        'chevron-left': FaChevronLeft,
        'chevron-right': FaChevronRight,
        'search': FaSearch,
        'filter': FaFilter,
        'sort': FaSort,
        'chart-bar': FaChartBar,
        'chart-line': FaChartLine,
        'chart-pie': FaChartPie,
        'table': FaTable,
        'grid': FaTh,
        'board': FaColumns,
        'copy': FaCopy,
        'ellipsis-vertical': FaEllipsisV,
      };
      const IconComponent = iconMap[iconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    if (iconLibrary === 'lucide') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'plus': LuPlus,
        'add': LuPlus,
        'edit': LuPencil,
        'pencil': LuPencil,
        'delete': LuTrash,
        'trash': LuTrash,
        'view': LuEye,
        'eye': LuEye,
        'eye-slash': LuEyeOff,
        'refresh': LuRefreshCw,
        'reload': LuRefreshCw,
        'settings': LuSettings,
        'config': LuSettings,
        'cog': LuSettings,
        'close': LuX,
        'x': LuX,
        'chevron-down': LuChevronDown,
        'chevron-up': LuChevronUp,
        'chevron-left': LuChevronLeft,
        'chevron-right': LuChevronRight,
        'search': LuSearch,
        'filter': LuFilter,
        'sort': LuArrowUpDown,
        'chart-bar': LuChartBar,
        'chart-line': LuChartLine,
        'chart-pie': LuChartPie,
        'table': LuTable,
        'grid': LuLayoutGrid,
        'board': LuKanban,
        'copy': LuCopy,
        'ellipsis-vertical': LuEllipsisVertical,
      };
      const IconComponent = iconMap[iconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    if (iconLibrary === 'heroicons') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'plus': HiPlus,
        'add': HiPlus,
        'edit': HiPencil,
        'pencil': HiPencil,
        'delete': HiTrash,
        'trash': HiTrash,
        'view': HiEye,
        'eye': HiEye,
        'eye-slash': HiEyeOff,
        'refresh': HiRefresh,
        'reload': HiRefresh,
        'settings': HiCog,
        'config': HiCog,
        'cog': HiCog,
        'close': HiX,
        'x': HiX,
        'chevron-down': HiChevronDown,
        'chevron-up': HiChevronUp,
        'chevron-left': HiChevronLeft,
        'chevron-right': HiChevronRight,
        'search': HiSearch,
        'filter': HiDotsHorizontal,
        'sort': HiTable,
        'chart-bar': HiChartBar,
        'chart-pie': HiChartPie,
        'table': HiTable,
        'grid': HiViewGrid,
        'board': HiViewGrid,
        'copy': HiClipboardCopy,
        'ellipsis-vertical': HiDotsVertical,
      };
      const IconComponent = iconMap[iconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    // For 'none' or unknown, show default widgemo-core SVG
    return defaultRenderIcon({ name: iconName, size: 16 });
  };

  // Function to get the icon component from a library icon name (e.g., 'FaPlus', 'LuPlus')
  const getIconComponentFromLibraryName = (libraryIconName: string) => {
    if (iconLibrary === 'react-icons') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'FaPlus': FaPlus,
        'FaPencilAlt': FaPencilAlt,
        'FaTrash': FaTrash,
        'FaEye': FaEye,
        'FaSync': FaSync,
        'FaCog': FaCog,
        'FaTimes': FaTimes,
        'FaChevronDown': FaChevronDown,
        'FaChevronUp': FaChevronUp,
        'FaChevronLeft': FaChevronLeft,
        'FaChevronRight': FaChevronRight,
        'FaSearch': FaSearch,
        'FaFilter': FaFilter,
        'FaSort': FaSort,
        'FaChartBar': FaChartBar,
        'FaChartLine': FaChartLine,
        'FaChartPie': FaChartPie,
        'FaTable': FaTable,
        'FaTh': FaTh,
        'FaColumns': FaColumns,
        'FaCopy': FaCopy,
        'FaEllipsisV': FaEllipsisV,
      };
      const IconComponent = iconMap[libraryIconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    if (iconLibrary === 'lucide') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'LuPlus': LuPlus,
        'LuPencil': LuPencil,
        'LuTrash': LuTrash,
        'LuEye': LuEye,
        'LuRefreshCw': LuRefreshCw,
        'LuSettings': LuSettings,
        'LuX': LuX,
        'LuChevronDown': LuChevronDown,
        'LuChevronUp': LuChevronUp,
        'LuChevronLeft': LuChevronLeft,
        'LuChevronRight': LuChevronRight,
        'LuSearch': LuSearch,
        'LuFilter': LuFilter,
        'LuArrowUpDown': LuArrowUpDown,
        'LuChartBar': LuChartBar,
        'LuChartLine': LuChartLine,
        'LuChartPie': LuChartPie,
        'LuTable': LuTable,
        'LuLayoutGrid': LuLayoutGrid,
        'LuKanban': LuKanban,
        'LuCopy': LuCopy,
        'LuEllipsisVertical': LuEllipsisVertical,
      };
      const IconComponent = iconMap[libraryIconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    if (iconLibrary === 'heroicons') {
      const iconMap: Record<string, React.ComponentType<any>> = {
        'HiPlus': HiPlus,
        'HiPencil': HiPencil,
        'HiTrash': HiTrash,
        'HiEye': HiEye,
        'HiRefresh': HiRefresh,
        'HiCog': HiCog,
        'HiX': HiX,
        'HiChevronDown': HiChevronDown,
        'HiChevronUp': HiChevronUp,
        'HiChevronLeft': HiChevronLeft,
        'HiChevronRight': HiChevronRight,
        'HiSearch': HiSearch,
        'HiDotsHorizontal': HiDotsHorizontal,
        'HiTable': HiTable,
        'HiChartBar': HiChartBar,
        'HiChartPie': HiChartPie,
        'HiViewGrid': HiViewGrid,
        'HiClipboardCopy': HiClipboardCopy,
        'HiDotsVertical': HiDotsVertical,
      };
      const IconComponent = iconMap[libraryIconName];
      return IconComponent ? <IconComponent size={16} /> : <span>?</span>;
    }

    // For 'none' or unknown, show default SVG
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor">?</text>
      </svg>
    );
  };

  // Get the icon data for the selected library
  const getIconData = () => {
    const baseIcons = [
      { name: 'plus', aliases: ['add'], reactIcons: 'FaPlus', lucide: 'LuPlus', heroicons: 'HiPlus', suggested: true },
      { name: 'edit', aliases: ['pencil'], reactIcons: 'FaPencilAlt', lucide: 'LuPencil', heroicons: 'HiPencil', suggested: false },
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
      { name: 'filter', aliases: [], reactIcons: 'FaFilter', lucide: 'LuFilter', heroicons: 'HiFunnel', suggested: false },
      { name: 'sort', aliases: [], reactIcons: 'FaSort', lucide: 'LuArrowUpDown', heroicons: 'HiBarsArrowUp', suggested: false },
      { name: 'chart-bar', aliases: [], reactIcons: 'FaChartBar', lucide: 'LuChartBar', heroicons: 'HiChartBar', suggested: true },
      { name: 'chart-line', aliases: [], reactIcons: 'FaChartLine', lucide: 'LuChartLine', heroicons: '', suggested: true },
      { name: 'chart-pie', aliases: [], reactIcons: 'FaChartPie', lucide: 'LuChartPie', heroicons: 'HiChartPie', suggested: true },
      { name: 'table', aliases: [], reactIcons: 'FaTable', lucide: 'LuTable', heroicons: 'HiTable', suggested: true },
      { name: 'grid', aliases: [], reactIcons: 'FaTh', lucide: 'LuLayoutGrid', heroicons: 'HiViewGrid', suggested: true },
      { name: 'board', aliases: [], reactIcons: 'FaColumns', lucide: 'LuKanban', heroicons: 'HiRectangleStack', suggested: false },
      { name: 'copy', aliases: [], reactIcons: 'FaCopy', lucide: 'LuCopy', heroicons: 'HiClipboardCopy', suggested: true },
      { name: 'ellipsis-vertical', aliases: [], reactIcons: 'FaEllipsisV', lucide: 'LuEllipsisVertical', heroicons: 'HiDotsVertical', suggested: true },
    ];

    if (iconLibrary === 'none') {
      // For 'none', show each widgemo icon individually with its actual SVG
      return baseIcons.map(icon => ({
        libraryIcon: 'Default SVG',
        widgemoNames: [icon.name, ...icon.aliases],
        suggested: icon.suggested
      }));
    }

    // Group icons by their library icon
    const groupedIcons: Record<string, { names: string[], suggested: boolean }> = {};

    baseIcons.forEach(icon => {
      const libraryKey = iconLibrary === 'react-icons' ? 'reactIcons' : 
                        iconLibrary === 'lucide' ? 'lucide' : 'heroicons';
      const libraryIcon = icon[libraryKey as keyof typeof icon] as string;

      if (libraryIcon) {
        if (!groupedIcons[libraryIcon]) {
          groupedIcons[libraryIcon] = { names: [], suggested: icon.suggested };
        }
        groupedIcons[libraryIcon].names.push(icon.name, ...icon.aliases);
        // If any icon in the group is suggested, mark the group as suggested
        if (icon.suggested) {
          groupedIcons[libraryIcon].suggested = true;
        }
      }
    });

    return Object.entries(groupedIcons).map(([libraryIcon, data]) => ({
      libraryIcon,
      widgemoNames: data.names,
      suggested: data.suggested
    }));
  };

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
                <strong>Widgemo Defaults:</strong> Shows the actual inline SVG icons used by widgemo-core for zero-dependency setups.
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
                  {iconLibrary === 'none' 
                    ? 'Below are all available widgemo-core default SVG icons. Each icon shows the widgemo icon names that use it.'
                    : 'Below are all available icons from the selected library, grouped by their library icon name. Each icon shows all Widgemo icon names that map to it.'
                  }
                  <strong className="text-success"> Green badges</strong> indicate suggested mappings.
                </small>
                <Row className="g-2">
                  {getIconData().map((icon) => (
                    <Col xs={12} sm={6} lg={4} key={`${iconLibrary}-${icon.libraryIcon}-${icon.widgemoNames.join(',')}`} className="mb-2">
                      <div className="d-flex align-items-center p-2 border rounded bg-light">
                        <div className="me-3">
                          {iconLibrary === 'none' ? getIconComponent(icon.widgemoNames[0]) : getIconComponentFromLibraryName(icon.libraryIcon)}
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-bold small">{icon.widgemoNames.join(', ')}</div>
                          <div className="d-flex gap-1 mt-1 flex-wrap">
                            <span className={`badge ${icon.suggested ? 'bg-success' : 'bg-secondary'} small`}>
                              {icon.libraryIcon}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};