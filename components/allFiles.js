import React from "react";
import { supabase } from "../api";
import Button from '@mui/material/Button';
import * as ReactDOM from 'react-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Allfiles = () => {

     //换页
     const [page, setPage] = React.useState(1);
     const pageNumberOnChange = (event, value) => {
         console.log(value)
         setPage(value)
     }

    const downloadfile =async(event)=>{
        const filename = event.currentTarget.id.substring(8);
        const user = supabase.auth.user();

        //alert(filename);

        try {
            const { data, error } = await supabase
            .storage
            .from('userfiles')
            .download(`${user.id}/${filename}`)

            if(error) throw error;

            console.log('success!');

            const url = URL.createObjectURL(data);
        } catch (error) {
            console.log(error);
        }
    }

    const deletefile =async(event)=>{
        const filename = event.currentTarget.id.substring(6);
        const user = supabase.auth.user();

        //alert(filename);

        try {
            const { data, error } = await supabase
            .storage
            .from('userfiles')
            .remove([`${user.id}/${filename}`])

            if(error) throw error;

            console.log('delete success!');
            getfile();

        } catch (error) {
            console.log(error);
        }
        
    }

    const getfile = async () =>{
        try {
            const { data, error } = await supabase
            .storage
            .from('userfiles')
            .list(supabase.auth.user().id, {
                limit: 100,
                offset: 0,
                sortBy: { column: 'name', order: 'asc' },
            })

            if(error) throw error;

            console.log(data);

            const element= document.getElementById('filelist');

            ReactDOM.render(data.map((f) => (
            f.name !== '.emptyFolderPlaceholder'
            ?
            <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell key={f.name} variant="outlined">
                    {f.name}
                  </TableCell>
                  <TableCell key={f.name} variant="outlined">
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" id={'download'+f.name} onClick={downloadfile}>下载</Button>
                    <Button variant="contained" color="error" id={'delete'+f.name} onClick={deletefile}>删除</Button>
                  </Stack>
                  </TableCell>
            </TableRow>
            :<></>
            )),element)
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div id='download'>
            <Button variant="contained" onClick={getfile}>获得文件</Button>

            <br/>
            <br/>

            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">文件名</TableCell>
                            <TableCell align="center">操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody id='filelist'>
                       
                    </TableBody>
                    <Pagination count={10} showFirstButton showLastButton onChange={pageNumberOnChange} />
                </Table>
        </div>
    );
}

export default Allfiles;