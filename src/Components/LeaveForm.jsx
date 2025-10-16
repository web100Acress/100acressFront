import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import { getApiBase } from '../config/apiBase';

const { TextArea } = Input;
const { Option } = Select;

const LeaveForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('myToken') || localStorage.getItem('token');
      if (!token) {
        message.error('You are not logged in');
        return;
      }

      const payload = {
        leaveType: values.leaveType,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
        reason: values.reason,
      };

      const response = await axios.post(`${getApiBase()}/hr/leave/apply`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        message.success('Leave request submitted successfully');
        form.resetFields();
      }
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to submit leave request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          leaveType: 'casual',
        }}
      >
        <Form.Item
          name="leaveType"
          label="Leave Type"
          rules={[{ required: true, message: 'Please select leave type' }]}
        >
          <Select placeholder="Select leave type">
            <Option value="casual">Casual Leave</Option>
            <Option value="sick">Sick Leave</Option>
            <Option value="annual">Annual Leave</Option>
            <Option value="maternity">Maternity Leave</Option>
            <Option value="paternity">Paternity Leave</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[{ required: true, message: 'Please select start date' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[{ required: true, message: 'Please select end date' }]}
        >
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item
          name="reason"
          label="Reason"
          rules={[{ required: true, message: 'Please provide a reason' }]}
        >
          <TextArea rows={4} placeholder="Please provide a reason for your leave request" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="w-full">
            Submit Leave Request
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LeaveForm;
