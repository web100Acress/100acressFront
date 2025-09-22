// Centralized Ant Design imports for tree-shaking optimization
// This file helps reduce bundle size by importing only the components we actually use

// Core Ant Design components
export { message } from 'antd';
export { default as Modal } from 'antd/es/modal';
export { default as Switch } from 'antd/es/switch';
export { default as Badge } from 'antd/es/badge';
export { default as Progress } from 'antd/es/progress';
export { default as Card } from 'antd/es/card';
export { default as Row } from 'antd/es/row';
export { default as Col } from 'antd/es/col';
export { default as Statistic } from 'antd/es/statistic';
export { default as Skeleton } from 'antd/es/skeleton';
export { default as Steps } from 'antd/es/steps';
export { default as Spin } from 'antd/es/spin';
export { default as Button } from 'antd/es/button';
export { default as Input } from 'antd/es/input';
export { default as Alert } from 'antd/es/alert';
export { default as Tooltip } from 'antd/es/tooltip';
export { default as Empty } from 'antd/es/empty';
export { default as notification } from 'antd/es/notification';
export { default as Collapse } from 'antd/es/collapse';

// Re-export commonly used components with shorter names
export { message as toast } from 'antd';
export { Modal as ModalComponent } from 'antd';
export { Button as AntButton } from 'antd';
export { Input as AntInput } from 'antd';
