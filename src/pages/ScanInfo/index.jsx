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
            title: 'url',
            dataIndex: 'url',
            valueType: 'textarea',
            wordWrap: "break-word",
            copyable: true,
        },
        {
            title: '标题',
            dataIndex: 'title',
            valueType: 'textarea',
            ellipsis: true,
        },
        {
            title: 'ip',
            dataIndex: 'ip',
            valueType: 'textarea',
            render: (text, record) => {
                let snArray = [];

                snArray = record.ip.split(" ");      // 空格分开换行显示

                let br = <br></br>;
                let result = null;
                if (snArray.length < 2) {
                    return text;
                }

                for (let i = 0; i < snArray.length; i = i + 2) {
                    if (i == 0) {
                        result = snArray[i] + " " + snArray[i + 1];
                    } else {
                        result = <span>{result}{br}{snArray[i]} {snArray[i + 1]}</span>;
                    }
                }
                return <div>{result}</div>;
            },
        },
        {
            title: '端口',
            dataIndex: 'port',
            valueType: 'textarea',
        },
        {
            title: '服务',
            dataIndex: 'service',
            valueType: 'textarea',
        },
        {
            title: 'FUZZ',
            dataIndex: 'fileFuzz',
            valueType: 'textarea',
            copyable: true,
            render: (text, record) => {
                let snArray = [];
                text = record.fileFuzz.toString();
                snArray = text.split(" ");      // 空格分开换行显示

                let br = <br></br>;
                let result = null;
                if (snArray.length < 2) {
                    return text;
                }

                for (let i = 0; i < snArray.length; i = i + 1) {
                    if (i == 0) {
                        result = snArray[i];
                    } else {
                        result = <span>{result}{br}{snArray[i]} </span>;
                    }
                }
                return <div>{result}</div>;
            },
        },

        {
            title: 'poc',
            dataIndex: 'pocTechnologies',
            valueType: 'textarea',
            copyable: true,
            render: (text, record) => {
                let snArray = [];
                snArray = record.pocTechnologies.split(" ,");      // 空格分开换行显示

                let br = <br></br>;
                let result = null;
                if (snArray.length < 2) {
                    return text;
                }

                for (let i = 0; i < snArray.length; i = i + 2) {
                    if (i == 0) {
                        result = snArray[i] + " " + snArray[i + 1];
                    } else {
                        result = <span>{result}{br}{snArray[i]} {snArray[i + 1]}</span>;
                    }
                }
                return <div>{result}</div>;
            },
        },
        {
            title: '指纹',
            dataIndex: 'fingerprint',
            render: (text, record) => {
                let snArray = [];
                snArray = record.fingerprint.split(" ,");      // 空格分开换行显示

                let br = <br></br>;
                let result = null;
                let a = new Array();
                if (snArray.length > 0 && snArray.length < 2) {
                    return <Tag color="blue"> {record.fingerprint}</Tag>;
                }

                for (let i = 0; i < snArray.length; i = i + 1) {
                    a[i] = <Tag color="blue"> {snArray[i]} </Tag>;
                }

                for (let i = 0; i < a.length; i = i + 2) {
                    if (i == 0) {
                        result = <span> {a[0]} {a[1]} </span >;
                    } else {
                        result = <span> {result} {br} {a[i]} {a[i + 1]}</span >;
                    }

                }

                return <div>{result}</div>;
            },
        },

        {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            search: false,
            valueEnum: {
                0: {
                    text: '关闭',
                    status: 'Default',
                },
                1: {
                    text: '运行中',
                    status: 'Processing',
                },
                2: {
                    text: '异常',
                    status: 'Error',
                },
            },
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

                if (`${status}` === '2') {
                    return <Input {...rest} placeholder="请输入异常原因！" />;
                }

                return defaultRender(item);
            },
        },
    ];
    return (
        <PageContainer>
            <ProTable
                scroll={{ x: 'max-content' }}
                headerTitle="查询表格"
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
                        <Button type="primary">批量审批</Button>
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
