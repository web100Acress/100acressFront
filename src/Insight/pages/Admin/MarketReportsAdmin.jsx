import React, { useState, useEffect } from 'react';
import { Upload, Button, Table, Form, Input, Select, DatePicker, message, Card, Tabs } from 'antd';
import { UploadOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';
import api from '../../../config/apiClient';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const MarketReportsAdmin = () => {
  const [form] = Form.useForm();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [cities, setCities] = useState([]);

  // Fetch existing reports and cities on component mount
  useEffect(() => {
    fetchReports();
    fetchCities();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/market-reports');
      setReports(response.data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
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
      
      // Append all form fields to formData
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button 
            type="link" 
            icon={<DownloadOutlined />} 
            onClick={() => window.open(record.fileUrl, '_blank')}
          >
            Download
          </Button>
          <Button 
            danger 
            type="text" 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Market Reports Management</h1>
      
      <Tabs defaultActiveKey="1" onChange={setActiveTab}>
        <TabPane tab="View Reports" key="1">
          <Card>
            <Table 
              columns={columns} 
              dataSource={reports} 
              rowKey="_id"
              loading={loading}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
        
        <TabPane tab="Add New Report" key="2">
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="max-w-2xl"
            >
              <Form.Item
                name="title"
                label="Report Title"
                rules={[{ required: true, message: 'Please enter a title' }]}
              >
                <Input placeholder="Q2 2023 Market Report" />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="city"
                  label="City"
                  rules={[{ required: true, message: 'Please select a city' }]}
                >
                  <Select placeholder="Select city">
                    {cities.map(city => (
                      <Option key={city} value={city}>{city}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="period"
                  label="Report Period"
                  rules={[{ required: true, message: 'Please select a period' }]}
                >
                  <Select placeholder="Select period">
                    <Option value="Q1 2023">Q1 2023</Option>
                    <Option value="Q2 2023">Q2 2023</Option>
                    <Option value="Q3 2023">Q3 2023</Option>
                    <Option value="Q4 2023">Q4 2023</Option>
                    <Option value="Annual 2023">Annual 2023</Option>
                  </Select>
                </Form.Item>
              </div>

              <Form.Item
                name="type"
                label="Report Type"
                rules={[{ required: true, message: 'Please select a report type' }]}
              >
                <Select placeholder="Select report type">
                  <Option value="PDF">PDF Report</Option>
                  <Option value="Excel">Excel Spreadsheet</Option>
                  <Option value="Infographic">Infographic</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please enter a description' }]}
              >
                <TextArea rows={4} placeholder="Enter report description..." />
              </Form.Item>

              <Form.Item
                name="file"
                label="Report File"
                valuePropName="fileList"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: 'Please upload a file' }]}
              >
                <Upload
                  name="file"
                  maxCount={1}
                  beforeUpload={() => false} // Prevent auto upload
                >
                  <Button icon={<UploadOutlined />}>Select File (PDF, Excel, Image)</Button>
                </Upload>
              </Form.Item>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  icon={<PlusOutlined />}
                >
                  Add Report
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MarketReportsAdmin;
