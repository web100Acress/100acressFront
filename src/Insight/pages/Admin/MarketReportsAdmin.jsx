import React, { useState, useEffect } from 'react';
import { Upload, Button, Table, Form, Input, Select, Tabs, Card, message, Badge, Tag, Space, Tooltip, Empty, ConfigProvider } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined, FileTextOutlined, BarChartOutlined, CalendarOutlined, EnvironmentOutlined, FileExcelOutlined, FilePdfOutlined, FileImageOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { Link } from 'react-router-dom';
import AdminInsightsSidebar from '../../components/AdminInsightsSidebar';
import api from '../../../config/apiClient';

const { Option } = Select;
const { TextArea } = Input;

const MarketReportsAdmin = () => {
  const [form] = Form.useForm();
  const [reports, setReports] = useState([]);
  const { token } = theme.useToken();

  // Custom theme configuration for Select components
  const selectTheme = {
    components: {
      Select: {
        zIndexPopup: 1100,
        borderRadius: 8,
        controlItemBgHover: token.controlItemBgHover,
        optionSelectedBg: token.controlItemBgActive,
        optionActiveBg: token.controlItemBgActive,
      },
    },
  };
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchReports();
    fetchCities();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("myToken")?.replace(/^"/, '').replace(/"$/, '').replace(/^Bearer\s+/i, '') || '';
      const response = await api.get('/market-reports', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
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

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const formData = new FormData();
      
      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      await api.post('/api/market-reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      message.success('Market report added successfully');
      form.resetFields();
      fetchReports();
      setActiveTab('1');
    } catch (error) {
      console.error('Error adding report:', error);
      message.error('Failed to add market report');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/market-reports/${id}`);
      message.success('Report deleted successfully');
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
      message.error('Failed to delete report');
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-2xl shadow-lg`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Tabs */}
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
                        columns={columns} 
                        dataSource={reports} 
                        rowKey="_id"
                        loading={loading}
                        pagination={{ 
                          pageSize: 10,
                          showSizeChanger: true,
                          showTotal: (total) => `Total ${total} reports`
                        }}
                        className="custom-table"
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
                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border border-indigo-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Market Report</h3>
                          <p className="text-gray-600">Fill in the details below to add a new market report to your collection.</p>
                        </div>

                        <ConfigProvider theme={selectTheme}>
                        <Form
                          form={form}
                          layout="vertical"
                          onFinish={onFinish}
                          className="space-y-4"
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
                                className="w-full rounded-lg"
                                suffixIcon={<EnvironmentOutlined />}
                                classNames={{
                                  popup: 'select-dropdown'
                                }}
                                getPopupContainer={trigger => trigger.parentNode}
                              >
                                {cities.map(city => (
                                  <Option key={city} value={city} className="select-option">
                                    <span className="block py-1">{city}</span>
                                  </Option>
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
                                className="w-full rounded-lg"
                                suffixIcon={<CalendarOutlined />}
                                classNames={{
                                  popup: 'select-dropdown',
                                  option: 'select-option'
                                }}
                                getPopupContainer={trigger => trigger.parentNode}
                              >
                                {['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023', 'Annual 2023'].map(period => (
                                  <Option key={period} value={period} className="select-option">
                                    <span className="block py-1">{period}</span>
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
                              className="w-full"
                              classNames={{
                                popup: 'select-dropdown'
                              }}
                              getPopupContainer={trigger => trigger.parentNode}
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
                            getValueFromEvent={(e) => {
                              if (Array.isArray(e)) {
                                return e;
                              }
                              return e && e.fileList;
                            }}
                            rules={[{ 
                              required: true, 
                              message: 'Please upload a file',
                              validator: (_, value) => {
                                if (value && value[0]?.originFileObj) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Please upload a file');
                              }
                            }]}
                          >
                            <Upload.Dragger
                              name="file"
                              multiple={false}
                              beforeUpload={(file) => {
                                // Check file type
                                const isAllowedType = [
                                  'application/pdf',
                                  'application/vnd.ms-excel',
                                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                  'image/jpeg',
                                  'image/png'
                                ].includes(file.type);
                                
                                if (!isAllowedType) {
                                  message.error('You can only upload PDF, Excel, or Image files!');
                                  return Upload.LIST_IGNORE;
                                }
                                
                                const isLt10M = file.size / 1024 / 1024 < 10;
                                if (!isLt10M) {
                                  message.error('File must be smaller than 10MB!');
                                  return Upload.LIST_IGNORE;
                                }
                                
                                return false; // Prevent auto upload
                              }}
                              fileList={form.getFieldValue('file')}
                              onChange={({ fileList }) => {
                                form.setFieldsValue({ file: fileList });
                              }}
                              className="upload-container"
                            >
                              <p className="ant-upload-drag-icon">
                                <UploadOutlined className="text-3xl text-indigo-500" />
                              </p>
                              <p className="ant-upload-text font-medium text-gray-700">
                                Click or drag file to this area to upload
                              </p>
                              <p className="ant-upload-hint text-gray-500 text-sm">
                                Support for PDF, Excel, or Image files (max 10MB)
                              </p>
                            </Upload.Dragger>
                          </Form.Item>

                          <Form.Item className="mb-0 pt-4">
                            <Button 
                              type="primary" 
                              htmlType="submit" 
                              loading={loading}
                              icon={<PlusOutlined />}
                              size="large"
                              className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 rounded-lg shadow-lg h-12 px-8 font-semibold"
                            >
                              Add Report
                            </Button>
                          </Form.Item>
                        </Form>
                        </ConfigProvider>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>

      <style jsx>{`
        .custom-table .ant-table-thead > tr > th {
          background: linear-gradient(to right, #f9fafb, #f3f4f6);
          font-weight: 600;
          color: #374151;
        }
        .custom-table .ant-table-tbody > tr:hover > td {
          background: #f9fafb;
        }
        .select-dropdown {
          z-index: 1100 !important;
          border-radius: 8px;
          box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        
        .select-dropdown .ant-select-item {
          padding: 8px 16px;
          transition: background-color 0.2s ease;
        }
        
        .select-dropdown .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
          background-color: #f3f4f6;
        }
        
        .select-dropdown .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
          background-color: #eef2ff;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default MarketReportsAdmin;