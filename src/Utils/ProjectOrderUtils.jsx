// Utility functions for project ordering

// Simple seeded random number generator for consistent random ordering
export const seededRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate a random seed based on builder name
export const generateSeedFromBuilderName = (builderName) => {
  let hash = 0;
  for (let i = 0; i < builderName.length; i++) {
    const char = builderName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Shuffle array using Fisher-Yates algorithm with seed
export const shuffleArrayWithSeed = (array, seed) => {
  const shuffled = [...array];
  let currentSeed = seed;
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 9301 + 49297) % 233280;
    const j = Math.floor((currentSeed / 233280) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
};

// Order projects based on custom order or random order
export const orderProjects = (projects, builderName, customOrder, hasCustomOrder, randomSeed) => {
  if (!projects || projects.length === 0) {
    return [];
  }

  // If custom order is defined, use it
  if (hasCustomOrder && customOrder && customOrder.length > 0) {
    const orderedProjects = [];
    const projectMap = new Map(projects.map(project => [project._id || project.id, project]));
    
    // Add projects in custom order
    customOrder.forEach(projectId => {
      const project = projectMap.get(projectId);
      if (project) {
        orderedProjects.push(project);
      }
    });
    
    // Add any remaining projects that weren't in custom order
    projects.forEach(project => {
      const projectId = project._id || project.id;
      if (!customOrder.includes(projectId)) {
        orderedProjects.push(project);
      }
    });
    
    return orderedProjects;
  }
  
  // Otherwise, use random ordering with seed
  const seed = randomSeed || generateSeedFromBuilderName(builderName);
  return shuffleArrayWithSeed(projects, seed);
};

// Check if a builder has custom order defined
export const hasCustomOrder = (builderName, buildersWithCustomOrder) => {
  return buildersWithCustomOrder[builderName] === true;
};

// Get custom order for a builder
export const getCustomOrder = (builderName, customOrders) => {
  return customOrders[builderName] || [];
};

// Get random seed for a builder
export const getRandomSeed = (builderName, randomSeeds) => {
  return randomSeeds[builderName] || generateSeedFromBuilderName(builderName);
}; 