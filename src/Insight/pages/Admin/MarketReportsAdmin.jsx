import React, { useState, useEffect } from "react";
import api from "../../../config/apiClient";
import { showToast } from "../../../utils/toastUtils";
import { Link } from 'react-router-dom';
import AdminInsightsSidebar from '../../components/AdminInsightsSidebar';
import { 
  Form, 
  Input, 
  Select, 
  Upload, 
  Button, 
  Table, 
  Tabs, 
  Card, 
  message, 
  Badge, 
  Tag, 
  Space, 
  Tooltip, 
  Empty,
  Modal
} from 'antd';
import { 
  UploadOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  DownloadOutlined, 
  FileTextOutlined, 
  BarChartOutlined, 
  CalendarOutlined, 
  EnvironmentOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined, 
  FileImageOutlined,
  EditOutlined,
  SaveOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const MarketReportsAdmin = () => {
  const [form] = Form.useForm();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [cities, setCities] = useState([]);
  const [editingReport, setEditingReport] = useState(null);
  
  // Get current date for dynamic period options
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // 1-12
  
  // Determine current quarter (1-4)
  const currentQuarter = Math.ceil(currentMonth / 3);
  
  // Generate period options for current and next 2 quarters
  const generatePeriodOptions = () => {
    const options = [];
    let year = currentYear;
    let quarter = currentQuarter;
    
    // Add current and next 2 quarters
    for (let i = 0; i < 4; i++) {
      options.push({
        value: `Q${quarter} ${year}`,
        label: `Q${quarter} ${year}`,
        sortOrder: year * 10 + quarter
      });
      
      // Move to next quarter
      quarter++;
      if (quarter > 4) {
        quarter = 1;
        year++;
      }
    }
    
    // Add annual report options for current and next year
    options.push(
      { value: `Annual ${currentYear}`, label: `Annual ${currentYear}`, sortOrder: currentYear * 10 + 5 },
      { value: `Annual ${currentYear + 1}`, label: `Annual ${currentYear + 1}`, sortOrder: (currentYear + 1) * 10 + 5 }
    );
    
    // Sort by year and quarter
    return options.sort((a, b) => a.sortOrder - b.sortOrder);
  };
  
  const periodOptions = generatePeriodOptions();

  useEffect(() => {
    fetchReports();
    fetchCities();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '').replace(/^Bearer\s+/i, '') || '';
      const response = await api.get('/api/market-reports', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      console.log('Fetched reports:', response.data);
      setReports(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching reports:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      });
      message.error('Failed to load market reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await api.get('/project/viewAll/data?sort=-createdAt');
      const uniqueCities = [...new Set((response.data?.data || []).map(p => p.city).filter(Boolean))];
      setCities(uniqueCities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    form.setFieldsValue({
      ...report,
      // Handle file field if needed
      file: report.file ? [{
        uid: '-1',
        name: report.file.split('/').pop(),
        status: 'done',
        url: report.file
      }] : []
    });
    setActiveTab('2'); // Switch to the form tab
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingReport(null);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      console.log('Form values:', values);
      
      // Add all form values to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Handle array values (like file lists)
          if (key === 'file' && value[0]?.originFileObj) {
            console.log('Appending file:', value[0].originFileObj);
            formData.append('file', value[0].originFileObj);
          } else if (key !== 'file') {
            console.log(`Appending ${key}:`, value);
            formData.append(key, value);
          }
        }
      });
      
      // If editing, include the report ID
      if (editingReport) {
        formData.append('_id', editingReport._id);
      }

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ', pair[1]);
      }

      // Get auth token
      const token = localStorage.getItem('myToken')?.replace(/^"/, '').replace(/"$/, '').replace(/^Bearer\s+/i, '') || '';
      console.log('Using token:', token ? 'Token exists' : 'No token found');
      
      try {
        let response;
        
        if (editingReport) {
          // Update existing report
          response = await api.put(`/api/market-reports/${editingReport._id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
          });
        } else {
          // Create new report
          response = await api.post('/api/market-reports', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
          });
        }
        
        console.log('Server response:', response.data);
        showToast.success(`Report ${editingReport ? 'updated' : 'added'} successfully!`);
        form.resetFields();
        setEditingReport(null);
        fetchReports();
        setActiveTab('1');
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
          throw new Error(`Server responded with status ${error.response.status}: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          throw new Error('No response received from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error setting up request:', error.message);
          throw error;
        }
      }
    } catch (error) {
      console.error('Error adding report:', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      message.error(error.message || 'Failed to add market report');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '').replace(/^Bearer\s+/i, '') || '';
      await api.delete(`/api/market-reports/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      showToast.success(showToast.successMessages.deleteSuccess);
      await fetchReports();
    } catch (error) {
      console.error('Error deleting report:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      showToast.error(error.response?.data?.message || showToast.errorMessages.deleteError);
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'PDF': return <FilePdfOutlined className="text-red-500" />;
      case 'Excel': return <FileExcelOutlined className="text-green-600" />;
      case 'Infographic': return <FileImageOutlined className="text-blue-500" />;
      default: return <FileTextOutlined />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'PDF': return 'red';
      case 'Excel': return 'green';
      case 'Infographic': return 'blue';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Report Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            <FileTextOutlined />
          </div>
          <span className="font-medium text-gray-900">{text}</span>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'city',
      key: 'city',
      render: (city) => (
        <Space>
          <EnvironmentOutlined className="text-indigo-500" />
          <span className="text-gray-700">{city}</span>
        </Space>
      ),
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      render: (period) => (
        <Space>
          <CalendarOutlined className="text-amber-500" />
          <span className="text-gray-700">{period}</span>
        </Space>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (
        <Tag icon={getTypeIcon(type)} color={getTypeColor(type)} className="px-3 py-1">
          {type}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Download Report">
            <Button 
              type="primary"
              size="small"
              icon={<DownloadOutlined />} 
              onClick={() => window.open(record.fileUrl, '_blank')}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Download
            </Button>
          </Tooltip>
          <Tooltip title="Delete Report">
            <Button 
              danger 
              size="small"
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const statsCards = [
    {
      title: 'Total Reports',
      value: reports.length,
      icon: <FileTextOutlined />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Cities Covered',
      value: [...new Set(reports.map(r => r.city))].length,
      icon: <EnvironmentOutlined />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'PDF Reports',
      value: reports.filter(r => r.type === 'PDF').length,
      icon: <FilePdfOutlined />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    },
    {
      title: 'Excel Reports',
      value: reports.filter(r => r.type === 'Excel').length,
      icon: <FileExcelOutlined />,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20 relative">
      <div className="fixed inset-y-0 left-0 z-50">
        <AdminInsightsSidebar />
      </div>
      <div className="flex-1 pl-[280px]">
        {/* Enhanced Header */}
        <div className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <BarChartOutlined className="text-white text-xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Market Reports</h1>
                  <p className="text-sm text-gray-500">Manage and organize market insights</p>
                </div>
              </div>
              <Link
                to="/Admin/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
              >
                ← Back to Dashboard
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          <Card className="rounded-2xl shadow-sm border-gray-200">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              size="large"
              items={[
                {
                  key: '1',
                  label: (
                    <span className="flex items-center gap-2 px-2">
                      <FileTextOutlined />
                      View Reports
                      <Badge count={reports.length} showZero style={{ backgroundColor: '#4F46E5' }} />
                    </span>
                  ),
                  children: (
                    <div className="mt-4">
                      <Table 
                        columns={[
                          {
                            title: 'Title',
                            dataIndex: 'title',
                            key: 'title',
                            render: (text, record) => (
                              <div>
                                <div className="font-medium text-gray-900">{text}</div>
                                <div className="text-sm text-gray-500">{record.city} • {record.period}</div>
                              </div>
                            ),
                          },
                          {
                            title: 'Type',
                            dataIndex: 'type',
                            key: 'type',
                            render: (type) => {
                              const iconProps = {
                                PDF: { icon: <FilePdfOutlined className="text-red-500" />, color: 'red' },
                                Excel: { icon: <FileExcelOutlined className="text-green-600" />, color: 'green' },
                                Infographic: { icon: <FileImageOutlined className="text-blue-500" />, color: 'blue' },
                              }[type] || { icon: <FileTextOutlined />, color: 'gray' };
                              
                              return (
                                <Tag color={iconProps.color} className="flex items-center gap-1">
                                  {iconProps.icon} {type}
                                </Tag>
                              );
                            },
                          },
                          {
                            title: 'Date',
                            dataIndex: 'createdAt',
                            key: 'date',
                            render: (date) => new Date(date).toLocaleDateString(),
                            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
                          },
                          {
                            title: 'Actions',
                            key: 'actions',
                            render: (_, record) => (
                              <Space size="middle">
                                <Button 
                                  type="link" 
                                  icon={<EditOutlined />} 
                                  onClick={() => handleEdit(record)}
                                  className="text-blue-500"
                                />
                                <Button 
                                  type="link" 
                                  danger 
                                  icon={<DeleteOutlined />} 
                                  onClick={() => {
                                    Modal.confirm({
                                      title: 'Delete Report',
                                      content: 'Are you sure you want to delete this report?',
                                      okText: 'Yes, delete it',
                                      okType: 'danger',
                                      cancelText: 'No, keep it',
                                      onOk() {
                                        deleteReport(record._id);
                                      },
                                    });
                                  }}
                                />
                              </Space>
                            ),
                          },
                        ]}
                        dataSource={reports} 
                        rowKey="_id"
                        loading={loading}
                        pagination={{ 
                          pageSize: 10,
                          showSizeChanger: true,
                          showTotal: (total) => `Total ${total} reports`,
                          showQuickJumper: true,
                        }}
                        className="custom-table"
                        rowClassName="hover:bg-gray-50 cursor-pointer"
                        onRow={(record) => ({
                          onClick: () => handleEdit(record)
                        })}
                        locale={{
                          emptyText: (
                            <Empty
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                              description={
                                <span className="text-gray-500">
                                  No reports found. Add your first report to get started!
                                </span>
                              }
                            />
                          )
                        }}
                      />
                    </div>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <span className="flex items-center gap-2 px-2">
                      <PlusOutlined />
                      Add New Report
                    </span>
                  ),
                  children: (
                    <div className="mt-4">
                      <div className="max-w-3xl mx-auto">
                        <Form
                          form={form}
                          layout="vertical"
                          onFinish={onFinish}
                          className="space-y-1"
                        >
                          <Form.Item
                            name="title"
                            label={<span className="font-semibold text-gray-700">Report Title</span>}
                            rules={[{ required: true, message: 'Please enter a title' }]}
                          >
                            <Input 
                              placeholder="e.g., Q2 2023 Market Report" 
                              size="large"
                              className="rounded-lg"
                              prefix={<FileTextOutlined className="text-gray-400" />}
                            />
                          </Form.Item>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item
                              name="city"
                              label={<span className="font-semibold text-gray-700">City</span>}
                              rules={[{ required: true, message: 'Please select a city' }]}
                            >
                              <Select 
                                placeholder="Select city" 
                                size="large"
                                className="rounded-lg"
                                suffixIcon={<EnvironmentOutlined />}
                                autoFocus={false}
                                onSelect={() => {
                                  // Close dropdown after selection
                                  setTimeout(() => {
                                    const dropdowns = document.querySelectorAll('.ant-select-dropdown');
                                    dropdowns.forEach(dropdown => {
                                      dropdown.style.display = 'none';
                                    });
                                  }, 100);
                                }}
                              >
                                {cities.map(city => (
                                  <Option key={city} value={city}>{city}</Option>
                                ))}
                              </Select>
                            </Form.Item>

                            <Form.Item
                              name="period"
                              label={<span className="font-semibold text-gray-700">Report Period</span>}
                              rules={[{ required: true, message: 'Please select a period' }]}
                            >
                              <Select 
                                placeholder="Select period" 
                                size="large"
                                suffixIcon={<CalendarOutlined />}
                                autoFocus={false}
                                onSelect={() => {
                                  // Close dropdown after selection
                                  setTimeout(() => {
                                    const dropdowns = document.querySelectorAll('.ant-select-dropdown');
                                    dropdowns.forEach(dropdown => {
                                      dropdown.style.display = 'none';
                                    });
                                  }, 100);
                                }}
                              >
                                {periodOptions.map(period => (
                                  <Option key={period.value} value={period.value}>
                                    {period.label}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>

                          <Form.Item
                            name="type"
                            label={<span className="font-semibold text-gray-700">Report Type</span>}
                            rules={[{ required: true, message: 'Please select a report type' }]}
                          >
                            <Select 
                              placeholder="Select report type" 
                              size="large"
                              autoFocus={false}
                              onSelect={() => {
                                // Close dropdown after selection
                                setTimeout(() => {
                                  const dropdowns = document.querySelectorAll('.ant-select-dropdown');
                                  dropdowns.forEach(dropdown => {
                                    dropdown.style.display = 'none';
                                  });
                                }, 100);
                              }}
                            >
                              <Option value="PDF">
                                <Space>
                                  <FilePdfOutlined className="text-red-500" />
                                  PDF Report
                                </Space>
                              </Option>
                              <Option value="Excel">
                                <Space>
                                  <FileExcelOutlined className="text-green-600" />
                                  Excel Spreadsheet
                                </Space>
                              </Option>
                              <Option value="Infographic">
                                <Space>
                                  <FileImageOutlined className="text-blue-500" />
                                  Infographic
                                </Space>
                              </Option>
                            </Select>
                          </Form.Item>

                          <Form.Item
                            name="description"
                            label={<span className="font-semibold text-gray-700">Description</span>}
                            rules={[{ required: true, message: 'Please enter a description' }]}
                          >
                            <TextArea 
                              rows={4} 
                              placeholder="Provide a detailed description of the market report..."
                              className="rounded-lg"
                            />
                          </Form.Item>

                          <Form.Item
                            name="file"
                            label={<span className="font-semibold text-gray-700">Report File</span>}
                            valuePropName="fileList"
                            getValueFromEvent={({ fileList }) => fileList}
                            rules={[{ required: true, message: 'Please upload a file' }]}
                          >
                            <Upload
                              name="file"
                              maxCount={1}
                              beforeUpload={(file) => {
                                // Check file extension
                                const fileExt = file.name.split('.').pop().toLowerCase();
                                const allowedExtensions = ['pdf', 'xls', 'xlsx', 'xlsm', 'csv', 'jpeg', 'jpg', 'png'];
                                
                                // More permissive MIME type check
                                const allowedTypes = [
                                  'application/pdf',
                                  'application/vnd.ms-excel',
                                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                  'application/msword',
                                  'application/vnd.ms-office',
                                  'application/octet-stream',
                                  'image/jpeg',
                                  'image/png',
                                  'image/jpg'
                                ];
                                
                                const isAllowed = allowedTypes.includes(file.type) || 
                                                allowedExtensions.includes(fileExt);
                                
                                if (!isAllowed) {
                                  message.error('You can only upload PDF, Excel, or Image files!');
                                  return Upload.LIST_IGNORE;
                                }
                                
                                // Check file size (50MB)
                                const isLt50M = file.size / 1024 / 1024 < 50;
                                if (!isLt50M) {
                                  message.error('File must be smaller than 50MB!');
                                  return Upload.LIST_IGNORE;
                                }
                                
                                console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size);
                                return false; // Don't upload, we'll handle it in onFinish
                              }}
                              className="upload-container"
                            >
                              <Button 
                                icon={<UploadOutlined />} 
                                size="large"
                                className="w-full rounded-lg border-dashed border-2 hover:border-indigo-500 hover:text-indigo-600"
                              >
                                Click to Upload (PDF, Excel, or Image)
                              </Button>
                            </Upload>
                          </Form.Item>

                          <Form.Item className="mb-0 pt-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button 
                                type="primary" 
                                htmlType="submit" 
                                loading={loading}
                                icon={editingReport ? <SaveOutlined /> : <PlusOutlined />}
                                size="large"
                                className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 rounded-lg shadow-lg h-12 px-8 font-semibold"
                              >
                                {editingReport ? 'Update Report' : 'Add Report'}
                              </Button>
                              {editingReport && (
                                <Button 
                                  onClick={handleCancelEdit}
                                  size="large"
                                  className="w-full md:w-auto"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(to right, #f9fafb, #f3f4f6);
          font-weight: 600;
          color: #374151;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: #f9fafb;
        }
        
        /* Fix for dropdown and bullet points */
        .ant-select-dropdown {
          z-index: 1100 !important;
          pointer-events: auto !important;
        }
        .ant-select-item {
          pointer-events: auto !important;
        }
        .ant-select-item-option {
          z-index: 1101 !important;
        }
        .ant-select-item-option-active {
          background-color: #f5f5f5 !important;
        }
        .ant-select-selector, .ant-select-selection-item {
          pointer-events: auto !important;
        }
        .ant-select-arrow {
          pointer-events: none !important;
        }
      `}</style>
    </div>
  );
};

export default MarketReportsAdmin;