import buildClient from '../api/build-client';
import privateRoute from '../api/privateRoute';
import React from 'react';
import ReactECharts from 'echarts-for-react';
import Paper from '@mui/material/Paper';
import Router from 'next/router';
import windowsData from '../globalData'


const mainPage = () => {
    privateRoute();

    const options1 = {
        title:{
            text: '周转管理情况',
            y: '10px',
            subtext: '已完成周转单和新增周转单数量情况',
            textStyle: {
                fontWeight: 'bold',
                fontSize: 25
            }
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['已完成周转单','新增周转单'],
            top:'30px',
            right: '5px',
        },
        toolbox: {
        },
        grid: { top: 80, right: 8, bottom: 24, left: 24 ,containLabel: true},
        xAxis: {
          type: 'category',
          boundaryGap : false,
          data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '已完成周转单',
            type: 'line',
            static: '总量',
            areaStyle: {normal: {}},
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            name: '新增周转单',
            type: 'line',
            static: '总量',
            areaStyle: {normal: {}},
            data: [100, 150, 130, 140, 130, 30, 320],
          },
        ],
      };
      const options2 = {
        title:{
          text: '结算管理情况',
          y: '10px',
          subtext: '各结算途径金额及占比',
          textStyle: {
              fontWeight: 'bold',
              fontSize: 25
          }
      },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          data: ['预付款结算','中期结算','尾款结算','其他结算'],
          top:'30px',
          right: 'right',
        },
        series : [
          {
          name: '结算途径',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'预付款结算'},
            {value:310, name:'中期结算'},
            {value:234, name:'尾款结算'},
            {value:135, name:'其他结算'}
          ],
          itemStyle: {
            emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
          }
        ]
      };
    
      return (
        <div style={{
            width: `calc(100% - ${windowsData.drawerWidth}px)`,
            height: 'calc(100% - 64px)',
            marginLeft: ` ${windowsData.drawerWidth}px`,
            marginTop: '64px'
        }}>
            <br></br>
            <div>
                <Paper style={{width:'23%',height:'300px',display:'inline-block',marginLeft:'1%',marginRight:'1%',backgroundColor:'rgb(209,233,252)'}}>
                  
                </Paper>
                <Paper style={{width:'23%',height:'300px',display:'inline-block',marginLeft:'1%',marginRight:'1%',backgroundColor:'rgb(208,242,255)'}}>
                  
                </Paper>
                <Paper style={{width:'23%',height:'300px',display:'inline-block',marginLeft:'1%',marginRight:'1%',backgroundColor:'rgb(255,247,205)'}}>
                  
                </Paper>
                <Paper style={{width:'23%',height:'300px',display:'inline-block',marginLeft:'1%',marginRight:'1%',backgroundColor:'rgb(255,231,217)'}}>
                  
                </Paper>
            </div>
            <br></br>
            <div>
                <Paper style={{width:'70%',height:'520px',display:'inline-block',marginLeft:'1%',marginRight:'1%'}} button onClick={()=>{Router.push('/trans')}}>
                    <ReactECharts option={options1} style={{width:'95%',margin: 'auto',height:'520px'}}/>
                </Paper>
                <Paper style={{width:'26%',height:'520px',display:'inline-block',marginLeft:'1%',marginRight:'1%'}}>
                  <ReactECharts option={options2} style={{width:'95%',margin: 'auto',height:'520px'}}/>
                </Paper>
            </div>
        </div>
      )
};

mainPage.getInitialProps = async (context) => {

    const {data} = await buildClient(context);

    return data;
};

export default mainPage;