import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import windowsData from '../globalData'

import TablePagination from '@material-ui/core/TablePagination';

const inventorySearch = () => {
    // 弹窗
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            // color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };

    function createData(customerCode,terminalCode,supplierCode,turnoverBoxCode,inventoryType,inventoryNumber,turnoverBoxNmae,createTime,operation) {
        return { customerCode,terminalCode,supplierCode,turnoverBoxCode,inventoryType,inventoryNumber,turnoverBoxNmae,createTime,operation };
    }
    function operationStateSet(flag) {
        if (flag) {
            return <Button variant="outlined" color="primary">调整客户库存</Button>
        } else {
            return ''
        }
    }

    const onSubmit = () => {

    }

    const rows = [
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
        createData('CU_JS_00001', 'EU_CQ_00001', '', 'TD12', '正常库存', '8', '', '2021-12-07 09:08:48', true),
    ];

    const useStyles = makeStyles((theme) => ({
        margin: {
            margin: theme.spacing(1),
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }));

    // 选项卡
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // 按钮组件
    const classes = useStyles();
    // 弹窗
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // 表格
    const columns = [
        ,,,,,,,,
        { id: 'customerCode', label: '客户代码', minWidth: 100 },
        { id: 'terminalCode', label: '终端代码', minWidth: 100 },
        { id: 'supplierCode', label: '供应商代码', minWidth: 100 },
        { id: 'turnoverBoxCode', label: '周转箱代码', minWidth: 100 },
        { id: 'inventoryType', label: '库存类型', minWidth: 50 },
        { id: 'inventoryNumber', label: '数量', minWidth: 50 },
        { id: 'turnoverBoxNmae', label: '周转箱名称', minWidth: 50 },
        { id: 'createTime', label: '创建时间', minWidth: 100 },
        { id: 'operation', label: '操作', minWidth: 50 },
    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(6);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div style={{
            width: `calc(100% - ${windowsData.drawerWidth}px)`,
            height: 'calc(100% - 64px)',
            marginLeft: ` ${windowsData.drawerWidth}px`,
            marginTop: '64px'
        }}>
            <br></br>
            <div component={Paper}>
                <Paper square>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example">
                        <Tab label="库存查询" />
                    </Tabs>
                    <div>
                        <table>
                            <br></br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>周转箱代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入周转箱代码" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="customerLabel" id="ScustomerSelect" style={{ width: '100%' }}>
                                        <MenuItem value="CU_JS00001">CU_JS00001</MenuItem>
                                        <MenuItem value="CU_JS00002">CU_JS00002</MenuItem>
                                        <MenuItem value="CU_JS00003">CU_JS00003</MenuItem>
                                        <MenuItem value="CU_JS00004">CU_JS00004</MenuItem>
                                        <MenuItem value="CU_JS00005">CU_JS00005</MenuItem>
                                        <MenuItem value="CU_JS00006">CU_JS00006</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>终端代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="terminalLabel" id="SterminalSelect" style={{ width: '100%' }} >
                                        <MenuItem value="EU_HB_00001">EU_HB_00001</MenuItem>
                                        <MenuItem value="EU_AH_00001">EU_AH_00001</MenuItem>
                                        <MenuItem value="EU_AH_00002">EU_AH_00002</MenuItem>
                                        <MenuItem value="EU_NMG_00001">EU_NMG_00001</MenuItem>
                                        <MenuItem value="EU_BJ_00001">EU_BJ_00001</MenuItem>
                                        <MenuItem value="EU_SC_00001">EU_SC_00001</MenuItem>
                                        <MenuItem value="EU_SH_00001">EU_SH_00001</MenuItem>
                                        <MenuItem value="EU_HN_00001">EU_HN_00001</MenuItem>
                                        <MenuItem value="EU_AH_00003">EU_AH_00003</MenuItem>
                                        <MenuItem value="EU_AH_00004">EU_AH_00004</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>供应商代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="supplierLabel" id="SsupplierSelect" style={{ width: '100%' }}>
                                        <MenuItem value="CU_JS00001">GY_JS00001</MenuItem>
                                        <MenuItem value="CU_JS00002">GY_JS00002</MenuItem>
                                        <MenuItem value="CU_JS00003">GY_JS00003</MenuItem>
                                        <MenuItem value="CU_JS00004">GY_JS00004</MenuItem>
                                        <MenuItem value="CU_JS00005">GY_JS00005</MenuItem>
                                        <MenuItem value="CU_JS00006">GY_JS00006</MenuItem>
                                    </Select>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <br>
                            </br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>库存类型:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="inventoryTypeLabel" id="inventoryTypeSelect" style={{ width: '100%' }}>
                                        <MenuItem value="正常库存">正常库存</MenuItem>
                                        <MenuItem value="非正常库存">非正常库存</MenuItem>
                                    </Select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <center>
                            <Button variant="outlined" color="primary">查询</Button>
                            <br/><br/>
                        </center>
                    </div>
                </Paper>
            </div>
            <br></br>
            {/* 一张表 */}
            <TableContainer component={Paper} sx={{maxHeight: '500px'}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                <TableCell key={column.id} align={column.align}>
                                    {typeof value === 'boolean' ? operationStateSet(value) : value}
                                </TableCell>
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[6, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default inventorySearch;