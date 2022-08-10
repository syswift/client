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
const kucun = () => {
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

  function createData(customerCode, terminalCode, supplierCode, crateCode, reserveType, number, crateName, createTime, operation) {
    return { customerCode, terminalCode, supplierCode, crateCode, reserveType, number, crateName, createTime, operation };
  }

//   function turnState(flag) {
//     if (flag) {
//       return <Button variant="outlined" color="primary">新增</Button>
//     } else {
//       return <Button variant="outlined">完成</Button>
//     }
//   }
  // 周转类型的判断
  function operationState(flag) {
    if (flag) {
      return (
        <div>
          <Button variant="outlined" color="secondary">调整客户库存</Button>
        </div>
      )
    } else {
      return ''
    }
  }

  const onSubmit = () => {
  }

  const rows = [
    createData('CU_JS00001', 'EU_SD_00002', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_SD_00002', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_JL_00001', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_SC_00002', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_SD_00002', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_SD_00002', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
    createData('CU_JS00001', 'EU_JL_00001', '', 'TD12', '正常库存', '5', '', '2021-06-01 09:29:31', true),
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
    customerCode: '',
    terminalCode: '',
    supplierCode: '', 
    crateCode: '', 
    reserveType: '', 
    number: '', 
    crateName: '', 
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
                  <Select labelId="customerLabel" id="customerSelect" style={{ width: '100%' }}>
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
                  <Select labelId="terminalLabel" id="terminalSelect" style={{ width: '100%' }} >
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
                <td style={{ width: '10%', textAlign: 'right' }}>供货商代码:</td>
                <td style={{ width: '2%' }}></td>
                <td style={{ width: '10%' }}>
                  <Select labelId="turnoverStateLabel" id="turnoverStateSelect" style={{ width: '100%' }}>
                    <MenuItem value="a">a</MenuItem>
                    <MenuItem value="b">b</MenuItem>
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
                  <Select labelId="turnoverTypeLabel" id="turnoverTypeSelect" style={{ width: '100%' }}>
                    <MenuItem value="正常库存">正常库存</MenuItem>
                    <MenuItem value="异常库存">异常库存</MenuItem>
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
              <TableCell>客户代码</TableCell>
              <TableCell align="center">终端代码</TableCell>
              <TableCell align="center">供货商代码</TableCell>
              <TableCell align="center">周转箱代码</TableCell>
              <TableCell align="center">库存类型</TableCell>
              <TableCell align="center">数量</TableCell>
              <TableCell align="center">周转箱名称</TableCell>
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
                  {row.customerCode}
                </TableCell>
                <TableCell align="center">{row.terminalCode}</TableCell>
                <TableCell align="center">{row.supplierCode}</TableCell>
                <TableCell align="center">{row.crateCode}</TableCell>
                <TableCell align="center">{row.reserveType}</TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.crateName}</TableCell>
                <TableCell align="center">{row.createTime}</TableCell>
                <TableCell align="center">{operationState(row.operation)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <Pagination count={10} page={page} showFirstButton showLastButton onChange={pageNumberOnChange} />
        </Table>
      </TableContainer>
    </div>
  );
}

export default kucun;