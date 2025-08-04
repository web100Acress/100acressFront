import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  setCustomOrder, 
  removeCustomOrder, 
  setRandomSeed, 
  clearAllCustomOrders,
  syncProjectOrdersFromServer,
  saveProjectOrderToServer,
  deleteProjectOrderFromServer
} from "../Redux/slice/ProjectOrderSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Helmet } from "react-helmet";
import Api_Service from "../Redux/utils/Api_Service";
import { shuffleArrayWithSeed, generateSeedFromBuilderName } from "../Utils/ProjectOrderUtils";
import Sidebar from "./Sidebar";

const ProjectOrderManager = () => {
  const dispatch = useDispatch();
  const [selectedBuilder, setSelectedBuilder] = useState("");
  const [isRandomOrder, setIsRandomOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [targetPosition, setTargetPosition] = useState("");
  const [isSynced, setIsSynced] = useState(true);
  const hasSyncedRef = useRef(false);

  const { getProjectbyBuilder } = Api_Service();

  // Memoize dispatch functions to prevent infinite re-renders
  const memoizedSyncProjectOrders = useCallback(() => {
    return dispatch(syncProjectOrdersFromServer());
  }, [dispatch]);

  const memoizedSaveProjectOrder = useCallback((data) => {
    return dispatch(saveProjectOrderToServer(data));
  }, [dispatch]);

  const memoizedDeleteProjectOrder = useCallback((data) => {
    return dispatch(deleteProjectOrderFromServer(data));
  }, [dispatch]);

  // Get project order state from Redux
  const customOrders = useSelector(store => store?.projectOrder?.customOrders);
  const buildersWithCustomOrder = useSelector(store => store?.projectOrder?.buildersWithCustomOrder);
  const randomSeeds = useSelector(store => store?.projectOrder?.randomSeeds);

  // Get all builder projects from Redux
  const SignatureBuilder = useSelector(store => store?.builder?.signatureglobal);
  const M3M = useSelector(store => store?.builder?.m3m);
  const dlfAllProjects = useSelector(store => store?.builder?.dlf);
  const Experion = useSelector(store => store?.builder?.experion);
  const Elan = useSelector(store => store?.builder?.elan);
  const BPTP = useSelector(store => store?.builder?.bptp);
  const Adani = useSelector(store => store?.builder?.adani);
  const SmartWorld = useSelector(store => store?.builder?.smartworld);
  const Trevoc = useSelector(store => store?.builder?.trevoc);
  const IndiaBulls = useSelector(store => store?.builder?.indiabulls);
  const centralpark = useSelector(store => store?.builder?.centralpark);
  const emaarindia = useSelector(store => store?.builder?.emaarindia);
  const godrej = useSelector(store => store?.builder?.godrej);
  const whiteland = useSelector(store => store?.builder?.whiteland);
  const aipl = useSelector(store => store?.builder?.aipl);
  const birla = useSelector(store => store?.builder?.birla);
  const sobha = useSelector(store => store?.builder?.sobha);
  const trump = useSelector(store => store?.builder?.trump);
  const puri = useSelector(store => store?.builder?.puri);
  const aarize = useSelector(store => store?.builder?.aarize);

  const buildersData = {
    'signature-global': { name: 'Signature Global', projects: SignatureBuilder, query: 'Signature Global' },
    'm3m-india': { name: 'M3M India', projects: M3M, query: 'M3M India' },
    'dlf-homes': { name: 'DLF Homes', projects: dlfAllProjects, query: 'DLF Homes' },
    'experion-developers': { name: 'Experion Developers', projects: Experion, query: 'Experion Developers' },
    'elan-group': { name: 'Elan Group', projects: Elan, query: 'Elan Group' },
    'bptp-limited': { name: 'BPTP LTD', projects: BPTP, query: 'BPTP LTD' },
    'adani-realty': { name: 'Adani Realty', projects: Adani, query: 'Adani Realty' },
    'smartworld-developers': { name: 'Smartworld', projects: SmartWorld, query: 'Smartworld' },
    'trevoc-group': { name: 'Trevoc Group', projects: Trevoc, query: 'Trevoc Group' },
    'indiabulls-real-estate': { name: 'Indiabulls', projects: IndiaBulls, query: 'Indiabulls' },
    'central-park': { name: 'Central Park', projects: centralpark, query: 'Central Park' },
    'emaar-india': { name: 'Emaar India', projects: emaarindia, query: 'Emaar India' },
    'godrej-properties': { name: 'Godrej Properties', projects: godrej, query: 'Godrej Properties' },
    'whiteland': { name: 'Whiteland Corporation', projects: whiteland, query: 'Whiteland Corporation' },
    'aipl': { name: 'AIPL', projects: aipl, query: 'AIPL' },
    'birla-estate': { name: 'Birla Estates', projects: birla, query: 'Birla Estates' },
    'sobha-developers': { name: 'Sobha', projects: sobha, query: 'Sobha' },
    'trump-towers': { name: 'Trump Towers', projects: trump, query: 'Trump Towers' },
    'puri-developers': { name: 'Puri Constructions', projects: puri, query: 'Puri Constructions' },
    'aarize-developers': { name: 'Aarize Group', projects: aarize, query: 'Aarize Group' }
  };

  const selectedBuilderData = buildersData[selectedBuilder];
  const selectedBuilderProjects = selectedBuilderData?.projects || [];
  const hasCustomOrderDefined = buildersWithCustomOrder[selectedBuilder] === true;
  
  // Create ordered projects based on current state
  const orderedProjects = useMemo(() => {
    if (!selectedBuilder || !selectedBuilderProjects.length) {
      return [];
    }
    
    // Get the custom order for this builder
    const customOrder = customOrders[selectedBuilder];
    const hasCustomOrder = buildersWithCustomOrder[selectedBuilder] === true;
    
    if (hasCustomOrder && customOrder && customOrder.length > 0) {
      // Use custom order if available
      const orderedProjects = [];
      const projectMap = new Map(selectedBuilderProjects.map(p => [p._id || p.id, p]));
      
      customOrder.forEach(projectId => {
        const project = projectMap.get(projectId);
        if (project) {
          orderedProjects.push(project);
        }
      });
      
      // Add any remaining projects that weren't in the custom order
      selectedBuilderProjects.forEach(project => {
        if (!customOrder.includes(project._id || project.id)) {
          orderedProjects.push(project);
        }
      });
      
      return orderedProjects;
    } else {
      // Use random order
      const randomSeed = randomSeeds[selectedBuilder] || generateSeedFromBuilderName(selectedBuilder);
      return shuffleArrayWithSeed([...selectedBuilderProjects], randomSeed);
    }
  }, [selectedBuilderProjects, customOrders, buildersWithCustomOrder, randomSeeds, selectedBuilder]);
  
  // Debug logging
  console.log('🔍 selectedBuilder:', selectedBuilder);
  console.log('🔍 selectedBuilderData:', selectedBuilderData);
  console.log('🔍 selectedBuilderProjects:', selectedBuilderProjects);
  console.log('🔍 isRandomOrder:', isRandomOrder);
  console.log('🔍 hasCustomOrderDefined:', hasCustomOrderDefined);
  console.log('🔍 M3M projects from Redux:', M3M);
  console.log('🔍 orderedProjects:', orderedProjects);

  // Sync with server on component mount (only once)
  useEffect(() => {
    if (hasSyncedRef.current) return; // Prevent multiple syncs
    
    console.log('🔍 Syncing project orders from server...');
    hasSyncedRef.current = true;
    setIsSynced(false);
    
    // Use setTimeout to prevent blocking the UI
    setTimeout(() => {
      memoizedSyncProjectOrders()
        .then(() => {
          setIsSynced(true);
          console.log('🔍 Project orders synced successfully');
        })
        .catch((error) => {
          console.error('🔍 Error syncing project orders:', error);
          setIsSynced(false);
          hasSyncedRef.current = false; // Reset on error to allow retry
        });
    }, 100);
  }, [memoizedSyncProjectOrders]);

  useEffect(() => {
    if (selectedBuilder) {
      setIsRandomOrder(!hasCustomOrderDefined);
      
      // Load projects for the selected builder if not already loaded
      const selectedBuilderData = buildersData[selectedBuilder];
      if (selectedBuilderData && (!selectedBuilderData.projects || selectedBuilderData.projects.length === 0)) {
        console.log('🔍 Loading projects for:', selectedBuilderData.query);
        setIsLoadingProjects(true);
        getProjectbyBuilder(selectedBuilderData.query, 0).finally(() => {
          setIsLoadingProjects(false);
        });
      }
    }
  }, [selectedBuilder, hasCustomOrderDefined, buildersData, getProjectbyBuilder]);

  const handleBuilderChange = (e) => {
    setSelectedBuilder(e.target.value);
  };

  const handleOrderTypeChange = (e) => {
    const isRandom = e.target.value === 'random';
    console.log('🔍 Order type changed to:', e.target.value, 'isRandom:', isRandom);
    setIsRandomOrder(isRandom);
    
    if (isRandom && hasCustomOrderDefined) {
      // Remove custom order and enable random
      console.log('🔍 Removing custom order for random mode');
      dispatch(removeCustomOrder({ builderName: selectedBuilder }));
    } else if (!isRandom) {
      // When switching to manual order, we need to ensure we have a custom order
      // If no custom order exists, create one from current order
      if (!hasCustomOrderDefined && orderedProjects.length > 0) {
        console.log('🔍 Creating custom order for manual mode');
        const projectIds = orderedProjects.map(project => project._id || project.id);
        dispatch(setCustomOrder({ 
          builderName: selectedBuilder, 
          projectIds 
        }));
      }
    }
  };

  const handleDragEnd = async (result) => {
    console.log('🔍 Drag ended:', result);
    if (!result.destination || !selectedBuilder) return;

    const items = Array.from(orderedProjects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    console.log('🔍 Reordered items:', items.map(item => item.projectName));

    // Extract project IDs in the new order
    const projectIds = items.map(project => project._id || project.id);
    
    // Set custom order
    dispatch(setCustomOrder({ 
      builderName: selectedBuilder, 
      projectIds 
    }));
    
    setIsRandomOrder(false);

    // Save to server
    try {
      await memoizedSaveProjectOrder({
        builderName: selectedBuilder,
        customOrder: projectIds,
        hasCustomOrder: true,
        randomSeed: randomSeeds[selectedBuilder] || null
      }).unwrap();
      
      console.log('🔍 Project order saved to server after drag');
    } catch (error) {
      console.error('Error saving project order to server:', error);
      alert('Error saving project order to server. Please try again.');
    }
  };

  const handleSaveOrder = async () => {
    if (!selectedBuilder) return;
    
    setIsLoading(true);
    
    try {
      // Get current state for the selected builder
      const customOrder = customOrders[selectedBuilder] || [];
      const hasCustomOrder = buildersWithCustomOrder[selectedBuilder] === true;
      const randomSeed = randomSeeds[selectedBuilder] || null;
      
      // Save to server
      await memoizedSaveProjectOrder({
        builderName: selectedBuilder,
        customOrder,
        hasCustomOrder,
        randomSeed
      }).unwrap();
      
      alert('Project order saved successfully to server!');
    } catch (error) {
      console.error('Error saving project order:', error);
      alert('Error saving project order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToRandom = async () => {
    if (!selectedBuilder) return;
    
    try {
      // Remove from server
      await memoizedDeleteProjectOrder({ builderName: selectedBuilder }).unwrap();
      
      // Remove from local state
      dispatch(removeCustomOrder({ builderName: selectedBuilder }));
      setIsRandomOrder(true);
      
      alert('Project order reset to random successfully!');
    } catch (error) {
      console.error('Error resetting project order:', error);
      alert('Error resetting project order. Please try again.');
    }
  };

  const handleLoadProjects = () => {
    if (!selectedBuilder) return;
    
    const selectedBuilderData = buildersData[selectedBuilder];
    if (selectedBuilderData) {
      console.log('🔍 Manually loading projects for:', selectedBuilderData.query);
      setIsLoadingProjects(true);
      getProjectbyBuilder(selectedBuilderData.query, 0).finally(() => {
        setIsLoadingProjects(false);
      });
    }
  };

  const handleMoveProject = async () => {
    if (!selectedProject || !targetPosition || !selectedBuilder) return;
    
    const targetIndex = parseInt(targetPosition) - 1; // Convert to 0-based index
    if (targetIndex < 0 || targetIndex >= orderedProjects.length) {
      alert('Invalid position. Please enter a number between 1 and ' + orderedProjects.length);
      return;
    }

    const currentIndex = orderedProjects.findIndex(p => (p._id || p.id) === selectedProject);
    if (currentIndex === -1) {
      alert('Selected project not found!');
      return;
    }

    if (currentIndex === targetIndex) {
      alert('Project is already at position ' + targetPosition);
      return;
    }

    // Create new array with reordered projects
    const newOrder = [...orderedProjects];
    const [movedProject] = newOrder.splice(currentIndex, 1);
    newOrder.splice(targetIndex, 0, movedProject);

    // Extract project IDs in the new order
    const projectIds = newOrder.map(project => project._id || project.id);
    
    // Set custom order
    dispatch(setCustomOrder({ 
      builderName: selectedBuilder, 
      projectIds 
    }));
    
    setIsRandomOrder(false);
    setSelectedProject(null);
    setTargetPosition("");
    
    // Save to server
    try {
      await memoizedSaveProjectOrder({
        builderName: selectedBuilder,
        customOrder: projectIds,
        hasCustomOrder: true,
        randomSeed: randomSeeds[selectedBuilder] || null
      }).unwrap();
      
      alert(`Project "${movedProject.projectName}" moved to position ${targetPosition} and saved to server!`);
    } catch (error) {
      console.error('Error saving project order to server:', error);
      alert(`Project moved locally but failed to save to server. Please try again.`);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 dark:text-gray-100 min-h-screen flex">
      <Sidebar />
      <div className="flex-1 p-8 ml-[250px] transition-colors duration-300">
        <Helmet>
          <title>Project Order Manager - Admin Dashboard</title>
        </Helmet>

                <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Project Order Manager
            </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Builder Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Builder
              </label>
              <select
                value={selectedBuilder}
                onChange={handleBuilderChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">Choose a builder...</option>
                {Object.entries(buildersData).map(([key, builder]) => (
                  <option key={key} value={key}>
                    {builder.name} ({builder.projects?.length || 0} projects)
                  </option>
                ))}
              </select>
            </div>

            {/* Order Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Type
              </label>
              <select
                value={isRandomOrder ? 'random' : 'manual'}
                onChange={handleOrderTypeChange}
                disabled={!selectedBuilder}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100 dark:disabled:bg-gray-800 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="random">Random Order (Default for new builders)</option>
                <option value="manual">Manual Order (Custom arrangement)</option>
              </select>
            </div>
          </div>

                     {/* Status Display */}
           {selectedBuilder && (
             <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
               <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                 Current Status: {selectedBuilderData.name}
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-400">
                  {hasCustomOrderDefined ? (
                    <>Custom order defined with {customOrders[selectedBuilder]?.length || 0} projects</>
                  ) : (
                    <>Using random order with seed: {randomSeeds[selectedBuilder] || 'default'}</>
                  )}
                </p>
                <p className={`text-sm ${isSynced ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}`}>
                  {isSynced ? "✅ Synced with server" : "🔄 Syncing with server..."}
                </p>
               <p className="text-blue-600 dark:text-blue-400">
                 {isLoadingProjects ? (
                   "🔄 Loading projects..."
                 ) : (
                   `Total projects: ${orderedProjects.length}`
                 )}
               </p>
             </div>
           )}

          {/* Action Buttons */}
          {selectedBuilder && (
            <div className="flex gap-4 mb-6">
                <button
                  onClick={handleSaveOrder}
                  disabled={isLoading || !selectedBuilder}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400"
                >
                  {isLoading ? 'Saving...' : 'Save Order'}
                </button>
                
                <button
                  onClick={() => {
                    hasSyncedRef.current = false; // Reset to allow manual sync
                    setIsSynced(false);
                    memoizedSyncProjectOrders()
                      .then(() => {
                        setIsSynced(true);
                        alert('Project orders synced successfully!');
                      })
                      .catch((error) => {
                        console.error('Error syncing project orders:', error);
                        setIsSynced(false);
                        alert('Error syncing project orders. Please try again.');
                      });
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Sync with Server
                </button>
              
                             {hasCustomOrderDefined && (
                 <button
                   onClick={handleResetToRandom}
                   className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                 >
                   Reset to Random Order
                 </button>
               )}
               <button
                 onClick={handleLoadProjects}
                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                 Load Projects
               </button>
                               <button
                  onClick={() => {
                    console.log('🔍 Current state - isRandomOrder:', isRandomOrder);
                    console.log('🔍 Current state - hasCustomOrderDefined:', hasCustomOrderDefined);
                    console.log('🔍 Current state - orderedProjects:', orderedProjects.length);
                    console.log('🔍 Redux customOrders:', customOrders);
                    console.log('🔍 Redux buildersWithCustomOrder:', buildersWithCustomOrder);
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                                     Debug State
                 </button>
                 <button
                   onClick={() => {
                     // Test if Redux state is working
                     const testOrder = ['test1', 'test2', 'test3'];
                     dispatch(setCustomOrder({ 
                       builderName: selectedBuilder, 
                       projectIds: testOrder 
                     }));
                     console.log('🔍 Test: Set custom order for', selectedBuilder, ':', testOrder);
                   }}
                   className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                 >
                   Test Redux
                 </button>
                 <button
                   onClick={() => {
                     // Test persistence by setting a custom order and checking localStorage
                     const testOrder = ['persist-test-1', 'persist-test-2', 'persist-test-3'];
                     dispatch(setCustomOrder({ 
                       builderName: selectedBuilder, 
                       projectIds: testOrder 
                     }));
                     
                     // Check localStorage after a short delay
                     setTimeout(() => {
                       const stored = localStorage.getItem('persist:projectOrder');
                       console.log('🔍 Persistence Test - localStorage:', stored);
                       if (stored) {
                         const parsed = JSON.parse(stored);
                         console.log('🔍 Persistence Test - parsed:', parsed);
                       }
                     }, 100);
                   }}
                   className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                 >
                   Test Persistence
                 </button>
            </div>
          )}
        </div>

                             {/* Project List */}
            {selectedBuilder && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  {selectedBuilderData.name} Projects
                </h2>
             
             {isLoadingProjects ? (
               <div className="flex justify-center items-center py-8">
                 <div className="text-lg text-gray-600">Loading projects...</div>
               </div>
             ) : orderedProjects.length > 0 ? (
               <>
                 {isRandomOrder ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     {orderedProjects.map((project, index) => (
                       <div key={project._id || project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-700">
                         <div className="flex items-center justify-between mb-2">
                           <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                             {index + 1}. {project.projectName}
                           </h3>
                           <span className="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded text-blue-600 dark:text-blue-300">
                             Position {index + 1}
                           </span>
                         </div>
                         <p className="text-sm text-gray-600 dark:text-gray-400">
                           {project.city}, {project.state}
                         </p>
                         <p className="text-sm text-gray-500 dark:text-gray-500">
                           {project.type}
                         </p>
                       </div>
                     ))}
                   </div>
                 ) : (
               <div>
                 <p className="text-sm text-gray-600 mb-4">
                   Drag and drop projects to reorder them. The new order will be saved automatically.
                 </p>
                 
                                         {/* Manual Position Selection */}
                        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                          <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Quick Move Project</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                              <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                             Select Project
                           </label>
                           <select
                             value={selectedProject ? (selectedProject._id || selectedProject.id) : ""}
                             onChange={(e) => {
                               const project = orderedProjects.find(p => (p._id || p.id) === e.target.value);
                               setSelectedProject(project || null);
                             }}
                             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                           >
                         <option value="">Choose a project...</option>
                         {orderedProjects.map((project, index) => (
                           <option key={project._id || project.id} value={project._id || project.id}>
                             {index + 1}. {project.projectName}
                           </option>
                         ))}
                       </select>
                     </div>
                     
                                              <div>
                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                             Move to Position
                           </label>
                           <input
                             type="number"
                             min="1"
                             max={orderedProjects.length}
                             value={targetPosition}
                             onChange={(e) => setTargetPosition(e.target.value)}
                             placeholder={`1-${orderedProjects.length}`}
                             className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                           />
                         </div>
                     
                     <div className="flex items-end gap-2">
                       <button
                         onClick={handleMoveProject}
                         disabled={!selectedProject || !targetPosition}
                         className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         Move Project
                       </button>
                       <button
                         onClick={() => {
                           setSelectedProject(null);
                           setTargetPosition("");
                         }}
                         className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                         title="Clear selection"
                       >
                         ✕
                       </button>
                     </div>
                   </div>
                   {selectedProject && (
                     <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-2">
                       Moving: <strong>{selectedProject.projectName}</strong> (Current Position: {orderedProjects.findIndex(p => (p._id || p.id) === (selectedProject._id || selectedProject.id)) + 1})
                     </p>
                   )}
                 </div>
                 <DragDropContext onDragEnd={handleDragEnd}>
                   <Droppable droppableId="projects">
                     {(provided) => (
                       <div
                         {...provided.droppableProps}
                         ref={provided.innerRef}
                         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                       >
                         {orderedProjects.map((project, index) => (
                           <Draggable
                             key={project._id || project.id}
                             draggableId={project._id || project.id}
                             index={index}
                           >
                             {(provided, snapshot) => (
                               <div
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 className={`p-4 border border-gray-200 dark:border-gray-600 rounded-lg cursor-move ${
                                   snapshot.isDragging ? 'bg-blue-50 dark:bg-blue-900 shadow-lg' : 'bg-white dark:bg-gray-700'
                                 }`}
                               >
                                 <div className="flex items-center justify-between">
                                   <div>
                                     <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                       {index + 1}. {project.projectName}
                                     </h3>
                                     <p className="text-sm text-gray-600 dark:text-gray-400">
                                       {project.city}, {project.state}
                                     </p>
                                     <p className="text-sm text-gray-500 dark:text-gray-500">
                                       {project.type}
                                     </p>
                                   </div>
                                   <div className="flex items-center gap-2">
                                     <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                                       Position {index + 1}
                                     </span>
                                     <div className="text-gray-400 dark:text-gray-500">
                                       ⋮⋮
                                     </div>
                                   </div>
                                 </div>
                               </div>
                             )}
                           </Draggable>
                         ))}
                         {provided.placeholder}
                       </div>
                     )} 
                   </Droppable>
                 </DragDropContext>
               </div>
             )}
           </>
         ) : (
           <div className="text-center py-8 text-gray-500 dark:text-gray-400">
             No projects found for this builder.
           </div>
         )}
       </div>
     )}

        </div>
        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">How it works:</h2>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <p>
              <strong>Random Order:</strong> New builders automatically get random project ordering. 
              This provides variety and prevents bias in project display.
            </p>
            <p>
              <strong>Manual Order:</strong> You can drag and drop projects to create a custom order. 
              This order will be saved and used consistently.
            </p>
            <p>
              <strong>Switching:</strong> You can switch between random and manual ordering at any time. 
              Manual orders are preserved when switching back and forth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOrderManager; 