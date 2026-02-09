          const status = entity.status as string;
          if (status === 'active') {
            return { backgroundColor: '#469446', color: '#c7dec7' }; // Green bg with light green text
          } else if (status === 'inactive') {
            return { backgroundColor: '#af1010', color: '#e8d2d2' }; // Red bg with light red text
          } else {
            return { backgroundColor: '#9f9f9f', color: '#292929' };
          }
          return undefined;
        }
      }
    },
    footer: {
      enabled: true,
      subtitle: (_data, id) => `widgemo.id: ${JSON.stringify(id)}`
    }
  }
};
// Moved outside to prevent recreation on every render, ensuring stable props for better performance.
export const conditionalBordersConfig: WidgemoConfig = {
