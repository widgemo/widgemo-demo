import React from 'react';
import type { Entity } from '@widgemo/widgemo-core';

/**
 * Timeline mode configuration
 */
export interface TimelineModeConfig {
  /** Field name containing the date/timestamp */
  dateField?: string;
  /** How to sort items ('asc' | 'desc') */
  sortOrder?: 'asc' | 'desc';
  /** Timeline orientation ('vertical' | 'horizontal') */
  orientation?: 'vertical' | 'horizontal';
  /** Show connecting lines between items */
  showLines?: boolean;
  /** Timeline color theme */
  color?: string;
  /** Date format options */
  dateFormat?: Intl.DateTimeFormatOptions;
}

/**
 * Props for TimelineMode component
 */
export interface TimelineModeProps {
  /** Array of data entities to render */
  data: Entity[];
  /** Configuration for timeline mode - can be direct config or contain timeline property */
  config?: TimelineModeConfig | { timeline?: TimelineModeConfig } & Record<string, unknown>;
}

/**
 * TimelineMode - Renders data in a chronological timeline layout
 *
 * This mode displays items as a timeline with dates, connecting lines,
 * and chronological ordering. Perfect for displaying events, history,
 * or any time-based data.
 */
const TimelineMode: React.FC<TimelineModeProps> = ({
  data,
  config = {},
}) => {
  // Extract timeline-specific config from the mode config
  const timelineConfig: TimelineModeConfig = ('timeline' in config && config.timeline)
    ? config.timeline
    : config as TimelineModeConfig;
  const {
    dateField = 'date',
    sortOrder = 'desc',
    orientation = 'vertical',
    showLines = true,
    color = '#007bff',
    dateFormat = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  } = timelineConfig;

  // Sort data by date field
  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a[dateField] as string || '1970-01-01').getTime();
      const dateB = new Date(b[dateField] as string || '1970-01-01').getTime();

      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [data, dateField, sortOrder]);


  // Get timeline item styles
  const getTimelineItemStyles = (): React.CSSProperties => ({
    position: 'relative',
    paddingLeft: orientation === 'vertical' ? '2rem' : '0',
    paddingBottom: orientation === 'vertical' ? '2rem' : '0',
    marginBottom: orientation === 'vertical' ? '1rem' : '0',
    marginRight: orientation === 'horizontal' ? '2rem' : '0',
  });

  // Get timeline dot styles
  const getDotStyles = (): React.CSSProperties => ({
    position: 'absolute',
    left: orientation === 'vertical' ? '-0.5rem' : '50%',
    top: orientation === 'vertical' ? '0.25rem' : '50%',
    transform: orientation === 'horizontal' ? 'translate(-50%, -50%)' : 'none',
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    backgroundColor: color,
    border: '2px solid white',
    boxShadow: '0 0 0 2px rgba(0, 123, 255, 0.25)',
    zIndex: 1,
  });

  // Get timeline line styles
  const getLineStyles = (): React.CSSProperties => ({
    position: 'absolute',
    left: orientation === 'vertical' ? '-0.125rem' : '0',
    top: orientation === 'vertical' ? '1rem' : '50%',
    bottom: orientation === 'vertical' ? '0' : 'auto',
    width: orientation === 'vertical' ? '2px' : '100%',
    height: orientation === 'vertical' ? 'auto' : '2px',
    backgroundColor: color,
    opacity: 0.3,
  });

  // Get container styles
  const getContainerStyles = (): React.CSSProperties => ({
    position: 'relative',
    display: orientation === 'horizontal' ? 'flex' : 'block',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    padding: orientation === 'vertical' ? '1rem 0' : '0 1rem',
    minHeight: '200px',
  });

  return (
    <div className="timeline-mode" style={getContainerStyles()}>
      {sortedData.map((item, index) => {
        const dateValue = item[dateField];
        const isLastItem = index === sortedData.length - 1;

        return (
          <div
            key={`${(item as Entity & { id?: string | number }).id || index}`}
            className="timeline-item"
            style={getTimelineItemStyles()}
          >
            {/* Timeline dot */}
            <div style={getDotStyles()} />

            {/* Timeline line (only if not last item and lines enabled) */}
            {showLines && !isLastItem && (
              <div style={getLineStyles()} />
            )}

            {/* Content */}
            <div
              className="timeline-content"
              style={{
                marginLeft: orientation === 'vertical' ? '1rem' : '0',
                marginTop: orientation === 'vertical' ? '0' : '1rem',
                textAlign: orientation === 'horizontal' ? 'center' : 'left',
              }}
            >
              {/* Date */}
              {dateValue ? (
                <div
                  className="timeline-date"
                  style={{
                    fontSize: '0.875rem',
                    color: '#6c757d',
                    fontWeight: 'bold',
                    marginBottom: '0.5rem',
                  }}
                >
                  {typeof dateValue === 'string' || typeof dateValue === 'number'
                    ? new Intl.DateTimeFormat('en-US', dateFormat).format(new Date(dateValue))
                    : String(dateValue)}
                </div>
              ) : null}

              {/* Item content using ItemRenderer */}
              {/* <ItemRenderer
                entity={item}
                config={{}}
              /> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineMode;