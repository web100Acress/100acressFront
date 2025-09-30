// src/Insight/pages/Admin/MarketReports.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Download, 
  FileText, 
  FileSpreadsheet, 
  Upload, 
  BarChart3,
  X,
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  MapPin
} from 'lucide-react';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const MarketReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('form'); // 'form' or 'preview'
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportData, setReportData] = useState({
    title: '',
    city: '',
    period: 'quarterly',
    sections: [{
      id: 1,
      title: 'Market Overview',
      content: '',
      chartType: 'bar',
      data: []
    }]
  });

  // Add a new section
  const addSection = () => {
    setReportData(prev => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: Date.now(),
          title: `Section ${prev.sections.length + 1}`,
          content: '',
          chartType: 'bar',
          data: []
        }
      ]
    }));
  };

  // Remove a section
  const removeSection = (id) => {
    if (reportData.sections.length > 1) {
      setReportData(prev => ({
        ...prev,
        sections: prev.sections.filter(section => section.id !== id)
      }));
    }
  };

  // Handle file upload
  const handleFileUpload = (e, sectionId) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

        // Update the section with the imported data
        setReportData(prev => ({
          ...prev,
          sections: prev.sections.map(section => 
            section.id === sectionId 
              ? { ...section, data: jsonData }
              : section
          )
        }));

        toast.success('Data imported successfully!');
      } catch (error) {
        console.error('Error reading file:', error);
        toast.error('Failed to import file. Please check the format.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  // Generate PDF report
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const input = document.getElementById('report-preview');
      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${reportData.title || 'market-report'}.pdf`);
      toast.success('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate Excel report
  const generateExcel = () => {
    try {
      const wb = XLSX.utils.book_new();
      
      // Add each section as a separate sheet
      reportData.sections.forEach((section, index) => {
        if (section.data && section.data.length > 0) {
          const ws = XLSX.utils.aoa_to_sheet(section.data);
          XLSX.utils.book_append_sheet(wb, ws, `Section ${index + 1}`);
        }
      });

      XLSX.writeFile(wb, `${reportData.title || 'market-report'}.xlsx`);
      toast.success('Excel file generated successfully!');
    } catch (error) {
      console.error('Error generating Excel:', error);
      toast.error('Failed to generate Excel file');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Market Reports</h1>
            <p className="text-gray-500">Create and manage real estate market reports</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'form'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Create Report
              </button>
              <button
                onClick={() => setActiveTab('preview')}
                disabled={!reportData.title}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'preview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                Preview & Export
              </button>
            </nav>
          </div>

          {/* Form Tab */}
          {activeTab === 'form' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Report Title</label>
                  <input
                    type="text"
                    value={reportData.title}
                    onChange={(e) => setReportData({...reportData, title: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Q2 2023 Market Report"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select
                    value={reportData.city}
                    onChange={(e) => setReportData({...reportData, city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select City</option>
                    <option value="delhi">Delhi NCR</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="bangalore">Bangalore</option>
                    <option value="hyderabad">Hyderabad</option>
                    <option value="pune">Pune</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reporting Period</label>
                  <select
                    value={reportData.period}
                    onChange={(e) => setReportData({...reportData, period: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="quarterly">Quarterly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              {/* Sections */}
              <div className="space-y-6">
                {reportData.sections.map((section, index) => (
                  <div key={section.id} className="border border-gray-200 rounded-lg p-4 relative group">
                    {reportData.sections.length > 1 && (
                      <button
                        onClick={() => removeSection(section.id)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        title="Remove section"
                      >
                        <X size={16} />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => {
                            const newSections = [...reportData.sections];
                            newSections[index].title = e.target.value;
                            setReportData({...reportData, sections: newSections});
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chart Type</label>
                        <select
                          value={section.chartType}
                          onChange={(e) => {
                            const newSections = [...reportData.sections];
                            newSections[index].chartType = e.target.value;
                            setReportData({...reportData, sections: newSections});
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="bar">Bar Chart</option>
                          <option value="line">Line Chart</option>
                          <option value="pie">Pie Chart</option>
                          <option value="table">Data Table</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                      <textarea
                        value={section.content}
                        onChange={(e) => {
                          const newSections = [...reportData.sections];
                          newSections[index].content = e.target.value;
                          setReportData({...reportData, sections: newSections});
                        }}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter section content here..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data (Upload Excel or enter manually)
                      </label>
                      <div className="flex items-center space-x-3 mb-3">
                        <label className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                          <Upload size={16} className="mr-2" />
                          Upload Excel
                          <input
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            className="sr-only"
                            onChange={(e) => handleFileUpload(e, section.id)}
                          />
                        </label>
                        <span className="text-sm text-gray-500">or drag and drop</span>
                      </div>

                      {section.data && section.data.length > 0 && (
                        <div className="overflow-x-auto border border-gray-200 rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                              {section.data.slice(0, 3).map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 border">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                              {section.data.length > 3 && (
                                <tr>
                                  <td colSpan={section.data[0]?.length || 1} className="px-3 py-2 text-center text-xs text-gray-500">
                                    + {section.data.length - 3} more rows
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <button
                  onClick={addSection}
                  className="mt-2 flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  <Plus size={16} className="mr-1" /> Add Section
                </button>
              </div>

              <div className="mt-8 flex justify-end space-x-3">
                <button
                  onClick={() => setReportData({
                    title: '',
                    city: '',
                    period: 'quarterly',
                    sections: [{
                      id: 1,
                      title: 'Market Overview',
                      content: '',
                      chartType: 'bar',
                      data: []
                    }]
                  })}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  disabled={!reportData.title}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Preview Report
                </button>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Report Preview</h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setActiveTab('form')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Back to Edit
                  </button>
                  <button
                    onClick={generateExcel}
                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <FileSpreadsheet size={16} className="mr-2" />
                    Export Excel
                  </button>
                  <button
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {isGenerating ? 'Generating...' : (
                      <>
                        <FileText size={16} className="mr-2" />
                        Export PDF
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div id="report-preview" className="bg-white p-8 border border-gray-200 rounded-lg">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{reportData.title}</h1>
                  <div className="flex items-center justify-center space-x-4 text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{reportData.city || 'All Cities'}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon size={16} className="mr-1" />
                      <span>{new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                  </div>
                </div>

                {reportData.sections.map((section, index) => (
                  <div key={section.id} className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">{section.title}</h2>
                    
                    {section.content && (
                      <div className="prose max-w-none mb-6">
                        {section.content.split('\n').map((paragraph, i) => (
                          <p key={i} className="text-gray-700 mb-4">{paragraph}</p>
                        ))}
                      </div>
                    )}

                    {section.data && section.data.length > 0 && (
                      <div className="mt-6 border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-700 mb-3">Data Visualization</h3>
                        <div className="bg-gray-50 p-6 rounded-lg flex items-center justify-center" style={{ minHeight: '300px' }}>
                          <div className="text-center text-gray-500">
                            <BarChart3 size={48} className="mx-auto mb-3 text-gray-300" />
                            <p>Preview of {section.chartType} chart will appear here</p>
                            <p className="text-sm mt-2">(Charts will be fully rendered in the exported PDF/Excel)</p>
                          </div>
                        </div>
                        
                        <div className="mt-6 overflow-x-auto">
                          <h4 className="text-md font-medium text-gray-700 mb-2">Data Table</h4>
                          <table className="min-w-full divide-y divide-gray-200 border">
                            <thead className="bg-gray-50">
                              <tr>
                                {section.data[0]?.map((header, i) => (
                                  <th key={i} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header || `Column ${i + 1}`}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {section.data.slice(1, 6).map((row, i) => (
                                <tr key={i}>
                                  {row.map((cell, j) => (
                                    <td key={j} className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 border">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                              {section.data.length > 6 && (
                                <tr>
                                  <td colSpan={section.data[0]?.length || 1} className="px-4 py-2 text-center text-xs text-gray-500">
                                    + {section.data.length - 6} more rows
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-gray-500 text-center">
                  <p>Generated on {new Date().toLocaleString()}</p>
                  <p className="mt-1">© {new Date().getFullYear()} 100Acress. All rights reserved.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketReports;