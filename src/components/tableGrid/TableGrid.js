import React from 'react';
import MaterialTable from "material-table";
import useTableGrid from './hooks/useMaterialTableIcon';
import axios from "axios";
import { useHistory } from "react-router-dom";
import {
    Button,
} from '@material-ui/core/';

function TableGrid() {
    const { tableIcons } = useTableGrid();
    const history = useHistory();
    const handleOpen = () => {
        history.push('/regularTable')
    }

    const handleCurdOperations = () => {
        history.push('./materialTableCurd');
    }

    return (
        <div style={{ maxWidth: "100%", paddingTop: '30px' }}>
            <Button variant="contained"
                size="small"
                color="primary"
                style={{ textTransform: 'inherit' }}
                onClick={handleOpen}>
                material-table - Powerful Datatable for React based on Material-UI Table
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained"
                size="small"
                color="primary"
                style={{ textTransform: 'inherit' }}
                onClick={handleCurdOperations}>
                material-table - CURD operations
            </Button>

            {
                <MaterialTable style={{ marginTop: '20px' }}
                    title="Remote Data Preview"
                    icons={tableIcons}
                    columns={[
                        {
                            title: 'Avatar',
                            field: 'avatar',
                            render: rowData => (
                                <img alt="dd"
                                    style={{ height: 36, borderRadius: '50%' }}
                                    src={rowData.avatar}
                                />
                            ),
                        },
                        { title: 'Id', field: 'id' },
                        { title: 'First Name', field: 'first_name' },
                        { title: 'Last Name', field: 'last_name' },
                    ]}
                    data={query =>
                        new Promise((resolve, reject) => {
                            let url = 'https://reqres.in/api/users?'
                            url += 'per_page=' + query.pageSize;
                            url += '&page=' + (query.page + 1);
                            axios.get(url).then(result => {
                                resolve({
                                    data: result.data.data,
                                    page: result.data.page - 1,
                                    totalCount: result.data.total
                                })
                            })
                        })
                    }
                    detailPanel={[
                        {
                            tooltip: 'Show full name',
                            render: rowData => {
                                return (
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#b5a702',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 100
                                    }}>
                                        {rowData.first_name} {rowData.last_name}
                                    </div>
                                )
                            }
                        }
                    ]}
                />
            }
        </div>
    )
}

export default TableGrid
