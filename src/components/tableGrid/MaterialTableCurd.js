import React, { useState, useEffect } from 'react';
import {
    CircularProgress,
    Button
} from '@material-ui/core/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from "react-router-dom";
import services from './hooks/services';
import MaterialTable from "material-table";
import useTableGrid from './hooks/useMaterialTableIcon';

function MaterialTableCurd() {
    const history = useHistory();
    const { employeeDataFromApi, updateUser, addNewUser, deleteUser } = services();
    const { tableIcons } = useTableGrid();

    const [state, setstate] = useState({
        data: []
    });

    const { data } = state;

    useEffect(() => {
        getEmployees()
    }, [])

    const getEmployees = async () => {
        const result = await employeeDataFromApi({});
        console.log(result);
        setstate({
            data: result.data.result
        })
    }

    const goBack = () => {
        history.goBack();
    }

    const update = async (param) => {
        const result = await updateUser({ requestParams: param });
        console.log(result);
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                    onClick={goBack}>
                    Back
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {
                    data && data.length ?
                        <MaterialTable
                            title="User Data"
                            icons={tableIcons}
                            columns={[
                                { title: 'Id', field: 'id', editable: 'never' },
                                { title: 'First Name', field: 'first_name' },
                                { title: 'Last Name', field: 'last_name' },
                                { title: 'Email', field: 'email' },
                                { title: 'Gender', field: 'gender' },
                                { title: 'DOB', field: 'dob', editable: 'never' },
                                { title: 'Status', field: 'status' },
                            ]}
                            data={data}
                            detailPanel={[
                                {
                                    tooltip: 'Show Name',
                                    render: rowData => {
                                        return (
                                            <div style={{
                                                fontSize: 30,
                                                textAlign: 'center',
                                                color: 'white',
                                                padding: '20px 0',
                                                backgroundColor: '#43A047'
                                            }}>
                                                {rowData.first_name} {rowData.last_name}
                                            </div>
                                        )
                                    }
                                }
                            ]}
                            editable={{
                                onRowUpdate: async (newData, oldData) => {
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            resolve();
                                            const data = [...state.data];
                                            data[data.indexOf(oldData)] = newData;
                                            updateUser({ requestParams: newData })
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        getEmployees()
                                                    }
                                                }).catch(err => {
                                                    reject();
                                                    console.log(err);
                                                })
                                        }, 400);
                                    })
                                },
                                onRowAdd: async (newData) => {
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            resolve();
                                            addNewUser({ requestParams: newData })
                                                .then(res => {
                                                    console.log(res);
                                                    if (res.status === 200) {
                                                        getEmployees()
                                                    }
                                                }).catch(err => {
                                                    reject();
                                                    console.log(err);
                                                })
                                        }, 1000)
                                    })
                                },
                                onRowDelete: async (oldData) => {
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            resolve();
                                            deleteUser({ requestParams: oldData })
                                                .then(res => {
                                                    if (res.status === 200) {
                                                        getEmployees()
                                                    }
                                                }).catch(err => {
                                                    console.log(err)
                                                })
                                        }, 1000)
                                    })
                                }
                            }}
                        />
                        :
                        <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
                }
            </div>
        </div>
    )
}

export default MaterialTableCurd
