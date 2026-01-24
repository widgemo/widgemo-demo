import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaEyeSlash,
  FaSync,
  FaCog,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaFilter,
  FaSort,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaTable,
  FaTh,
  FaColumns,
  FaCopy,
  FaDownload,
  FaUpload,
  FaRandom,
  FaExternalLinkAlt,
  FaBook,
  FaCheck,
  FaUndo,
  FaEllipsisV,
  FaQuestionCircle,
  FaStar,
  FaHeart,
  FaDollarSign
} from 'react-icons/fa';
import type { RenderIcon } from 'widgemo-core';

/**
 * FontAwesome icon renderer for widgemo components
 * Maps widgemo icon names to FontAwesome icons from react-icons
 */
export const fontAwesomeRenderIcon: RenderIcon = ({ name, size = 16, className, color = 'currentColor' }) => {
  const iconProps = {
    size,
    className,
    color,
    style: { width: size, height: size }
  };

  switch (name) {
    case 'plus':
    case 'add':
      return <FaPlus {...iconProps} />;

    case 'edit':
    case 'pencil':
      return <FaEdit {...iconProps} />;

    case 'delete':
    case 'trash':
      return <FaTrash {...iconProps} />;

    case 'view':
    case 'eye':
      return <FaEye {...iconProps} />;

    case 'eye-slash':
      return <FaEyeSlash {...iconProps} />;

    case 'refresh':
    case 'reload':
    case 'sync':
      return <FaSync {...iconProps} />;

    case 'settings':
    case 'config':
    case 'cog':
      return <FaCog {...iconProps} />;

    case 'close':
    case 'x':
      return <FaTimes {...iconProps} />;

    case 'chevron-down':
      return <FaChevronDown {...iconProps} />;

    case 'chevron-up':
      return <FaChevronUp {...iconProps} />;

    case 'chevron-left':
      return <FaChevronLeft {...iconProps} />;

    case 'chevron-right':
      return <FaChevronRight {...iconProps} />;

    case 'search':
      return <FaSearch {...iconProps} />;

    case 'filter':
      return <FaFilter {...iconProps} />;

    case 'sort':
      return <FaSort {...iconProps} />;

    case 'chart-bar':
      return <FaChartBar {...iconProps} />;

    case 'chart-line':
      return <FaChartLine {...iconProps} />;

    case 'chart-pie':
      return <FaChartPie {...iconProps} />;

    case 'table':
      return <FaTable {...iconProps} />;

    case 'grid':
      return <FaTh {...iconProps} />;

    case 'board':
      return <FaColumns {...iconProps} />;

    case 'copy':
      return <FaCopy {...iconProps} />;

    case 'download':
      return <FaDownload {...iconProps} />;

    case 'upload':
      return <FaUpload {...iconProps} />;

    case 'random':
      return <FaRandom {...iconProps} />;

    case 'external-link':
      return <FaExternalLinkAlt {...iconProps} />;

    case 'book':
      return <FaBook {...iconProps} />;

    case 'check':
      return <FaCheck {...iconProps} />;

    case 'undo':
      return <FaUndo {...iconProps} />;

    case 'ellipsis-vertical':
      return <FaEllipsisV {...iconProps} />;

    case 'star':
      return <FaStar {...iconProps} />;

    case 'heart':
      return <FaHeart {...iconProps} />;

    case 'currency-dollar':
      return <FaDollarSign {...iconProps} />;

    default:
      // Fallback: question mark icon for unknown icons
      return <FaQuestionCircle {...iconProps} />;
  }
};