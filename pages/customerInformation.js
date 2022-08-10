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

const customerInformation = () => {
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
    function dataStateSet(flag) {
        if (flag) {
            return <Button variant="outlined" color="primary">可用</Button>
        } else {
            return <Button variant="outlined">暂不可用</Button>
        }
    }
    function createData(customerCode, customerName, companyCode, dataState, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2) {
        return { customerCode, customerName, companyCode, dataState, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2 };
    }
    

    const onSubmit = () => {

    }

    const rows = [
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', false, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
        createData('FC_AH_00001', '芜湖固美', 'FC_AH_00001', true, '', '', '', '', '', '', '', '', '', '', '', '', ''),
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
        { id: 'customerCode', label: '客户代码', minWidth: 100 },
        { id: 'customerName', label: '客户名称', minWidth: 100 },
        { id: 'companyCode', label: '公司编码', minWidth: 100 },
        { id: 'dataState', label: '状态', minWidth: 100 },
        { id: 'province', label: '省', minWidth: 50 },
        { id: 'city', label: '市', minWidth: 50 },
        { id: 'district', label: '区', minWidth: 50 },
        { id: 'address', label: '地址', minWidth: 100 },
        { id: 'country', label: '国家', minWidth: 50 },
        { id: 'countryCode', label: '国家代码', minWidth: 80 },
        { id: 'contact1', label: '联系人1', minWidth: 80 },
        { id: 'position1', label: '职位1', minWidth: 80 },
        { id: 'phone1', label: '联系方式1', minWidth: 80 },
        { id: 'email1', label: '邮箱1', minWidth: 80 },
        { id: 'contact2', label: '联系人2', minWidth: 80 },
        { id: 'position2', label: '职位2', minWidth: 80 },
        { id: 'phone2', label: '联系方式2', minWidth: 80 },
        { id: 'email2', label: '邮箱2', minWidth: 80 },
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
                        <Tab label="供应商信息" />
                    </Tabs>
                    <div>
                        <table>
                            <br></br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入供应商代码" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户名称:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入供应商名称" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>联系人:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入联系人" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>联系方式:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入联系方式" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td>

                                </td>
                            </tr>
                            <br>
                            </br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>状态:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                                        <MenuItem value="正向周转">可用</MenuItem>
                                        <MenuItem value="逆向周转">暂不可用</MenuItem>
                                    </Select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <center>
                            <br></br>
                            <form id="sinsertForm" autoComplete="on" onSubmit={onSubmit}>
                                <span>
                                    <Button variant="contained" onClick={handleClickOpen} size="medium" color="primary" className={classes.margin}>
                                        + 新增客户
                                    </Button>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}>
                                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                            新增客户
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                            <table>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        *客户代码:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        *状态:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        *客户名称:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%' }}>
                                                        <Input placeholder="请输入客户代码" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%' }}>
                                                        <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                                                            <MenuItem value="可用">可用</MenuItem>
                                                            <MenuItem value="暂不可用">暂不可用</MenuItem>
                                                        </Select>
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%' }}>
                                                        <Input placeholder="请输入客户名称" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        *公司编码:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        省:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        市:
                                                    </td>
                                                </tr>
                                                <tr style={{ width: '100%' }}>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入公司编码" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入省" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        区:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td colspan="2" style={{ width: '60%', textAlign: 'left' }}>
                                                        地址:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td colspan="2" style={{ width: '100%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入地址" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        邮编:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        国家:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        国家代码:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        联系人1:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        职位1:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        联系方式1:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style={{ width: '100%', textAlign: 'left' }}>
                                                        邮箱1:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="4" style={{ width: '100%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        联系人2:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        职位2:
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        联系方式2:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: '60%', textAlign: 'left' }}>
                                                        邮箱2:
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style={{ width: '100%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                </tr>
                                            </table>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus variant="contained" onClick={handleClickOpen} size="medium" color="primary" className={classes.margin} style={{ margin: 'auto' }}>
                                                提交
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </span>
                                &emsp;&emsp;
                                <span>
                                    <Button variant="outlined" color="primary">
                                        查询
                                    </Button>
                                </span>
                            </form>
                            <br></br>
                            <br></br>
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
                                    {typeof value === 'boolean' ? dataStateSet(value) : value}
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

export default customerInformation;