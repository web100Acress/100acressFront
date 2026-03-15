import React, { useMemo } from 'react';
// Optimized Ant Design imports to reduce bundle size
// Using default imports for compatibility

// Import all components as defaults
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import message from 'antd/es/message';
import Skeleton from 'antd/es/skeleton';
import Card from 'antd/es/card';
import Avatar from 'antd/es/avatar';
import Select from 'antd/es/select';
import Badge from 'antd/es/badge';
import Empty from 'antd/es/empty';
import Switch from 'antd/es/switch';
import Tooltip from 'antd/es/tooltip';
import Divider from 'antd/es/divider';
import Dropdown from 'antd/es/dropdown';
import Alert from 'antd/es/alert';
import Collapse from 'antd/es/collapse';
import ConfigProvider from 'antd/es/config-provider';
import notification from 'antd/es/notification';
import Input from 'antd/es/input';

// Re-export all components
export {
  Button,
  Modal,
  message,
  Skeleton,
  Card,
  Avatar,
  Select,
  Badge,
  Empty,
  Switch,
  Tooltip,
  Divider,
  Dropdown,
  Alert,
  Collapse,
  ConfigProvider,
  notification,
  Input
};

// For less common components, use dynamic imports
export const lazyAntdImport = (componentName) => {
  return lazy(() => import(`antd/es/${componentName}`));
};

// Example usage:
// const Table = lazyAntdImport('table');
// const Form = lazyAntdImport('form');
