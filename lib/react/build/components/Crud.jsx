import React, { useMemo, useState, useRef } from 'react';
import { message, Modal } from 'antd';
import Table from './Table';
import ToolBar from './ToolBar';
import Form from './Form';
import { ICrudToolbarTypeEnum, } from './CrudTypes';
import { BatchButtonGroup } from './ToolBar/BatchOperation';
import FCrudModal from './Container/Modal';
const titleMapping = {
    [ICrudToolbarTypeEnum.Add]: '添加',
    [ICrudToolbarTypeEnum.Edit]: '编辑',
};
const FCrud = (props) => {
    const { columns, title, tableProps, batchToolbar, rowToolbar, request } = props;
    const [filter, setFilter] = useState(null);
    const [selection, setSelection] = useState({
        selectedRows: [],
        selectedRowKeys: [],
    });
    const [modalProps, setModalProps] = useState({
        visible: false,
        title: '',
    });
    const [form, setForm] = useState(null);
    const ref = useRef();
    // crud 区
    const handleCloseModal = () => {
        ref.current.reloadAndRest();
        setForm(null);
        setModalProps({ visible: false });
    };
    const handleOpenModal = (data = null, action, onOk = null) => {
        setForm(data);
        setModalProps({
            visible: true,
            title: `${title}${titleMapping[action]}`,
            onOk,
        });
    };
    // 内置函数定义
    const parseToolbarActions = (toolbars, row, isBatch = false) => {
        toolbars?.forEach(it => {
            let tempEvt;
            switch (it.toolbarType) {
                case ICrudToolbarTypeEnum.Add:
                    tempEvt = () => handleOpenModal(null, it.toolbarType, data => it.request &&
                        it.request(data).then(() => {
                            handleCloseModal();
                            setFilter({ ...filter });
                        }));
                    Object.assign(it, { onClick: tempEvt });
                    break;
                case ICrudToolbarTypeEnum.Edit:
                    tempEvt = () => handleOpenModal(row, it.toolbarType, data => it.request &&
                        it.request(data).then(() => {
                            handleCloseModal();
                            setFilter({ ...filter });
                        }));
                    Object.assign(it, { onClick: tempEvt });
                    break;
                case ICrudToolbarTypeEnum.Delete:
                    tempEvt = () => {
                        if ((!isBatch && !row) || (isBatch && !row?.length)) {
                            message.destroy();
                            message.warning('请先选择需要删除的数据');
                            return;
                        }
                        Modal.confirm({
                            title: `删除${title}`,
                            content: '是否确认删除该条数据',
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => it.request && it.request(row).then(handleCloseModal),
                        });
                    };
                    Object.assign(it, { onClick: tempEvt });
                    break;
                case ICrudToolbarTypeEnum.DeleteBatch:
                    tempEvt = () => {
                        if (!row?.length) {
                            message.destroy();
                            message.warning('请先选择需要删除的数据');
                            return;
                        }
                        Modal.confirm({
                            title: `删除${title}`,
                            content: `是否确认删除${row?.length}条数据`,
                            okText: '确定',
                            cancelText: '取消',
                            onOk: () => it.request && it.request(row).then(handleCloseModal),
                        });
                    };
                    Object.assign(it, { onClick: tempEvt });
                    break;
                default:
                    break;
            }
        });
        return toolbars;
    };
    // 筛选区操作
    const handleSearchFilter = (params) => setFilter(params);
    const handleResetFilter = () => setFilter(null);
    // 格式化筛选表单字段属性
    const [filterColumns, formColumns] = useMemo(() => {
        const filterCols = [];
        const formCols = [];
        columns.forEach(it => {
            const temp = { ...it };
            it.render && delete temp.render;
            delete temp.isHide;
            delete temp.isFilter;
            !it.readonly && formCols.push({ ...temp });
            if (it.isFilter) {
                delete temp.rules;
                filterCols.push(temp);
            }
        });
        return [filterCols, formCols];
    }, [columns]);
    // 表格自动处理
    const tableColumns = useMemo(() => {
        const buffer = [];
        columns.forEach(it => {
            const temp = { ...it };
            !temp.isHide && buffer.push(temp);
        });
        if (rowToolbar) {
            buffer.push({
                title: '操作',
                width: 200,
                dataIndex: 'operation',
                render: (text, row, index) => {
                    return (<BatchButtonGroup options={parseToolbarActions(rowToolbar, row, false)} args={{ row, rowKey: index }}/>);
                },
            });
        }
        return buffer;
    }, [columns, rowToolbar, filter]);
    return (<div className="f-crud">
      <ToolBar selectedRows={selection.selectedRows} selectedRowKeys={selection.selectedRowKeys} batchOptions={parseToolbarActions(batchToolbar, selection.selectedRows, true)} searchOptions={{
            columns: filterColumns,
            onSearch: handleSearchFilter,
            onReset: handleResetFilter,
        }}/>
      <Table rowSelection={{
            columnWidth: 60,
            type: 'checkbox',
            onChange: (selectedRowKeys, selectedRows) => setSelection({ selectedRows, selectedRowKeys }),
        }} {...tableProps} request={request} columns={tableColumns} actionRef={ref} params={filter}/>

      <FCrudModal {...modalProps} data={form} columns={formColumns} onCancel={handleCloseModal}/>
    </div>);
};
FCrud.Table = Table;
FCrud.ToolBar = ToolBar;
FCrud.Form = Form;
export default FCrud;
