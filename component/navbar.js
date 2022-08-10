import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router';
import axios from 'axios';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Image from 'next/image';
import * as React from 'react';

import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import LoopIcon from '@material-ui/icons/Loop';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import WorkIcon from '@material-ui/icons/Work';
import ListIcon from '@material-ui/icons/List';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

import windowsData from '../globalData'
import { render } from 'react-dom';

import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { display } from '@mui/system';
import { supabase } from '../api';

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: windowsData.drawerWidth,
      width: `calc(100% - ${windowsData.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: windowsData.drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: windowsData.drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(9) + 1,
      [theme.breakpoints.up('sm')]: {
        width: 0,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

const Navbar =({auth_level})=>{
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const currentUser = supabase.auth.user();

    //最高优先运行

    const handleDrawerOpen = () => {
        windowsData.drawerWidth=240;
        setOpen(true);
        Router.push(windowsData.pathDataShow);
    };

    const handleDrawerClose = () => {
        windowsData.drawerWidth=0;
        setOpen(false);
        Router.push(windowsData.pathDataShow);
    };
    const openManagement = () =>{
        Router.push('./trans');
    };

    const signoutFunc = async () => {
        const { error } = await supabase.auth.signOut()
        if(!error) {
          alert('注销成功');
          Router.push('/');
        }
    }

    const showpath = () => {
        try
        {
            console.log(Router.pathname);
            windowsData.pathDataShow=Router.pathname;
            return Router.pathname;
        }
        catch{
            return '/';
        }
    }

        return (
            <div className={classes.root}>
                <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}>
                    <Toolbar>
                        <IconButton color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                            })}>
                            <MenuIcon/>
                        </IconButton>
                        <Image
                            src="/logo.png"
                            alt="logo" 
                            width={40} 
                            height={40}
                            onClick={()=>{Router.push('/')}}/>
                        <div id="pathname" style={{marginLeft:20,flexGrow:1}}>{showpath()}</div>
                        {!currentUser
                        ? <Button color="inherit" onClick={()=>{Router.push('/auth/loginPage')}}>登录</Button>
                        : <div/>
                        }
                        {!currentUser
                        ? <Button color="inherit" onClick={()=>{Router.push('/auth/signupPage')}}>注册</Button>
                        : <div/>
                        }
                        {currentUser
                        ? <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        : <div/>
                        }
                        {currentUser
                        ? <Button color="inherit" onClick={signoutFunc}>登出</Button>
                        : <div/>
                        }
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                    })}
                    classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    }}>
                    <div className={classes.toolbar}>
                      <IconButton onClick={handleDrawerClose}>
                          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                      </IconButton>
                    </div>
                    <Divider />
                    <TreeView
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      multiSelect>
                      <TreeItem nodeId="1" label="工作台" button onClick={()=>{Router.push('/')}} icon={<HomeIcon color="primary"/>} style={{minHeight:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      {auth_level === "管理"
                      ?<TreeItem nodeId="2" label="基础配置" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="3" label="客户信息" button onClick={()=>{Router.push('/customerInformation')}} icon={<SettingsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="4" label="供应商信息" button onClick={()=>{Router.push('/supplierInformation')}} icon={<SettingsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="5" label="终端客户信息" button onClick={()=>{Router.push('/')}} icon={<SettingsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="6" label="周转箱信息" button onClick={()=>{Router.push('/')}} icon={<SettingsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="7" label="价格信息" button onClick={()=>{Router.push('/')}} icon={<SettingsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" ) ||  (auth_level === "运营")
                      ?<TreeItem nodeId="8" label="周转管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="9" label="周转单管理" button onClick={()=>{Router.push('/trans')}} icon={<LoopIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" ) ||  (auth_level === '销售') 
                      ?<TreeItem nodeId="10" label="库存管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="11" label="供应商来货" button onClick={()=>{Router.push('/')}} icon={<LoopIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="12" label="库存查询" button onClick={()=>{Router.push('/inventorySearch')}} icon={<LoopIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" ) ||  (auth_level === "销售")
                      ?<TreeItem nodeId="13" label="结算管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="14" label="结算功能1" button onClick={()=>{Router.push('/')}} icon={<AssessmentIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="15" label="结算功能2" button onClick={()=>{Router.push('/')}} icon={<AssessmentIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" ) ||  (auth_level === "运营")
                      ?<TreeItem nodeId="16" label="工单管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="17" label="工单管理" button onClick={()=>{Router.push('/gongdan')}} icon={<WorkIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" ) ||  (auth_level === "运营")
                      ?<TreeItem nodeId="18" label="报表管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="19" label="报表功能1" button onClick={()=>{Router.push('/')}} icon={<ListIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="20" label="报表功能2" button onClick={()=>{Router.push('/')}} icon={<ListIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                      {(auth_level === "管理" )
                      ?<TreeItem nodeId="21" label="系统管理" style={{minHeight:'56px',paddingLeft: '16px',alignItem:'center'}}>
                        <TreeItem nodeId="22" label="系统功能1" button onClick={()=>{console.log(auth_level)}} icon={<DesktopWindowsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                        <TreeItem nodeId="23" label="系统功能2" button onClick={()=>{Router.push('/')}} icon={<DesktopWindowsIcon color="primary"/>} style={{height:'56px',paddingLeft: '16px',display:'flex',alignItem:'center'}}/>
                      </TreeItem>
                      :null
                      }
                    </TreeView>
                </Drawer>
            </div>
        );
}

export default Navbar;
