import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';


const Table = ({tableColumns, tableData, sortStatus, entity, callback}) => {
    return (
        <div className="table-wrapper">
            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <TableHead 
                        columns={tableColumns} 
                        sortStatus={sortStatus}
                        columnCallback={callback}
                    />
                    <TableBody 
                        columns={tableColumns} 
                        data={tableData}
                        entity={entity}
                    />
                </table>
            </div>
        </div>
    )
}

export default Table;