import React from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  StepsForm,
  ProFormRadio,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';

const UpdateForm = (props) => {
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{
              padding: '32px 40px 48px',
            }}
            destroyOnClose
            title="资产配置"
            visible={props.updateModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          target: props.values.target,
        }}
        title="基本信息"
      >
        <ProFormText
          name="name"
          label="资产名称"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入资产名称！',
            },
          ]}
        />
        <ProFormTextArea
          name="target"
          width="md"
          label="资产"
          placeholder="多个目标，换行"
          rules={[
            {
              required: true,
              message: '多个目标，换行',
              min: 5,
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title="配置资产属性"
      >
        <ProFormSelect
          name="target"
          width="md"
          label="监控对象"
          valueEnum={{
            0: '表一',
            1: '表二',
          }}
        />
        <ProFormSelect
          name="template"
          width="md"
          label="资产模板"
          valueEnum={{
            0: '资产模板一',
            1: '资产模板二',
          }}
        />
        <ProFormRadio.Group
          name="type"
          label="资产类型"
          options={[
            {
              value: '0',
              label: '强',
            },
            {
              value: '1',
              label: '弱',
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          type: '1',
          frequency: 'month',
        }}
        title="设定调度周期"
      >
        <ProFormDateTimePicker
          name="time"
          width="md"
          label="开始时间"
          rules={[
            {
              required: true,
              message: '请选择开始时间！',
            },
          ]}
        />
        <ProFormSelect
          name="frequency"
          label="监控对象"
          width="md"
          valueEnum={{
            month: '月',
            week: '周',
          }}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;
