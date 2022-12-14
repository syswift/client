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
import * as ReactDOM from 'react-dom';

import DeleteIcon from '@material-ui/icons/Delete';
import drawerWidth from '../globalData'
import axios from 'axios';

import Pagination from '@mui/material/Pagination';
import { format } from "date-fns";
import { TextField } from '@mui/material';
import { supabase } from '../api';
import Router from 'next/router';
import privateRoute from '../api/privateRoute';
import { checkAuth } from '../api/checkAuth';
import Autocomplete from '@mui/material/Autocomplete';

const terminals = ['EU_HB_00001','EU_AH_00004','EU_AH_00002'];

const turnoverStates = ['完成','新增'];

const types = ['正向周转','逆向周转'];

// 弹窗
const trans = () => {
  privateRoute();

  //const auth_level = '管理';

  React.useEffect(async() => {
    // checks if the user is authenticated
    const processPer = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
    let all;
    
    if(processPer.body.currentProject !== '')
    {
      all = await supabase.from('customer').select().match({
        processPer: processPer.body.name,
        projectName: processPer.body.currentProject
      });
    }
    else if(await checkAuth() === '管理')
    {
      all = await supabase.from('customer').select();
    }
    else{
      all = await supabase.from('customer').select().match({
        processPer: processPer.body.name
      });
    }

    console.log(all);

    const element = document.getElementById('ScustomerDiv');

    let customers = [];

    for(const customer of all.data)
    {
      customers.push(customer.customerId);
    }
    console.log(customers);

    ReactDOM.render(<>
      <Autocomplete
                  disablePortal
                  id="ScustomerSelect"
                  options={customers}
                  renderInput={(params) => <TextField {...params} label="选择客户代码"  />}
                />
    </>,element);

    //await new Promise(resolve => setTimeout(resolve, 3000));
    Router.push(window.location.pathname);
    search();

  }, []);

  

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

  function createData(turnoverNumber, customerCode, terminalCode, turnoverState, turnoverType, founders, createTime, operation) {
    return { turnoverNumber, customerCode, terminalCode, turnoverState, turnoverType, founders, createTime, operation };
  }
  function turnState(flag) {
    if (flag) {
      return <Button variant="outlined" color="primary">新增</Button>
    } else {
      return <Button variant="outlined">完成</Button>
    }
  }

const transFinish = async (transId) =>{

  try {
    const { res , error } = await supabase.from('trans').update({transState: 'false'}).match({transId: transId}); 

    if(error) throw error;

    console.log(res);

    search();

  } catch (error) {
    console.log(error);
  }

}

const finish = (event) => {
  
  const transId = event.currentTarget.id.substring(6);
  //console.log(transId);

  transFinish(transId);

}

const ondelete = async (event) =>{
  const transId = event.currentTarget.id.substring(6);

  try {
    const { res, error } = await supabase
  .from('trans')
  .delete()
  .match({ transId: transId })

  if(error) throw error;

  console.log(res);
  
  search();
  } catch (error) {
    console.log(error);
  }
  
}

  // 周转类型的判断
  function operationState(flag , transId) {
    if (flag) {
      return (
        <div>
          <Button variant="outlined" color="secondary" id = {'cancel'+transId} onClick={ondelete} >取消</Button>&emsp;
          <Button variant="outlined" id = {'finish'+transId} onClick={finish} >完成周转</Button>
        </div>
      )
    } else {
      return ''
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
    transId:'',
    customerSelect:'',
    terminalSelect:'',
    turnoverTypeSelect:'',
    turnoverCodeSelect: [],
    turnoverNumber: '',
    customerCode: '',
    terminalCode: '',
    turnoverState: false,
    turnoverType: '',
    founders: '',
    createTime: '',
    operation: false,
    boxNo: 0
  });

  // 按钮组件
  const classes = useStyles();
  // 弹窗
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = async () => {
    value.boxNo = 0;
    setOpen(true);

    const processPer = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

    let all;
    
    if(processPer.body.currentProject !== '')
    {
      all = await supabase.from('customer').select().match({
        processPer: processPer.body.name,
        projectName: processPer.body.currentProject
      });
    }
    else if(await checkAuth() === '管理')
    {
      all = await supabase.from('customer').select();
    }
    else{
      all = await supabase.from('customer').select().match({
        processPer: processPer.body.name
      });
    }

    const element = document.getElementById('customerDiv');

    ReactDOM.render(<>
      <Select labelId="customerLabel" id="customerSelect" style={{ width: '30%' }}>
        {all.data.map((customer)=>{ return (
      <MenuItem value={customer.customerId}>{customer.customerId}</MenuItem>
       ) })}
    </Select>
    </>,element);
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

    const handleChange = (prop) => (event) => {
      setValue({ ...value, [prop]: event.target.value });
    };

    const getDate = () =>{
      const today = new Date();

      //const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +' '+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      let date = '';
      date = format(today, "MMMM do, yyyy H:mma");

      return date;
    }

    const search = async () => {
      const processPer = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
      if(!processPer)
      {
              alert('请登录账号');
      }
      else{

        const transId = document.getElementById('StransId').value;
        const customerId = document.getElementById('ScustomerSelect').value;
        const termId = document.getElementById('SterminalSelect').value;
        const transStateString = document.getElementById('SturnoverStateSelect').value;
        const transType = document.getElementById('SturnoverTypeSelect').value;

        //console.log(transStateString);

        const transState = (transStateString === '新增' ? true : transStateString === '完成' ? false : null);
        let all;

        Router.push(window.location.pathname);
        //console.log(await checkAuth());
    
        if(processPer.body.currentProject !== '')
        {
          all = await supabase.from('trans').select().match({
            processPer: processPer.body.name,
            projectName: processPer.body.currentProject
          });
        }
        else if(await checkAuth() === '管理')
        {
          all = await supabase.from('trans').select();
        }
        else{
          all = await supabase.from('trans').select().match({
            processPer: processPer.body.name
          });
        }
        console.log(all);
    
        const alltrans = [];

        //alert(customerId.length);
    
        for(const tran of all.data)
        {
          if(
            (transId === '' || transId === tran.transId) &&
            (customerId.length < 2 || customerId === tran.customerId) &&
            (termId.length < 2 || termId === tran.termId) &&
            (transState === null || transState === tran.transState) &&
            (transType.length < 2 || transType === tran.transType) 
            )
          {
            //alert(customerId +' '+ termId + ' '+transState);
            alltrans.push(createData(tran.transId,tran.customerId,tran.termId,tran.transState,tran.transType,tran.processPer,tran.createTime,tran.transState));
          }
          else{
            console.log('没找到对应周转单');
          }
        }
    
        const element = document.getElementById('all_trans');
    
        ReactDOM.render(alltrans.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
            {<Button id={row.turnoverNumber} variant="outlined">{row.turnoverNumber}</Button>}
            </TableCell>
            <TableCell align="center">{row.customerCode}</TableCell>
            <TableCell align="center">{row.terminalCode}</TableCell>
            <TableCell align="center">{turnState(row.turnoverState)}</TableCell>
            <TableCell align="center">{row.turnoverType}</TableCell>
            <TableCell align="center">{row.founders}</TableCell>
            <TableCell align="center">{row.createTime}</TableCell>
            <TableCell align="center">{operationState(row.operation, row.turnoverNumber)}</TableCell>
          </TableRow>
        )), element);
      }
    }
  
  const onSubmit = async (event) => {
  
          event.preventDefault();
  
          const transId = document.getElementById('transId').value;
          const customerSelect = document.getElementById('customerSelect').innerText;
          const terminalSelect = document.getElementById('terminalSelect').innerText;
          const turnoverTypeSelect = document.getElementById('turnoverTypeSelect').innerText;
          //const turnoverCodeSelect = value.turnoverCodeSelect;
          const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

          if(processObj === null)
          {
            alert('请登录账号');

            setValue({...value,
              transId:'',
              customerSelect:'',
              terminalSelect:'',
              turnoverTypeSelect:'',
              turnoverCodeSelect: []
          });
          }
          else if(transId === '' ||
            customerSelect === '' ||
            terminalSelect === '' ||
            turnoverTypeSelect === ''
            )
          {
            alert('请填写所有周转单信息');

            setValue({...value,
              transId:'',
              customerSelect:'',
              terminalSelect:'',
              turnoverTypeSelect:'',
              turnoverCodeSelect: []
          });
          }
          
          else{
                //insert box storage
                try {
                  for (let i = 0; i < value.boxNo; i++) {
                    const boxId = document.getElementById('turnoverCodeSelect'+i).innerText;
                    const amount = document.getElementById('boxNumSelect'+i).value;
                    const project = processObj.body.currentProject;
            
                    console.log(boxId);
                    console.log(amount);
            
                    const customerId = customerSelect;
                    const termId = terminalSelect;
            
                    const exit = await supabase.from('box_storage').select().match({
                        customerId: customerId,
                        termId: termId,
                        boxId: boxId
                    }).single();
                    console.log(exit);
                    
                            if(exit.body)
                            {
                              const{res , error} = await supabase.from('box_storage').update({
                                  amount: Number(exit.data.amount)+Number(amount)
                                }).match({
                                  customerId: customerId,
                                  termId: termId,
                                  boxId: boxId
                                });
                              if(error) throw error;
                            }
                            else{
                              const{res , error} = await supabase.from('box_storage').insert({
                                customerId: customerId,
                                termId: termId,
                                boxId: boxId,
                                amount: Number(amount),
                                projectName: project
                              });
                            if(error) throw error;
                            }
                          }
                        } catch (error) {
                          console.log(error);
                   }
  
            try{
                const processPer = processObj.body.name;
                const project = processObj.body.currentProject;
                const currentDate = getDate();

                //console.log(processPer);

                const { upload, error } = await supabase.from('trans').insert([
                  {
                    transId: transId,
                    customerId: customerSelect,
                    termId: terminalSelect,
                    transState: true,
                    transType: turnoverTypeSelect,
                    processPer: processPer,
                    createTime: currentDate,
                    projectName: project
                  }
                ]);

                if(error) throw error;

                setValue({...value,
                  transId:'',
                  customerSelect:'',
                  terminalSelect:'',
                  turnoverTypeSelect:'',
                  processPer:''
              });
      
                search();
                setOpen(false);
                //success upload
            } 
            catch (error) {
                console.log(error);
            }
          }
  }
  
  const deleteBox = (event) => {/*
    const currentTarget = event.currentTarget.id;
    const deleteTarget = "boxRow"+currentTarget.substring(9);
    console.log(deleteTarget);
    
    document.getElementById(deleteTarget).remove();
    value.boxNo--;
    console.log(value.boxNo);
*/}


  const newBox =()=>{

    const element = document.getElementById('transboxes');

    if(value.boxNo!==0) value.boxNo++;
    else value.boxNo+=2;
    console.log(value.boxNo);

    let tmp = [];

    
    for (let i = 0; i < value.boxNo; i++) {
      tmp.push(i);
    }

    ReactDOM.render(tmp.map((res)=>
    <TableRow id={"boxRow"+res}>                                                        
    <TableCell>
    <Select labelId="turnoverCodeLabel" id={'turnoverCodeSelect'+res} style={{width: '100%' }} >
      <MenuItem value="EU_HB_00001">CN108427574B</MenuItem>
      <MenuItem value="EU_AH_00001">CN757667896C</MenuItem>
      <MenuItem value="EU_AH_00002">CN435346678A</MenuItem>
      <MenuItem value="EU_NMG_00001">CN224567574B</MenuItem>
      <MenuItem value="EU_BJ_00001">CN967865756C</MenuItem>
      </Select>
    </TableCell>  
    <TableCell>
      <Input margin="normal" id={'boxNumSelect'+res} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} style={{width: '50%' }}/>
    </TableCell>
    <TableCell>
      {
      res !== 0
      ?<IconButton aria-label="delete" id={'boxDelete'+res} onClick={deleteBox}>
      <DeleteIcon />
      </IconButton>
      :<IconButton aria-label="delete" id={'boxDelete'+res} onClick={deleteBox}>
      </IconButton>
      }
    </TableCell>
    </TableRow>
    )
    ,element);

  }

  const resetSearch = () =>{
    const transId = document.getElementById('StransId').value;
    const customerSelect = document.getElementById('ScustomerSelect').value;
    const terminalSelect = document.getElementById('SterminalSelect').value;
    const transStateString = document.getElementById('SturnoverStateSelect').value;
    const turnoverTypeSelect = document.getElementById('SturnoverTypeSelect').value;

    const transState = (transStateString === '新增' ? true : transStateString === '完成' ? false : null);

    if(transId !== '') document.getElementById('StransId').value = '';
    if(customerSelect !== '') document.getElementById('ScustomerSelect').value = '';
    if(terminalSelect !== '') document.getElementById('SterminalSelect').value = '';
    if(transState !== null) document.getElementById('SturnoverStateSelect').value = '';
    if(turnoverTypeSelect !== '') document.getElementById('SturnoverTypeSelect').value = '';
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
            <Tab label="周转单管理" />
          </Tabs>
          <div>
            <table>
              <br></br>
              <tr>
                <td style={{ width: '10%', textAlign: 'right' }}>周转单号:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}>
                  <Input placeholder="请输入周转单号" id="StransId" inputProps={{ 'aria-label': 'description' }} />
                </td>
                <td style={{ width: '10%', textAlign: 'right' }}>客户代码:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}  id = 'ScustomerDiv'>
                
                </td>
                <td style={{ width: '10%', textAlign: 'right' }}>终端代码:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}>
                <Autocomplete
                  disablePortal
                  id="SterminalSelect"
                  options={terminals}
                  renderInput={(params) => <TextField {...params} label="选择终端代码"  />}
                />
                </td>
                <td style={{ width: '10%', textAlign: 'right' }}>

                </td>
              </tr>
              <br>
              </br>
              
              <tr>
              <td style={{ width: '10%', textAlign: 'right' }}>周转单状态:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}>
                <Autocomplete
                  disablePortal
                  id="SturnoverStateSelect"
                  options={turnoverStates}
                  renderInput={(params) => <TextField {...params} label="选择状态"  />}
                />
                </td>
                
                <td style={{ width: '10%', textAlign: 'right' }}>周转单类型:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}>
                <Autocomplete
                  disablePortal
                  id="SturnoverTypeSelect"
                  options={types}
                  renderInput={(params) => <TextField {...params} label="选择状态"  />}
                />
                </td>
              </tr>
            </table>
          </div>
          <div>
              
            <center>
              <br></br>
                
                <span>
                  <Button variant="contained" onClick={handleClickOpen} size="medium" color="primary" className={classes.margin}>
                    + 新增周转单
                  </Button>
                  <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                      新增周转单
                    </BootstrapDialogTitle>
                      <form id="sinsertForm" autoComplete="on" onSubmit={onSubmit}>
                    <DialogContent dividers>
                      <Typography gutterBottom>
                        <span>*周转单号:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <span>*客户代码:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                        <span>*终端代码:</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                      </Typography>
                      <Typography gutterBottom>
                        <span>
                          <Input placeho lder="请输入周转单号" id='transId' inputProps={{ 'aria-label': 'description' }} style={{ width: '30%' }} />
                        </span>
                        &emsp;
                        <span id='customerDiv'>
                        </span>
                        &emsp;
                        <span>
                          
                          <Select labelId="terminalLabel" id="terminalSelect"  style={{ width: '30%' }} >
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
                        周转单类型:
                      </Typography>
                      <Typography gutterBottom>
                        <span>
                          <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect"  style={{ width: '30%' }}>
                            <MenuItem value="正向周转">正向周转</MenuItem>
                            <MenuItem value="逆向周转">逆向周转</MenuItem>
                          </Select>
                        </span>
                      </Typography>
                      <br></br>
                      <span></span>
                      <Typography gutterBottom>
                        <br></br>
                        <div>
                          订单明细
                          &emsp;
                            <Button variant="contained" onClick={newBox}>新增一行</Button>
                        </div>
                          
                        <br></br>
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: 400 }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell>周转箱代码</TableCell>
                                <TableCell>数量</TableCell>
                                <TableCell>操作</TableCell>
                              </TableRow>
                            </TableHead>
                              <TableBody id="transboxes">
                              <TableRow id={"boxRow"+0}>                                                        
                              <TableCell>
                              <Select labelId="turnoverCodeLabel" id={'turnoverCodeSelect'+0} style={{width: '100%' }} >
                                <MenuItem value="EU_HB_00001">CN108427574B</MenuItem>
                                <MenuItem value="EU_AH_00001">CN757667896C</MenuItem>
                                <MenuItem value="EU_AH_00002">CN435346678A</MenuItem>
                                <MenuItem value="EU_NMG_00001">CN224567574B</MenuItem>
                                <MenuItem value="EU_BJ_00001">CN967865756C</MenuItem>
                                </Select>
                              </TableCell>  
                              <TableCell>
                                <Input margin="normal" id={'boxNumSelect'+0} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} style={{width: '50%' }}/>
                              </TableCell>
                              <TableCell>
                              <IconButton aria-label="delete" id={'boxDelete'+0} onClick={deleteBox}/>
                              </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Typography>
                          
                    <DialogActions>
                          <Button autoFocus variant="contained" type="submit" size="medium" color="primary" className={classes.margin}>
                        提交
                      </Button>
                    </DialogActions>

                      </DialogContent>
                      </form>
                  </BootstrapDialog>
                </span>

                &emsp;&emsp;

                <span>
                <Button variant="outlined" onClick={search} color="primary">
                    查询
                  </Button>
                </span>
                {/*
                &emsp;&emsp;
               
                <span>
                <Button variant="outlined" onClick={resetSearch} color="primary">
                    重置
                  </Button>
                </span>
                */}
                
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
              <TableCell>周转单号</TableCell>
              <TableCell align="center">客户代码</TableCell>
              <TableCell align="center">终端代码</TableCell>
              <TableCell align="center">周转单状态</TableCell>
              <TableCell align="center">周转类型</TableCell>
              <TableCell align="center">创建人</TableCell>
              <TableCell align="center">创建时间</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody id='all_trans'>
            </TableBody>
            <Pagination count={10}  showFirstButton showLastButton onChange={pageNumberOnChange} />
          </Table>
        </TableContainer>
      </div>
  );
}

export default trans;