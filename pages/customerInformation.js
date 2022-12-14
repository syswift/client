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
import privateRoute from '../api/privateRoute';
import { supabase } from '../api';
import * as ReactDOM from 'react-dom';
import {checkAuth} from '../api/checkAuth';

const customerInformation = () => {

    privateRoute();

    // 终端绑定的复选框
    const { useState, useEffect } = React;
    function CheckAll() {
        const [checkAll, setCheckAll] = useState(false);
        // 因为点击单按钮和全选按钮，都会改变checkALll从而触发useEffect，导致点击单按钮还会影响其他按钮的选中效果，所以设置这个数据，为了确保仅在点击全选的按钮状态下改变对应的数据
        const [isCheckAllClicked, setCheckAllClick] = useState(false); 
        const [list, setList] = useState([
          {
            id: 1,
            name: "EU_HB_00001",
            checked: true,
          },
          {
            id: 2,
            name: "EU_HB_00002",
            checked: false,
          },
          {
            id: 3,
            name: "EU_HB_00003",
            checked: false,
          },
          {
            id: 4,
            name: "EU_HB_00004",
            checked: false,
          },
          {
            id: 5,
            name: "HU_HC_00001",
            checked: false,
          },
          {
            id: 6,
            name: "HU_HC_00002",
            checked: false,
          },
          {
            id: 7,
            name: "HU_HC_00003",
            checked: false,
          },
        ]);
        useEffect(async() => {
          // console.count("设置全选");
          setCheckAll(
            list.filter((item) => item.checked).length == list.length
          );
        }, [list]);

        // 全选按钮改变之后
        useEffect(() => {
          if (isCheckAllClicked) {
            setList(
              list.map((item) => {
                item.checked = checkAll;
                return item; //  需要有一个返回值，否则会出错
              })
            );
            setCheckAllClick(false);
          }
        }, [checkAll]);
        return (
          <div>
            <p>
              <label
                onClick={() => {
                  setCheckAllClick(true);
                  setCheckAll(!checkAll);
                }}
              >
                <input onChange={() => {}} type="checkbox" checked={checkAll} />
                全选
              </label>
            </p>
            <ul>
              {list.map((item) => (
                <li key={item.id}>
                  <label
                    onClick={() => {
                      // console.count(111);
                      list.find((i) => i.id == item.id).checked = !list.find(
                        (i) => i.id == item.id
                      ).checked;
                      //  如果不浅拷贝的话，尽管效果变了，但是 list.checked值不会随着点击而改变
                      setList([...list]); 
                    }}
                  >
                    <input
                      onChange={() => {}}
                      checked={item.checked}
                      type="checkbox"
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        );
      }
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
    

    const onSubmit = async () => {
        const customerId = document.getElementById('customerId').value;
        const statusString = document.getElementById('status').innerText;
        const customerName = document.getElementById('customerName').value;
        const companyCode = document.getElementById('companyCode').value;
        const address = document.getElementById('address').value;
        const zipCode = document.getElementById('zipCode').value;
        const country = document.getElementById('country').value;
        //const contactP1 = document.getElementById('contactP1').innerText;
        //const position1 = document.getElementById('position1').innerText; 
        //const contactD1 = document.getElementById('contactD1').innerText; 
        const email1 = document.getElementById('email1').value;
        const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

        const status = (statusString === '可用' ? true : statusString === '暂不可用' ? false : null);

        console.log(customerId,status,customerName,companyCode);

        if(customerId === '' ||
            status === '' ||
            customerName === '' ||
            companyCode === ''
            )
        {
            alert('请填写所有必要信息');
        }
        else{
            try{
                const processPer = processObj.body.name;
                const project = processObj.body.currentProject;

                //console.log(processPer);

                const { upload, error } = await supabase.from('customer').insert([
                  {
                    customerId: customerId,
                    status: status,
                    customerName: customerName,
                    companyCode: companyCode,
                    address: address,
                    zipCode: zipCode,
                    country: country,
                    email1: email1,
                    processPer: processPer,
                    projectName: project
                  }
                ]);

                if(error) throw error;
      
                setOpen(false);
                search();
                //success upload
            } 
            catch (error) {
                console.log(error);
            }
        }
    }

    let rows = [];

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
    // 增加客户信息弹窗
    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };
    // 绑定终端弹窗
    const [open2, setOpen2] = React.useState(false);
    const handleClickOpen2 = async () => {
        const auth = await checkAuth();
        let all;
    
        if(auth === '管理' || auth === '销售')
        {
            all = await supabase.from('terminal').select();
        }
        console.log(all);

        /*
        list.map((item) => (
            <li key={item.id}>
              <label
                onClick={() => {
                  // console.count(111);
                  list.find((i) => i.id == item.id).checked = !list.find(
                    (i) => i.id == item.id
                  ).checked;
                  //  如果不浅拷贝的话，尽管效果变了，但是 list.checked值不会随着点击而改变
                  setList([...list]); 
                }}
              >
                <input
                  onChange={() => {}}
                  checked={item.checked}
                  type="checkbox"
                />
                {item.name}
              </label>
            </li>
          ))
          */

        console.log('here');
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
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

    const search = async () => {

        rows = [];

        const processPer = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

        const customerId = document.getElementById('ScustomerId').value;
        const customerName = document.getElementById('ScustomerName').value;
        const statusString = document.getElementById('Stype').innerHTML;
        
        const status = (statusString === '可用' ? true : statusString === '暂不可用' ? false : null);

        let all;

        if(await checkAuth() !== '管理')
        {
            all = await supabase.from('customer').select().match({
                processPer: processPer.body.name
            });
        }
        else{
            all = await supabase.from('customer').select()
        }
        console.log(customerId,customerName,status);

        for(const customer of all.data)
        {
            if(
                (customerId === '' || customerId === customer.customerId) &&
                (customerName === '' || customerName === customer.customerName) &&
                (status === null || status === customer.status)
            )
            {
                //(customerCode, customerName, companyCode, dataState, province, city, district, address, country, countryCode, contact1, position1, phone1, email1, contact2, position2, phone2, email2)
                rows.push(createData(customer.customerId, customer.customerName, customer.companyCode, customer.status, '','','',customer.address,customer.country, customer.countryCode,
                             customer.contactP1,customer.position1,customer.contactD1,customer.email1,
                             '','','',''))
            }
        }
        console.log(rows);

        const element = document.getElementById('customerDetail');
        
        ReactDOM.render(
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        const value = row[column.id];

                        if(column.id !== 'customerCode')
                        { return (
                        <TableCell key={column.id} align={column.align}>
                            {typeof value === 'boolean' ? dataStateSet(value) : value}
                        </TableCell>
                        );
                        }
                        else{
                            return (
                                <TableCell key={column.id} align={column.align}>
                                <Button id={column.id} variant="outlined" onClick={handleClickOpen2}>{value}</Button>
                            </TableCell>
                            )
                        }
                    })}
                    </TableRow>
                );
                })
        ,element);
        
    }

    const resetSearch = () =>{
        const customerId = document.getElementById('ScustomerId').value;
        const customerName = document.getElementById('ScustomerName').value;
        const statusString = document.getElementById('Stype').innerHTML;
    
        const status = (statusString === '可用' ? true : statusString === '暂不可用' ? false : null);
    
        if(customerId !== '') document.getElementById('ScustomerId').value = '';
        if(customerName !== '') document.getElementById('ScustomerName').value = '';
        if(status !== null) document.getElementById('Stype').innerText = '';
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
                        <Tab label="客户信息" />
                    </Tabs>
                    <div>
                        <table>
                            <br></br>
                            <tr>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入客户代码" id='ScustomerId' inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户名称:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Input placeholder="请输入客户名称" id='ScustomerName' inputProps={{ 'aria-label': 'description' }} />
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
                                    <Select labelId="turnoverTypeLabel" id='Stype' style={{ width: '100%' }}>
                                        <MenuItem value="可用">可用</MenuItem>
                                        <MenuItem value="暂不可用">暂不可用</MenuItem>
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
                                    <Button variant="contained" onClick={handleClickOpen1} size="medium" color="primary" className={classes.margin}>
                                        + 新增客户
                                    </Button>
                                    <BootstrapDialog
                                        onClose={handleClose1}
                                        aria-labelledby="customized-dialog-title1"
                                        open={open1}>
                                        <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose1}>
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
                                                        <Input placeholder="请输入客户代码" id="customerId" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%' }}>
                                                        <Select labelId="turnoverTypeLabel" id="status" style={{ width: '100%' }}>
                                                            <MenuItem value="可用">可用</MenuItem>
                                                            <MenuItem value="暂不可用">暂不可用</MenuItem>
                                                        </Select>
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%' }}>
                                                        <Input placeholder="请输入客户名称" id='customerName' inputProps={{ 'aria-label': 'description' }} />
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
                                                        <Input placeholder="请输入公司编码" id='companyCode' inputProps={{ 'aria-label': 'description' }} />
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
                                                    <td colspan="2"  style={{ width: '60%', textAlign: 'left' }}>
                                                        地址:
                                                    </td>
                                                </tr>
                                                <tr> 
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td colspan="2" style={{ width: '100%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入地址" id='address' inputProps={{ 'aria-label': 'description' }} />
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
                                                        <Input placeholder="请输入" id='zipCode' inputProps={{ 'aria-label': 'description' }} />
                                                    </td>
                                                    <td style={{ width: '3%' }}></td>
                                                    <td style={{ width: '30%', textAlign: 'left' }}>
                                                        <Input placeholder="请输入" id='country' inputProps={{ 'aria-label': 'description' }} />
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
                                                    <td colspan="4" id='email1' style={{ width: '100%', textAlign: 'left' }}>
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
                                            <Button autoFocus variant="contained" onClick={onSubmit} size="medium" color="primary" className={classes.margin} style={{ margin: 'auto' }}>
                                                提交
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </span>
                                &emsp;&emsp;
                                <span>
                                    <Button variant="outlined" color="primary" onClick={search}>
                                        查询
                                    </Button>
                                </span>

                                &emsp;&emsp;

                                <span>
                                <Button variant="outlined" onClick={resetSearch} color="primary">
                                    重置
                                </Button>
                                </span>
                            </form>
                            <br></br>
                            <br></br>
                        </center>
                    </div>
                </Paper>
            </div>

            <BootstrapDialog
                                        onClose={handleClose2}
                                        aria-labelledby="customized-dialog-title1"
                                        open={open2}>
                                        <BootstrapDialogTitle id="customized-dialog-title1" onClose={handleClose2}>
                                            绑定终端
                                        </BootstrapDialogTitle>
                                        <DialogContent dividers>
                                            <table style={{ minWidth: '565px'}}>
                                                <tr>
                                                    <td style={{ width: '15%', textAlign: 'left' }}>
                                                        客户代码:
                                                    </td>
                                                    <td style={{ width: '20%', textAlign: 'center' ,fontWeight:'bold' }}>
                                                        {windowsData.customerCode}
                                                    </td>
                                                    <td style={{ width: '15%', textAlign: 'left' }}>
                                                        客户名称:
                                                    </td>
                                                    <td style={{ width: '13%', textAlign: 'center' ,fontWeight:'bold' }}>
                                                        {windowsData.customerName}
                                                    </td>
                                                    <td style={{ width: '15%', textAlign: 'left' }}>
                                                        公司编码:
                                                    </td>
                                                    <td style={{ width: '15%', textAlign: 'center' ,fontWeight:'bold'}}>
                                                        {windowsData.companyCode}  
                                                    </td>
                                                </tr>
                                            </table>
                                            <br /><br />
                                            <div>终端列表</div>
                                            <hr />
                                            <CheckAll></CheckAll>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus variant="contained" onClick={handleClickOpen2} size="medium" color="primary" className={classes.margin} style={{ margin: 'auto' }}>
                                                提交
                                            </Button>
                                        </DialogActions>
            </BootstrapDialog>
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
                    <TableBody id='customerDetail'>
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