import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Columns, Rows, Save, Link, Palette, ChevronDown, ChevronUp, Table, Users, Clock, Zap, Eye } from 'lucide-react';
import api from '../../../../../config/apiClient';
import showToast from '../../../../../Utils/toastUtils';

// ── Cell Editor Popover ──────────────────────────────────────────────
const CellEditor = ({ cell, onUpdate, onClose }) => {
  const [local, setLocal] = useState({ ...cell });

  const apply = () => {
    onUpdate(local);
    showToast.success('Cell updated successfully');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[6000] bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div className="bg-[#1a1a2e] border border-[#c9a84c] rounded-xl p-5 w-[300px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="pop-header">Cell Settings</div>

        <label className="pop-label">Text</label>
        <input
          className="pop-input"
          value={local.text}
          onChange={e => setLocal(p => ({ ...p, text: e.target.value }))}
          placeholder="Cell text…"
        />

        <label className="pop-label">Hyperlink URL</label>
        <div className="pop-row">
          <span className="pop-icon">🔗</span>
          <input
            className="pop-input"
            value={local.link || ''}
            onChange={e => setLocal(p => ({ ...p, link: e.target.value }))}
            placeholder="https://…"
          />
        </div>

        <div className="pop-colors">
          <div>
            <label className="pop-label">Background</label>
            <input type="color" value={local.bgColor || '#ffffff'} onChange={e => setLocal(p => ({ ...p, bgColor: e.target.value }))} />
          </div>
          <div>
            <label className="pop-label">Text Color</label>
            <input type="color" value={local.textColor || '#1a1a2e'} onChange={e => setLocal(p => ({ ...p, textColor: e.target.value }))} />
          </div>
        </div>

        <div className="pop-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="button" className="btn-apply" onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
};

// ── Cell Component ───────────────────────────────────────────────────
const Cell = ({ cell, isHeader, onChange }) => {
  const [open, setOpen] = useState(false);

  const style = {
    backgroundColor: cell.bgColor || (isHeader ? '#1a1a2e' : '#ffffff'),
    color: cell.textColor || (isHeader ? '#c9a84c' : '#1a1a2e'),
  };

  return (
    <div className={`cell-wrap ${isHeader ? 'cell-header' : 'cell-body'}`} style={style}>
      {cell.link
        ? <a href={cell.link} target="_blank" rel="noopener noreferrer" className="cell-link" style={{ color: style.color }}>{cell.text || (isHeader ? 'Header' : '—')}</a>
        : <span className="cell-text">{cell.text || (isHeader ? 'Header' : '—')}</span>
      }
      <button type="button" className="cell-edit-btn" onClick={() => setOpen(true)} title="Edit cell">✎</button>
      {/* Use React Portal or just render it, since it's now a fixed modal it will overlay properly */}
      {open && <CellEditor cell={cell} onUpdate={onChange} onClose={() => setOpen(false)} />}
    </div>
  );
};

// ── Single Table ─────────────────────────────────────────────────────
const makeCell = (text = '') => ({ text, link: '', bgColor: '', textColor: '' });

const SingleTable = ({ index, tableData, onChange, onRemove, onInsert }) => {
  const [collapsed, setCollapsed] = useState(false);
  const heading = tableData.heading || '';

  // Normalize cells: convert plain strings to cell objects
  const normalizeCell = (cell) =>
    typeof cell === 'string' ? { text: cell, link: '', bgColor: '', textColor: '' } : cell;
  const rawRows = tableData.rows || [
    [makeCell('Header 1'), makeCell('Header 2'), makeCell('Header 3')],
    [makeCell(''), makeCell(''), makeCell('')],
  ];
  const rows = rawRows.map(row => row.map(normalizeCell));

  const updateCell = (ri, ci, val) => {
    const newRows = rows.map((row, rIdx) => row.map((cell, cIdx) => (rIdx === ri && cIdx === ci) ? { ...cell, ...val } : cell));
    onChange({ ...tableData, rows: newRows });
  };

  const addRow = () => {
    const newRow = Array(rows[0].length).fill(null).map(() => makeCell());
    onChange({ ...tableData, rows: [...rows, newRow] });
  };

  const addCol = () => {
    const newRows = rows.map(row => [...row, makeCell()]);
    onChange({ ...tableData, rows: newRows });
  };

  const delRow = ri => {
    if (rows.length > 1) onChange({ ...tableData, rows: rows.filter((_, i) => i !== ri) });
  };
  const delCol = ci => {
    if (rows[0].length > 1) onChange({ ...tableData, rows: rows.map(row => row.filter((_, i) => i !== ci)) });
  };

  return (
    <>
      <div className="single-table">
        {/* Table Header Bar */}
        <div className="table-bar">
          <span className="table-badge">T{index + 1}</span>
          <input
            className="heading-input"
            value={heading}
            onChange={e => onChange({ ...tableData, heading: e.target.value })}
            placeholder="Table heading (optional)…"
          />
          <div className="bar-actions">
            <button type="button" className="icon-btn green" onClick={addRow} title="Add Row"><Rows size={14} /></button>
            <button type="button" className="icon-btn blue" onClick={addCol} title="Add Column"><Columns size={14} /></button>
            <button type="button" className="icon-btn ghost" onClick={() => setCollapsed(p => !p)} title="Collapse">
              {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
            </button>
            <button type="button" className="icon-btn red" onClick={onRemove} title="Remove Table"><Trash2 size={14} /></button>
          </div>
        </div>

        {!collapsed && (
          <>
            {/* Edit Grid */}
            <div className="grid-scroll">
              <table className="edit-table">
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci} className="edit-td">
                          <Cell
                            cell={cell}
                            isHeader={ri === 0}
                            onChange={val => updateCell(ri, ci, val)}
                          />
                        </td>
                      ))}
                      <td className="action-td">
                        {rows.length > 1 && (
                          <button type="button" className="del-btn" onClick={() => delRow(ri)} title="Delete row"><Trash2 size={11} /></button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {/* Column delete row */}
                  <tr>
                    {rows[0].map((_, ci) => (
                      <td key={ci} className="action-td center">
                        {rows[0].length > 1 && (
                          <button type="button" className="del-btn" onClick={() => delCol(ci)} title="Delete column"><Trash2 size={11} /></button>
                        )}
                      </td>
                    ))}
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Live Preview */}
            <div className="preview-wrap">
              <div className="flex items-center justify-between border-top pt-3 pb-2 border-t border-[var(--border)] mt-2">
                <div className="preview-label !mt-0 !pt-0 !mb-0 !border-0 flex-shrink-0">◆ Live Preview</div>
                {onInsert && (
                  <button
                    type="button"
                    className="px-3 py-1 bg-[var(--gold)] text-[var(--dark)] rounded-md text-xs font-semibold hover:bg-[var(--gold-light)] flex items-center gap-1.5 transition-colors"
                    onClick={() => onInsert(tableData)}
                  >
                    <Plus size={12} strokeWidth={3} />
                    Insert to Editor
                  </button>
                )}
              </div>
              {heading && <div className="preview-heading mt-2">{heading}</div>}
              <div className="preview-scroll mt-2">
                <table className="preview-table">
                  <thead>
                    <tr>
                      {rows[0].map((cell, ci) => (
                        <th key={ci} style={{ backgroundColor: cell.bgColor || '#1a1a2e', color: cell.textColor || '#c9a84c' }}>
                          {cell.link
                            ? <a href={cell.link} target="_blank" rel="noopener noreferrer" style={{ color: cell.textColor || '#c9a84c' }}>{cell.text || `Header ${ci + 1}`}</a>
                            : cell.text || `Header ${ci + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice(1).map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={{ backgroundColor: cell.bgColor || '#faf8f3', color: cell.textColor || '#1a1a2e' }}>
                            {cell.link
                              ? <a href={cell.link} target="_blank" rel="noopener noreferrer" style={{ color: cell.textColor || '#c9a84c' }}>{cell.text || '—'}</a>
                              : cell.text || '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="table-info">{rows.length} rows × {rows[0]?.length || 0} columns</div>
          </>
        )}
      </div>
    </>
  );
};

// ── Main TableBuilder ─────────────────────────────────────────────────
const makeDefaultTable = () => ({
  heading: '',
  rows: [
    [makeCell('Header 1'), makeCell('Header 2'), makeCell('Header 3')],
    [makeCell(''), makeCell(''), makeCell('')],
  ],
});

// ── Enhanced Table Builder with Real-time Collaboration ─────────────────────────────────
const TableBuilder = ({ initialData, onChange, onRemove, onInsert, blogId = null, enableRealTime = false, autoSave = true }) => {
  const [tables, setTables] = useState(
    initialData ? [initialData] : [makeDefaultTable()]
  );

  const updateTable = (index, data) => {
    const updated = tables.map((t, i) => (i === index ? data : t));
    setTables(updated);
    if (onChange) onChange(updated);
  };

  const removeTable = (index) => {
    const updated = tables.filter((_, i) => i !== index);
    setTables(updated);
    if (onChange) onChange(updated);
  };

  const addTable = () => {
    const updated = [...tables, makeDefaultTable()];
    setTables(updated);
    if (onChange) onChange(updated);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --gold: #c9a84c;
          --gold-light: #e8d5a3;
          --dark: #1a1a2e;
          --dark2: #16213e;
          --cream: #faf8f3;
          --border: #e2d9c5;
          --red: #c0392b;
          --green: #27ae60;
          --blue: #2980b9;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tb-root {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          padding: 32px 24px;
        }

        .tb-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--dark);
          letter-spacing: .04em;
          margin-bottom: 6px;
        }
        .tb-subtitle { font-size: 13px; color: #8a7d6b; margin-bottom: 28px; }

        .single-table {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 20px;
          overflow: hidden;
          box-shadow: 0 2px 16px rgba(26,26,46,.06);
        }

        .table-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: var(--dark);
          border-bottom: 2px solid var(--gold);
        }
        .table-badge {
          font-family: 'Cormorant Garamond', serif;
          font-size: 13px;
          font-weight: 700;
          color: var(--gold);
          background: rgba(201,168,76,.15);
          border: 1px solid rgba(201,168,76,.4);
          border-radius: 6px;
          padding: 2px 9px;
          white-space: nowrap;
        }
        .heading-input {
          flex: 1;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 6px;
          padding: 7px 12px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          outline: none;
          transition: border .2s;
        }
        .heading-input::placeholder { color: rgba(255,255,255,.35); }
        .heading-input:focus { border-color: var(--gold); }

        .bar-actions { display: flex; gap: 6px; }
        .icon-btn {
          display: flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 6px; border: none; cursor: pointer;
          transition: all .18s;
        }
        .icon-btn.green { background: rgba(39,174,96,.2); color: #4ade80; }
        .icon-btn.green:hover { background: rgba(39,174,96,.4); }
        .icon-btn.blue { background: rgba(41,128,185,.2); color: #60a5fa; }
        .icon-btn.blue:hover { background: rgba(41,128,185,.4); }
        .icon-btn.red { background: rgba(192,57,43,.2); color: #f87171; }
        .icon-btn.red:hover { background: rgba(192,57,43,.4); }
        .icon-btn.ghost { background: rgba(255,255,255,.08); color: rgba(255,255,255,.6); }
        .icon-btn.ghost:hover { background: rgba(255,255,255,.18); }

        .grid-scroll { overflow-x: auto; padding: 16px; }
        .edit-table { border-collapse: collapse; }
        .edit-td { padding: 4px; position: relative; }
        .action-td { padding: 2px 4px; }
        .action-td.center { text-align: center; }

        /* Cell Wrapper */
        .cell-wrap {
          position: relative;
          min-width: 130px;
          border-radius: 6px;
          padding: 8px 32px 8px 10px;
          border: 1px solid var(--border);
          transition: box-shadow .2s;
          cursor: default;
        }
        .cell-wrap:hover { box-shadow: 0 0 0 2px var(--gold-light); }
        .cell-header { border-width: 2px; }
        .cell-text { font-size: 13px; }
        .cell-header .cell-text { font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 14px; }
        .cell-link {
          font-size: 13px;
          text-decoration: underline;
          text-underline-offset: 2px;
          cursor: pointer;
        }
        .cell-edit-btn {
          position: absolute; top: 4px; right: 4px;
          background: rgba(0,0,0,.08); border: none; border-radius: 4px;
          font-size: 11px; cursor: pointer; padding: 2px 5px;
          opacity: 0; transition: opacity .15s;
          color: inherit;
        }
        .cell-wrap:hover .cell-edit-btn { opacity: 1; }

        /* Popover */
        .cell-popover {
          position: absolute; top: 105%; left: 0; z-index: 999;
          background: var(--dark);
          border: 1px solid var(--gold);
          border-radius: 10px;
          padding: 14px;
          min-width: 240px;
          box-shadow: 0 12px 40px rgba(0,0,0,.35);
        }
        .pop-header {
          font-family: 'Cormorant Garamond', serif;
          font-size: 14px; font-weight: 700;
          color: var(--gold);
          margin-bottom: 10px;
          border-bottom: 1px solid rgba(201,168,76,.2);
          padding-bottom: 6px;
        }
        .pop-label { display: block; font-size: 11px; color: rgba(255,255,255,.5); margin: 8px 0 3px; text-transform: uppercase; letter-spacing: .06em; }
        .pop-input {
          width: 100%; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15);
          border-radius: 6px; padding: 6px 10px; color: #fff; font-size: 13px; outline: none;
        }
        .pop-input:focus { border-color: var(--gold); }
        .pop-row { display: flex; align-items: center; gap: 6px; }
        .pop-icon { font-size: 14px; }
        .pop-colors { display: flex; gap: 16px; margin-top: 4px; }
        .pop-colors input[type=color] { width: 44px; height: 30px; border: 1px solid rgba(255,255,255,.2); border-radius: 6px; cursor: pointer; background: transparent; }
        .pop-actions { display: flex; gap: 8px; margin-top: 12px; }
        .btn-cancel {
          flex: 1; padding: 7px; border-radius: 6px; border: 1px solid rgba(255,255,255,.15);
          background: transparent; color: rgba(255,255,255,.6); cursor: pointer; font-size: 12px;
          transition: all .15s;
        }
        .btn-cancel:hover { background: rgba(255,255,255,.08); }
        .btn-apply {
          flex: 1; padding: 7px; border-radius: 6px; border: none;
          background: var(--gold); color: var(--dark); cursor: pointer; font-size: 12px; font-weight: 600;
          transition: all .15s;
        }
        .btn-apply:hover { background: var(--gold-light); }

        .del-btn {
          background: rgba(192,57,43,.1); border: none; border-radius: 4px;
          color: var(--red); cursor: pointer; padding: 4px; display: flex; align-items: center;
          transition: background .15s;
        }
        .del-btn:hover { background: rgba(192,57,43,.25); }

        /* Preview */
        .preview-wrap { padding: 0 16px 16px; }
        .preview-label {
          font-size: 10px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 10px; border-top: 1px solid var(--border); padding-top: 14px;
        }
        .preview-heading {
          font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 700;
          color: var(--dark); margin-bottom: 10px;
        }
        .preview-scroll { overflow-x: auto; border-radius: 8px; border: 1px solid var(--border); }
        .preview-table { border-collapse: collapse; width: 100%; }
        .preview-table th {
          padding: 10px 16px; font-family: 'Cormorant Garamond', serif; font-size: 14px;
          font-weight: 700; text-align: left; letter-spacing: .04em;
        }
        .preview-table td {
          padding: 9px 16px; font-size: 13px; border-top: 1px solid var(--border);
        }
        .preview-table a { text-decoration: underline; text-underline-offset: 2px; }

        .table-info { font-size: 11px; color: #a09887; padding: 6px 16px 12px; }

        /* Add Table Button */
        .add-table-btn {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 14px 20px;
          background: var(--dark); border: 2px dashed rgba(201,168,76,.4);
          border-radius: 12px; cursor: pointer; color: var(--gold);
          font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 600;
          letter-spacing: .04em; transition: all .2s;
        }
        .add-table-btn:hover {
          border-color: var(--gold); background: #1e1e38;
          box-shadow: 0 0 20px rgba(201,168,76,.12);
        }
        .add-table-btn .plus-circle {
          width: 28px; height: 28px; border-radius: 50%;
          border: 1.5px solid var(--gold); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
      `}</style>

      <div className="tb-root">
        <div className="tb-title">◈ Table Builder</div>
        <div className="tb-subtitle">Click ✎ on any cell to set text, link, and colors · Add multiple tables below</div>

        {tables.map((t, i) => (
          <SingleTable
            key={i}
            index={i}
            tableData={t}
            onChange={data => updateTable(i, data)}
            onRemove={() => removeTable(i)}
            onInsert={onInsert}
          />
        ))}

        <button type="button" className="add-table-btn" onClick={addTable}>
          <span className="plus-circle"><Plus size={14} /></span>
          Add New Table
        </button>
      </div>
    </>
  );
};

export default TableBuilder;