import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdFavoriteBorder, MdShare, MdCompare } from "react-icons/md";

// Import modern real estate components
import PageLayout from "../../Components/ModernRealEstate/PageLayout";
import FAQAccordion from "../../Pages/ProjectStatusSearch/FAQAccordion";

const ProjectTypeTemplate = ({
  title,
  description,
  projects,
  filteredData,
  currentPage,
  totalPages,
  searchTerm,
  setSearchTerm,
  selectedCities,
  setSelectedCities,
  selectedProjectStatus,
  setSelectedProjectStatus,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  filterModalOpen,
  setFilterModalOpen,
  viewMode,
  setViewMode,
  sort,
  setSort,
  showFilterBar,
  savedProjects,
  setSavedProjects,
  compareProjects,
  setCompareProjects,
  handlePageChange,
  handleCheckboxChange,
  handleClearFilters,
  removeFilter,
  formatPrice,
  cities,
  projectStatusOptions,
  priceOptions,
  statusMapping,
  badgeColor,
  badgeText,
  typeFilter,
  isLoading = false,
  apiError = null,
  projectType = "project-type",
  metaTitle,
  metaDescription,
  canonical,
  keywords
}) => {
  return (
    <>
      <PageLayout
        title={title}
        description={description}
        projects={projects}
        isLoading={isLoading}
        projectType={projectType}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        canonical={canonical}
        keywords={keywords}
      />
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <FAQAccordion projectStatus={projectType} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTypeTemplate;