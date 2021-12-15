import { Button, message, Input, Drawer, Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { rule, updateRule, removeRule, Export, getAssets } from './service';
import { DownloadOutlined } from '@ant-design/icons';

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
        await removeRule({
            key: selectedRows.map((row) => row.id),
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

/**
 * 导出
 *
 * @param selectedRows
 */

const handleExport = async (name) => {
    const hide = message.loading('正在导出');
    if (!name) return true;
    try {

        await Export(name);
        hide();
        message.success('导出成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('导出失败，请重试');
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
            title: 'id',
            dataIndex: 'id',
            valueType: 'textarea',
            hideInTable: true,      // 隐藏此列
        },
        {
            title: '资产',
            dataIndex: 'assets',
            tip: '资产名称是唯一的 key',
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
            title: 'target',
            dataIndex: 'matched_at',
            valueType: 'textarea',
            wordWrap: "break-word",
            copyable: true,
        },
        {
            title: 'TemplateId',
            dataIndex: 'template_id',
            valueType: 'textarea',
            ellipsis: true,
            copyable: true,
        },
        {
            title: 'info',
            dataIndex: 'info',
            valueType: 'textarea',
            ellipsis: true,
            copyable: true,
        },
        {
            title: 'severity',
            dataIndex: 'severity',
            valueType: 'textarea',
            render: (text, record) => {
                switch (record.severity) {
                    case "info":
                        return <Tag color="green"> {record.severity}</Tag>;
                    case "low":
                        return <Tag color="blue"> {record.severity}</Tag>;
                    case "medium":
                        return <Tag color="purple"> {record.severity}</Tag>;
                    case "critical":
                        return <Tag color="volcano"> {record.severity}</Tag>;
                    case "high":
                        return <Tag color="red"> {record.severity}</Tag>;
                }
            }
        },
        {
            title: 'type',
            dataIndex: 'type',
            valueType: 'textarea',
        },
        // {
        //     title: 'request',
        //     dataIndex: 'request',
        //     valueType: 'textarea',
        //     ellipsis: true,
        //     copyable: true,
        // },

        // {
        //     title: 'response',
        //     dataIndex: 'response',
        //     valueType: 'textarea',
        //     ellipsis: true,
        //     copyable: true,
        // },

        {
            title: 'ip',
            dataIndex: 'ip',
            valueType: 'textarea',
            copyable: true,
        },

        // {
        //     title: 'CurlCommand',
        //     dataIndex: 'curl_command',
        //     valueType: 'textarea',
        //     ellipsis: true,
        //     copyable: true,
        // },
    ];
    return (
        <PageContainer>
            <ProTable
                // scroll={{ x: 'max-content' }}
                headerTitle=""
                actionRef={actionRef}
                rowKey="id"
                search={{
                    labelWidth: 120,
                }}
                toolBarRender={() => [
                    <Button type="primary" shape="round"
                        onClick={() => {
                            handleModalVisible(true);
                        }}
                        icon={<DownloadOutlined />}> 导出</Button>

                ]}
                request={rule}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {
                selectedRowsState?.length > 0 && (
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
                        {/* <Button type="primary">批量审批</Button> */}
                    </FooterToolbar>
                )
            }
            <ModalForm
                title="导出"
                width="400px"
                visible={createModalVisible}
                onVisibleChange={handleModalVisible}
                onFinish={async (value) => {
                    const success = await handleExport(value);

                    if (success) {
                        handleModalVisible(false);

                        if (actionRef.current) {
                            actionRef.current.reload();
                        }
                    }
                }}
            >
                <ProFormSelect
                    label="导出资产"
                    name="key"
                    request={async () => {//返回的select网络请求
                        let params = await getAssets();
                        let res = [];
                        params.data.forEach((v, i) => {
                            let temp = {};
                            temp['label'] = v;
                            temp['value'] = v;
                            res.push(temp)
                        });
                        return res
                    }
                    }
                    placeholder="请选择资产"

                    rules={[{ required: true, message: '请选择资产' }]}
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
        </PageContainer >
    );
};

export default TableList;
