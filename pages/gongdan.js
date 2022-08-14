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
import privateRoute from '../api/privateRoute';
import { supabase } from '../api';
import * as ReactDOM from 'react-dom';
// 弹窗

const gongdan = () => {
    privateRoute();
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


    const gongdanFinish = async (gongdanId) =>{
        try {
            const { data , error } = await supabase.from('gongdan').update({status:false, gongdanState: false}).match({gongdanId: gongdanId}); 
        
            if(error) throw error;
        
            console.log(data);
        
            search();
        
          } catch (error) {
            console.log(error);
          }
    }

    const finish = (event) => {
        const gongdanId = event.currentTarget.id.substring(6);

        gongdanFinish(gongdanId);
    }

    const ondelete = async (event) =>{
        const gongdanId = event.currentTarget.id.substring(6);
      
        try {
          const { data, error } = await supabase
        .from('gongdan')
        .delete()
        .match({ gongdanId: gongdanId })
      
        if(error) throw error;
      
        console.log(data);
        
        search();
        } catch (error) {
          console.log(error);
        }
        
    }

    const banish = async (event) =>{
        const gongdanId = event.currentTarget.id.substring(6);

        try {
            const { data , error } = await supabase.from('gongdan')
            .update({type: '报废'})
            .match({gongdanId: gongdanId}); 
        
            if(error) throw error;
        
            console.log(data);
        
            search();
        
          } catch (error) {
            console.log(error);
          }
    }

    // 工单类型的判断
    function operationState(flag, gongdanId) {
        console.log(flag);
        if (flag) {
            return (
                <div>
                    <Button variant="outlined" color="secondary" id = {'cancel'+gongdanId} onClick={ondelete}>取消</Button>&emsp;
                    <Button variant="outlined" color="primary" id = {'banish'+gongdanId} onClick={banish}>报废</Button>&emsp;
                    <Button variant="outlined" id = {'finish'+gongdanId} onClick={finish}>完成</Button>
                </div>
            )
        } else {
            return '';
        }
    }
    
    const rows = [
    ];

    const onSubmit = async (event) => {
        event.preventDefault();
  
        const gongdanId = document.getElementById('gongdanId').value;
        const customerSelect = document.getElementById('customerSelect').innerText;
        const gongdanTypeSelect = document.getElementById('gongdanTypeSelect').innerText;
        const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
        const beizhu = document.getElementById('beizhu').value;

        if(gongdanId === '' ||
            customerSelect === '' ||
            gongdanTypeSelect === ''||
            beizhu === ''
            )
          {
            alert('请填写所有周转单信息');
          }
        else{
            try{
                const processPer = processObj.body.name;

                //console.log(processPer);

                const { upload, error } = await supabase.from('gongdan').insert([
                  {
                    gongdanId: gongdanId,
                    customerId: customerSelect,
                    status: true,
                    type: gongdanTypeSelect,
                    beizhu: beizhu,
                    processPer: processPer,
                    gongdanState: true
                  }
                ]);

                if(error) throw error;

                console.log('success');
                setOpen(false);
                search();

        }catch(error){
                console.log(error);
        }
    }
}

    

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

    const resetSearch = () =>{
        const gongdanId = document.getElementById('SgongdanId').value;
        const customerSelect = document.getElementById('ScustomerSelect').innerText;
        const transStateString = document.getElementById('SturnoverStateSelect').innerText;
        const turnoverTypeSelect = document.getElementById('SturnoverTypeSelect').innerText;
    
        const transState = (transStateString === '新增' ? true : transStateString === '完成' ? false : null);
    
        if(gongdanId !== '') document.getElementById('SgongdanId').value = '';
        if(customerSelect.length > 2) document.getElementById('ScustomerSelect').innerText = '';
        if(transState !== null) document.getElementById('SturnoverStateSelect').innerText = '';
        if(turnoverTypeSelect !== null) document.getElementById('SturnoverTypeSelect').innerText = '';
      }

    const search = async () => {
        rows = [];
        const processPer = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

        const gongdanId = document.getElementById('SgongdanId').value;
        const customerId = document.getElementById('ScustomerSelect').innerText;
        const transStateString = document.getElementById('SturnoverStateSelect').innerText;
        const transType = document.getElementById('SturnoverTypeSelect').innerText;
        

        //console.log(transStateString);

        const transState = (transStateString === '新增' ? true : transStateString === '完成' ? false : null);
    
        const all = await supabase.from('gongdan').select().eq('processPer', processPer.body.name);
        //console.log(all);

        //alert(customerId.length);
    
        for(const tran of all.data)
        {
          if(
            (gongdanId  === '' || gongdanId  === tran.gongdanId ) &&
            (customerId.length < 2 || customerId === tran.customerId) &&
            (transState === null || transState === tran.status) &&
            (transType.length < 2 || transType === tran.type)
            )
          {
            //alert(customerId +' '+ termId + ' '+transState);
            rows.push(createData(tran.gongdanId,tran.customerId,tran.status,tran.type,tran.beizhu,tran.created_at,tran.gongdanState));
          }
          else{
            console.log('没找到对应工单');
          }
        }
        console.log(rows);

        const element = document.getElementById('gongdan_body');

        //jobNumber, customerCode, jobState, jobType, jobAddition, createTime, operation
    
        ReactDOM.render(rows.map((row) => (
          <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            <TableCell id={row.jobNumberr} variant="outlined">{row.jobNumber}</TableCell>
            </TableCell>
            <TableCell align="center">{row.customerCode}</TableCell>
            <TableCell align="center">{turnState(row.jobState)}</TableCell>
            <TableCell align="center">{row.jobType}</TableCell>
            <TableCell align="center">{row.jobAddition}</TableCell>
            <TableCell align="center">{row.createTime}</TableCell>
            <TableCell align="center">{operationState(row.operation, row.jobNumber)}</TableCell>
          </TableRow>
        )), element);

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
                                    <Input placeholder="请输入工单单号" id='SgongdanId' inputProps={{ 'aria-label': 'description' }} />
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="customerLabel" id="ScustomerSelect" style={{ width: '100%' }}>
                                        <MenuItem value="CU_JS00001">CU_JS00001</MenuItem>
                                        <MenuItem value="CU_JS00002">CU_JS00002</MenuItem>
                                        <MenuItem value="CU_JS00003">CU_JS00003</MenuItem>
                                        <MenuItem value="CU_JS00004">CU_JS00004</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>工单状态:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="turnoverStateLabel" id="SturnoverStateSelect" style={{ width: '100%' }}>
                                        <MenuItem value="完成">完成</MenuItem>
                                        <MenuItem value="新增">新增</MenuItem>
                                    </Select>
                                </td>
                                <td style={{ width: '10%', textAlign: 'right' }}>工单类型:</td>
                                <td style={{ width: '2%' }}></td>
                                <td style={{ width: '10%' }}>
                                    <Select labelId="turnoverTypeLabel" id="SturnoverTypeSelect" style={{ width: '100%' }}>
                                        <MenuItem value="维修">维修</MenuItem>
                                        <MenuItem value="报废">报废</MenuItem>
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
                                                <span>*工单类型:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                            </Typography>
                                            <Typography gutterBottom>
                                                <span>
                                                    <Input placeho lder="请输入工单单号" id='gongdanId' inputProps={{ 'aria-label': 'description' }} style={{ width: '30%' }} />
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
                                                    <Select labelId="turnoverTypeLabel" id="gongdanTypeSelect" style={{ width: '30%' }}>
                                                        <MenuItem value="正向工单">维修</MenuItem>
                                                        <MenuItem value="逆向工单">报废</MenuItem>
                                                    </Select>
                                                </span>
                                            </Typography>
                                            <br></br>
                                            <span></span>
                                            <Typography gutterBottom>
                                                工单备注:
                                            </Typography>
                                            <Typography gutterBottom>
                                            <span>
                                                    <Input placeho lder="请输入备注:" id='beizhu' inputProps={{ 'aria-label': 'description' }} style={{ width: '80%' }} />
                                                </span>
                                            </Typography>
                                            <br></br>
                                            <span></span>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button autoFocus variant="contained" onClick={onSubmit} size="medium" color="primary" className={classes.margin}>
                                                提交
                                            </Button>
                                        </DialogActions>
                                    </BootstrapDialog>
                                </span>

                                &emsp;&emsp;

                                <span>
                                    <Button variant="outlined" onClick={search} color="primary">
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
                    <TableBody id='gongdan_body'>
                       
                    </TableBody>
                    <Pagination count={10} showFirstButton showLastButton onChange={pageNumberOnChange} />
                </Table>
            </TableContainer>
        </div>
    );
}

export default gongdan;

