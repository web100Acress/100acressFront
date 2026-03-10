import React, { useState } from 'react';
import { Plus, Trash2, Columns, Rows } from 'lucide-react';
import showToast from '../../../../../Utils/toastUtils';

const TableBuilder = ({ initialData = { heading: '', rows: [['Header 1', 'Header 2', 'Header 3'], ['', '', '']] }, onChange, onRemove }) => {
  const [heading, setHeading] = useState(initialData.heading || '');
  const [table, setTable] = useState(initialData.rows || [['Header 1', 'Header 2', 'Header 3'], ['', '', '']]);

  const updateCell = (rowIndex, colIndex, value) => {
    const updatedRows = [...table];
    updatedRows[rowIndex] = [...updatedRows[rowIndex]];
    updatedRows[rowIndex][colIndex] = value;
    
    const updatedData = {
      type: 'table',
      heading: heading,
      rows: updatedRows
    };
    
    setTable(updatedRows);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const addRow = () => {
    const newRow = new Array(table[0]?.length || 3).fill('');
    const updatedRows = [...table, newRow];
    
    const updatedData = {
      type: 'table',
      heading: heading,
      rows: updatedRows
    };
    
    setTable(updatedRows);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const addColumn = () => {
    const updatedRows = table.map(row => [...row, '']);
    
    const updatedData = {
      type: 'table',
      heading: heading,
      rows: updatedRows
    };
    
    setTable(updatedRows);
    if (onChange) {
      onChange(updatedData);
    }
  };

  const deleteRow = (index) => {
    if (table.length > 1) {
      const updatedRows = table.filter((_, i) => i !== index);
      
      const updatedData = {
        type: 'table',
        heading: heading,
        rows: updatedRows
      };
      
      setTable(updatedRows);
      if (onChange) {
        onChange(updatedData);
      }
    }
  };

  const deleteColumn = (index) => {
    if (table[0]?.length > 1) {
      const updatedRows = table.map(row => row.filter((_, i) => i !== index));
      
      const updatedData = {
        type: 'table',
        heading: heading,
        rows: updatedRows
      };
      
      setTable(updatedRows);
      if (onChange) {
        onChange(updatedData);
      }
    };
  };

  const handleHeadingChange = (val) => {
    setHeading(val);
    if (onChange) {
      onChange({
        type: 'table',
        heading: val,
        rows: table
      });
    }
  };

  const getTableData = () => ({
    type: 'table',
    heading: heading,
    rows: table
  });

  React.useEffect(() => {
    if (onChange) {
      onChange(getTableData());
    }
  }, [table, heading]);

  return (
    <div className="space-y-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
      {/* Table Heading */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Table Heading (Optional)</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => handleHeadingChange(e.target.value)}
          placeholder="Enter table heading..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
        <button
          type="button"
          onClick={addRow}
          className="px-3 py-2 text-xs rounded bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
        >
          <Rows className="w-3 h-3" />
          Add Row
        </button>
        
        <button
          type="button"
          onClick={addColumn}
          className="px-3 py-2 text-xs rounded bg-green-600 text-white hover:bg-green-700 flex items-center gap-1"
        >
          <Columns className="w-3 h-3" />
          Add Column
        </button>

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="px-3 py-2 text-xs rounded bg-red-600 text-white hover:bg-red-700 ml-auto"
          >
            <Trash2 className="w-3 h-3" />
            Remove Table
          </button>
        )}
      </div>

      {/* Table Grid */}
      <div className="overflow-auto border border-gray-300 rounded">
        <table className="w-full border-collapse">
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`border border-gray-300 p-2 min-w-[120px] ${rowIndex === 0 ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className={`w-full px-2 py-1 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${rowIndex === 0 ? 'font-bold' : ''}`}
                        placeholder={rowIndex === 0 ? `Header ${colIndex + 1}` : `Cell ${rowIndex + 1}-${colIndex + 1}`}
                      />
                      
                      {/* Row delete button */}
                      {colIndex === 0 && table.length > 1 && (
                        <button
                          type="button"
                          onClick={() => deleteRow(rowIndex)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          title="Delete row"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                ))}
                
                {/* Column delete buttons in first row */}
                {rowIndex === 0 && row.map((_, colIndex) => (
                  <td key={`delete-${colIndex}`} className="border-t-0 border-l-0 border-r-0 border-b border-gray-300 p-1 bg-white">
                    {table[0]?.length > 1 && (
                      <button
                        type="button"
                        onClick={() => deleteColumn(colIndex)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Delete column"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Real-time Preview Table */}
      <div className="mt-6 p-4 border-t border-gray-100">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Live Preview Output</h4>
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
          {heading && <h3 className="text-lg font-bold p-3 bg-white border-b border-gray-200">{heading}</h3>}
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                {table[0].map((h, i) => (
                  <th key={i} className="border border-gray-300 p-3 text-left font-bold text-sm text-gray-700">{h || `Header ${i+1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.slice(1).map((row, ri) => (
                <tr key={ri} className="bg-white">
                  {row.map((c, ci) => (
                    <td key={ci} className="border border-gray-300 p-3 text-sm text-gray-600">{c || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table Info */}
      <div className="text-xs text-gray-500 mt-2">
        {table.length} rows × {table[0]?.length || 0} columns
      </div>
    </div>
  );
};

export default TableBuilder;
