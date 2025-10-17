import { format, parse, isAfter, isValid } from 'date-fns';

/**
 * Utility function to handle dynamic possession field logic
 * @param {Object} project - Project object containing possession information
 * @returns {Object} - Object containing label and value for possession display
 */
export const getPossessionInfo = (project) => {
  if (!project?.possessionDate) {
    return {
      label: 'Possession',
      value: project?.project_Status || project?.possession || 'Ready to Move'
    };
  }

  try {
    const currentDate = new Date();
    let possessionDate;
    let possessionString = project.possessionDate;

    // Handle different possession date formats
    if (typeof possessionString === 'string') {
      // Check if it's just a year (e.g., "2025")
      if (/^\d{4}$/.test(possessionString.trim())) {
        // Assume December of that year
        possessionDate = new Date(parseInt(possessionString), 11, 31); // December 31st
      }
      // Check if it's month and year (e.g., "Jun 2025", "June 2025")
      else if (/^[A-Za-z]{3,9}\s+\d{4}$/.test(possessionString.trim())) {
        try {
          // Try parsing with different formats
          possessionDate = parse(possessionString, 'MMM yyyy', new Date());
          if (!isValid(possessionDate)) {
            possessionDate = parse(possessionString, 'MMMM yyyy', new Date());
          }
        } catch (error) {
          console.warn('Error parsing possession date format:', possessionString, error);
          possessionDate = new Date(possessionString);
        }
      }
      // Try parsing as ISO date or other standard formats
      else {
        possessionDate = new Date(possessionString);
      }
    } else {
      possessionDate = new Date(possessionString);
    }

    // Validate the parsed date
    if (!isValid(possessionDate)) {
      console.warn('Invalid possession date:', possessionString);
      return {
        label: 'Possession',
        value: project?.project_Status || 'Ready to Move'
      };
    }

    // Compare with current date
    const isPossessionPassed = isAfter(currentDate, possessionDate);

    if (isPossessionPassed) {
      return {
        label: 'Status',
        value: 'Ready to Move In'
      };
    } else {
      return {
        label: 'Possession',
        value: format(possessionDate, 'MMM yyyy')
      };
    }

  } catch (error) {
    console.error('Error processing possession date:', error);
    return {
      label: 'Possession',
      value: project?.project_Status || 'Ready to Move'
    };
  }
};

/**
 * Legacy function for backward compatibility - returns only the formatted value
 * @param {Object} project - Project object containing possession information
 * @returns {string} - Formatted possession value
 */
export const formatPossession = (project) => {
  const possessionInfo = getPossessionInfo(project);
  return possessionInfo.value;
};

/**
 * Get possession label dynamically
 * @param {Object} project - Project object containing possession information
 * @returns {string} - Dynamic label ('Possession' or 'Status')
 */
export const getPossessionLabel = (project) => {
  const possessionInfo = getPossessionInfo(project);
  return possessionInfo.label;
};
