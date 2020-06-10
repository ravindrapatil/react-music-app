import React from 'react';
import MaterialTable from "material-table";
import useTableGrid from './hooks/useMaterialTableIcon';
import useAPIData from './hooks/useAPIData';
import axios from "axios";
import {
    CircularProgress
} from '@material-ui/core/';
import GridOnIcon from '@material-ui/icons/GridOn';

function TableGrid() {
    const { tableIcons } = useTableGrid();
    const { data } = useAPIData();

    return (
        <div style={{ maxWidth: "100%", paddingTop: '40px' }}>
            {
                data && data.length ?
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            { title: "First name", field: "first_name", width: 150 },
                            { title: "Last name", field: "last_name", width: 150 },
                            { title: "Email", field: "email", width: 250 },
                            { title: "Gender", field: "gender", width: 150 },
                            { title: "Department Id", field: "department_id", width: 150 },
                            { title: "Hire Date", field: "hire_date", width: 150 },
                            { title: "Phone", field: "phone_number", width: 150 },
                            { title: "Country", field: "country", width: 150 },
                            { title: "Job Title", field: "job_title", width: 150 }
                        ]}
                        data={data}
                        options={{
                            fixedColumns: {
                                left: 2,
                                right: 0
                            },
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF'
                            }
                        }}
                        title="Employee details"
                    />
                    :
                    <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
            }

            {
                <MaterialTable style={{ marginTop: '40px' }}
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
                            url += 'per_page=' + query.pageSize
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
                            tooltip: 'Show Name',
                            render: rowData => {
                                return (
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#43A047',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 100
                                    }}>
                                        {rowData.first_name}
                                    </div>
                                )
                            }
                        },
                        {
                            tooltip: 'Show Surname',
                            render: rowData => {
                                return (
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#43A047',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 100
                                    }}>
                                        {rowData.last_name}
                                    </div>
                                )
                            }
                        },
                        {
                            tooltip: 'Show Both',
                            render: rowData => {
                                return (
                                    <div style={{
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#43A047',
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
