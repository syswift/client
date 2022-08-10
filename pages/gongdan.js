import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
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
import Typography from '@mui/material/Typography';

import DeleteIcon from '@material-ui/icons/Delete';
import windowsData from '../globalData'

import Pagination from '@mui/material/Pagination';


// 弹窗

const gongdan = () => {
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

    function createData(jobNumber, customerCode, jobState, jobType, jobAddition, createTime, operation) {
        return { jobNumber, customerCode, jobState, jobType, jobAddition, createTime, operation };
    }

    function turnState(flag) {
        if (flag) {
            return <Button variant="outlined" color="primary">新增</Button>
        } else {
            return <Button variant="outlined">完成</Button>
        }
    }

    // 周转类型的判断
    function operationState(flag) {
        if (flag) {
            return (
                <div>
                    <Button variant="outlined" color="secondary">取消</Button>&emsp;
                    <Button variant="outlined" color="primary">新增</Button>&emsp;
                    <Button variant="outlined">完成</Button>
                </div>
            )
        } else {
            return ''
        }
    }

    const onSubmit = () => {
    }

    const rows = [
        createData('RT2021060100001', 'CU_JS00001', true, '逆向', '一般', '2021-06-01 09:29:31', true),
        createData('RT2021051700001', 'CU_JS00001', true, '逆向', '较好', '2021-06-01 09:29:31', false),
        createData('RT2021052900004', 'CU_JS00001', true, '逆向', '优秀', '2021-06-01 09:29:31', false),
        createData('RT2021052900003', 'CU_JS00001', false, '逆向', '较差', '2021-06-01 09:29:31', false),
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
    // const [value, setValue] = React.useState(0);
    const [value, setValue] = React.useState({
        jobNumber: '',
        customerCode: '',
        jobState: false,
        jobType: '',
        jobAddition: '',
        createTime: '',
        operation: false,
    });



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

    //换页
    const [page, setPage] = React.useState(1);
    const pageNumberOnChange = (event, value) => {
        console.log(value)
        setPage(value)
    }

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
                        <Tab label="工单管理" />
                    </Tabs>
                    <div>
                        <table>
                            <br></br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>工单单号:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入工单单号" inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="customerLabel" id="customerSelect" style={{ width: '100%' }}>
                                        <MenuItem value="CU_JS00001">CU_JS00001</MenuItem>
                                        <MenuItem value="CU_JS00002">CU_JS00002</MenuItem>
                                        <MenuItem value="CU_JS00003">CU_JS00003</MenuItem>
                                        <MenuItem value="CU_JS00004">CU_JS00004</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>工单状态:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="turnoverStateLabel" id="turnoverStateSelect" style={{ width: '100%' }}>
                                        <MenuItem value="完成">完成</MenuItem>
                                        <MenuItem value="新增">新增</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>工单类型:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                                        <MenuItem value="正向周转">正向周转</MenuItem>
                                        <MenuItem value="逆向周转">逆向周转</MenuItem>
                                    </Select>
                                </td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <center>
                            <br></br>
                            <form id="sinsertForm" autoComplete="on" onSubmit={onSubmit}>
                                <span>
                                    <Button variant="contained" onClick={handleClickOpen} size="medium" color="primary" className={classes.margin}>
                                        + 新增工单
                                    </Button>
                                    <BootstrapDialog
                                        onClose={handleClose}
                                        aria-labelledby="customized-dialog-title"
                                        open={open}>
                                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                            新增工单
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                            <Typography gutterBottom>
                                                <span>*工单单号:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                <span>*客户代码:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                                <span>*终端代码:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            </Typography>
                                            <Typography gutterBottom>
                                                <span>
                                                    <Input placeho lder="请输入周转单号" inputProps={{ 'aria-label': 'description' }} style={{ width: '30%' }} />
                                                </span>
                                                &emsp;
                                                <span>
                                                    <Select labelId="customerLabel" id="customerSelect" style={{ width: '30%' }}>
                                                        <MenuItem value="CU_JS00001">CU_JS00001</MenuItem>
                                                        <MenuItem value="CU_JS00002">CU_JS00002</MenuItem>
                                                        <MenuItem value="CU_JS00003">CU_JS00003</MenuItem>
                                                        <MenuItem value="CU_JS00004">CU_JS00004</MenuItem>
                                                        <MenuItem value="CU_JS00005">CU_JS00005</MenuItem>
                                                        <MenuItem value="CU_JS00006">CU_JS00006</MenuItem>
                                                    </Select>
                                                </span>
                                                &emsp;
                                                <span>
                                                    <Select labelId="terminalLabel" id="terminalSelect" style={{ width: '30%' }} >
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
                                                </span>
                                            </Typography>
                                            <Typography gutterBottom>
                                                工单类型:
                                            </Typography>
                                            <Typography gutterBottom>
                                                <span>
                                                    <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '30%' }}>
                                                        <MenuItem value="正向工单">正向工单</MenuItem>
                                                        <MenuItem value="逆向工单">逆向工单</MenuItem>
                                                    </Select>
                                                </span>
                                            </Typography>
                                            <br></br>
                                            <span></span>
                                            <Typography gutterBottom>
                                                <br></br>
                                                <div>
                                                    订单明细
                                                </div>
                                                <br></br>
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>工单代码</TableCell>
                                                                <TableCell>数量</TableCell>
                                                                <TableCell>操作</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Select labelId="turnoverCodeLabel" id="turnoverCodeSelect" style={{ width: '100%' }} >
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
                                                                </TableCell>
                                                                <TableCell>

                                                                </TableCell>
                                                                <TableCell>
                                                                    <IconButton aria-label="delete">
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Typography>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus variant="contained" onClick={handleClickOpen} size="medium" color="primary" className={classes.margin}>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>工单单号</TableCell>
                            <TableCell align="center">客户代码</TableCell>
                            <TableCell align="center">工单状态</TableCell>
                            <TableCell align="center">工单类型</TableCell>
                            <TableCell align="center">工单备注</TableCell>
                            <TableCell align="center">创建时间</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {row.jobNumber}
                                </TableCell>
                                <TableCell align="center">{row.customerCode}</TableCell>
                                {/* <TableCell align="center">{row.jobState}</TableCell> */}
                                <TableCell align="center">{turnState(row.jobState)}</TableCell>
                                <TableCell align="center">{row.jobType}</TableCell>
                                <TableCell align="center">{row.jobAddition}</TableCell>
                                <TableCell align="center">{row.createTime}</TableCell>
                                <TableCell align="center">{operationState(row.operation)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <Pagination count={10} showFirstButton showLastButton onChange={pageNumberOnChange} />
                </Table>
            </TableContainer>
        </div>
    );
}

export default gongdan;

