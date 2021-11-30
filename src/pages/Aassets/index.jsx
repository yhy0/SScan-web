import { PlusOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Switch, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormCheckbox, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { assets, addAssets, updateRule, removeAssets } from './service';
import { request } from 'umi';
import token from '@/utils/token';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
    const hide = message.loading('正在添加');

    try {
        await addAssets({ ...fields });
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields, currentRow) => {
    const hide = message.loading('正在配置');

    try {
        await updateRule({ ...currentRow, ...fields });
        hide();
        message.success('配置成功');
        return true;
    } catch (error) {
        hide();
        message.error('配置失败请重试！');
        return false;
    }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
        await removeAssets({
            key: selectedRows.map((row) => row.uuid),
        });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList = () => {
    /** 新建窗口的弹窗 */
    const [createModalVisible, handleModalVisible] = useState(false);
    /** 分布更新窗口的弹窗 */

    const [updateModalVisible, handleUpdateModalVisible] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const actionRef = useRef();
    const [currentRow, setCurrentRow] = useState();
    const [selectedRowsState, setSelectedRows] = useState([]);
    /** 国际化配置 */

    const columns = [
        {
            title: '资产名称',
            dataIndex: 'name',
            render: (dom, entity) => {
                return (
                    <a
                        onClick={() => {
                            setCurrentRow(entity);
                            setShowDetail(true);
                        }}
                    >
                        {dom}
                    </a>
                );
            },
        },
        {
            title: '资产目标',
            dataIndex: 'target',
            valueType: 'textarea',
        },

        {
            title: '更新时间',
            sorter: true,
            dataIndex: 'UpdatedAt',
            valueType: 'dateTime',
            renderFormItem: (item, { defaultRender, ...rest }, form) => {
                const status = form.getFieldValue('status');

                if (`${status}` === '0') {
                    return false;
                }

                if (`${status}` === '3') {
                    return <Input {...rest} placeholder="请输入异常原因！" />;
                }

                return defaultRender(item);
            },
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            search: false,
            valueEnum: {
                0: {
                    text: '完成',
                    status: 'Default',
                },
                1: {
                    text: '扫描中',
                    status: 'Processing',
                },
                2: {
                    text: '异常',
                    status: 'Error',
                },
            },
        },
        {
            title: 'uuid',
            dataIndex: 'uuid',
            valueType: 'text',
            hideInTable: true,
            search: false,
        },
        {
            title: '操作',
            tip: '循环扫描会根据操作进行对应的扫描',
            dataIndex: 'actions',
            valueType: 'textarea',
            search: false,
        },
        {
            title: '循环扫描',
            tip: '开启或关闭循环扫描会在下次循环中生效',
            dataIndex: 'loopscan',
            search: false,
            render: (_, record) => {
                return (< Switch
                    checkedChildren={< CheckOutlined />} unCheckedChildren={< CloseOutlined />}
                    onChange={(e) => {
                        Modal.confirm({
                            title: "确认修改状态信息？",
                            //自定义按钮内容
                            okText: "确认",
                            cancelText: "取消",
                            onOk() {
                                let values;
                                //根据开关状态初始化，传入后台的值
                                if (e) {
                                    values = { target: record.target, loopscan: 1 };
                                    record.loopscan = 1;
                                } else {
                                    values = { target: record.target, loopscan: 0 };
                                    record.loopscan = 0;
                                }
                                //调用后台方法修改用户状态
                                request("/api/updateLoopScan", {
                                    method: 'GET',
                                    headers: {
                                        Authorization: 'JWT ' + token.get(),
                                    },
                                    params: { ...values },
                                });
                                location.reload();
                            },
                            onCancel() { },
                        });
                    }
                    }
                    checked={record.loopscan}
                />)
            },
        },

    ];
    return (
        <PageContainer>
            <ProTable
                headerTitle=""
                actionRef={actionRef}
                rowKey="uuid"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button
                        type="primary"
                        key="primary"
                        shape="round"
                        onClick={() => {
                            handleModalVisible(true);
                        }}
                    >
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
                request={assets}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项 &nbsp;&nbsp;
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                    <Button type="primary">批量配置</Button>
                </FooterToolbar>
            )}
            <ModalForm
                title="新建资产"
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleAdd(value);

                    if (success) {
                        handleModalVisible(false);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormText
                    rules={[
                        {
                            required: true,
                            message: '资产名称为必填项',
                        },
                    ]}
                    label="资产名称"
                    width="md"
                    name="name"
                />
                <ProFormTextArea
                    rules={[
                        {
                            required: true,
                            message: '资产为必填项',
                        },
                    ]}
                    label="资产"
                    width="md"
                    name="target"
                />

                <ProFormCheckbox.Group
                    name="action"
                    layout="horizontal"
                    options={[
                        {
                            label: '子域名扫描',
                            value: 'subdomain',
                        },
                        {
                            label: '漏洞扫描',
                            value: 'vulscan',
                        },
                        {
                            label: '循环扫描',
                            value: 'loopscan',
                        },
                    ]}
                />
            </ModalForm>

            <UpdateForm
                onSubmit={async (value) => {
                    const success = await handleUpdate(value, currentRow);

                    if (success) {
                        handleUpdateModalVisible(false);
                        setCurrentRow(undefined);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
                onCancel={() => {
                    handleUpdateModalVisible(false);
                    setCurrentRow(undefined);
                }}
                updateModalVisible={updateModalVisible}
                values={currentRow || {}}
            />

            <Drawer
                width={600}
                visible={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns}
                    />
                )}
            </Drawer>
        </PageContainer>
    );
};

export default TableList;
