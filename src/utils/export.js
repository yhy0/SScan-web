// npm 安装这两个库
import { File } from 'better-xlsx';
import { saveAs } from 'file-saver';

// 直接导入函数 传入Table数据 column dataSource
// fileName 下载的文件名
function ExportExcel(column, dataSource, fileName = 'example') {
    // 新建工作谱
    const file = new File();
    // 新建表
    let sheet = file.addSheet('sheet-test');
    // 获取表头行数
    let depth = getDepth(column);
    // 获取表头的列数
    let columnNum = getColumns(column);
    // 新建表头行数
    let rowArr = [];
    for (let k = 0; k < depth; k++) {
        rowArr.push(sheet.addRow());
    }
    // 根据列数填充单元格
    rowArr.map(ele => {
        for (let j = 0; j < columnNum; j++) {
            let cell = ele.addCell();
            cell.value = j;
        }
    });
    // 初始化表头
    init(column, 0, 0);
    // 按顺序展平column
    let columnLineArr = [];
    columnLine(column);
    // 根据column,将dataSource里面的数据排序，并且转化为二维数组
    let dataSourceArr = [];
    dataSource.map(ele => {
        let dataTemp = [];
        columnLineArr.map(item => {
            dataTemp.push({
                [item.dataIndex]: ele[item.dataIndex],
                value: ele[item.dataIndex],
            });
        });
        dataSourceArr.push(dataTemp);
    });
    // debugger;
    // 绘画表格数据
    dataSourceArr.forEach((item, index) => {
        //根据数据,创建对应个数的行
        let row = sheet.addRow();
        row.setHeightCM(0.8);
        //创建对应个数的单元格
        item.map(ele => {
            let cell = row.addCell();
            if (ele.hasOwnProperty('num')) {
                cell.value = index + 1;
            } else {
                cell.value = ele.value;
            }
            cell.style.align.v = 'center';
            cell.style.align.h = 'center';
        });
    });
    //设置每列的宽度
    for (var i = 0; i < 4; i++) {
        sheet.col(i).width = 20;
    }
    file.saveAs('blob').then(function (content) {
        saveAs(content, fileName + '.xlsx');
    });

    // 按顺序展平column
    function columnLine(column) {
        column.map(ele => {
            if (ele.children === undefined || ele.children.length === 0) {
                columnLineArr.push(ele);
            } else {
                columnLine(ele.children);
            }
        });
    }
    // 初始化表头
    function init(column, rowIndex, columnIndex) {
        column.map((item, index) => {
            let hCell = sheet.cell(rowIndex, columnIndex);
            // 如果没有子元素, 撑满列
            if (item.title === '操作') {
                hCell.value = '';
                return;
            } else if (item.children === undefined || item.children.length === 0) {
                // 第一行加一个单元格
                hCell.value = item.title;
                hCell.vMerge = depth - rowIndex - 1;
                hCell.style.align.h = 'center';
                hCell.style.align.v = 'center';
                columnIndex++;
                // rowIndex++
            } else {
                let childrenNum = 0;
                function getColumns(arr) {
                    arr.map(ele => {
                        if (ele.children) {
                            getColumns(ele.children);
                        } else {
                            childrenNum++;
                        }
                    });
                }
                getColumns(item.children);
                hCell.hMerge = childrenNum - 1;
                hCell.value = item.title;
                hCell.style.align.h = 'center';
                hCell.style.align.v = 'center';
                let rowCopy = rowIndex;
                rowCopy++;
                init(item.children, rowCopy, columnIndex);
                // 下次单元格起点
                columnIndex = columnIndex + childrenNum;
            }
        });
    }
    // 获取表头rows
    function getDepth(arr) {
        const eleDepths = [];
        arr.forEach(ele => {
            let depth = 0;
            if (Array.isArray(ele.children)) {
                depth = getDepth(ele.children);
            }
            eleDepths.push(depth);
        });
        return 1 + max(eleDepths);
    }

    function max(arr) {
        return arr.reduce((accu, curr) => {
            if (curr > accu) return curr;
            return accu;
        });
    }
    // 计算表头列数
    function getColumns(arr) {
        let columnNum = 0;
        arr.map(ele => {
            if (ele.children) {
                getColumns(ele.children);
            } else {
                columnNum++;
            }
        });
        return columnNum;
    }
}

export default ExportExcel;
