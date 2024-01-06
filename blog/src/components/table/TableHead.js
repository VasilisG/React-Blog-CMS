import React from 'react';
import { ORDER_ASC, ORDER_DESC } from '../posts/Constants';

const TableHead = ({columns, sortStatus, columnCallback}) => {

    const handleColumnClick = (column) => {
        if(column.sortable){
            if(sortStatus.sortField === column.value){
                if(sortStatus.sortOrder === ORDER_ASC){
                    columnCallback({
                        sortField: sortStatus.sortField,
                        sortOrder: ORDER_DESC
                     });
                }
                else {
                    columnCallback({
                        sortField: '',
                        sortOrder: ''
                     }); 
                }
            }
            else {
                columnCallback({
                    sortField: column.value,
                    sortOrder: ORDER_ASC
                })
            }
        }
    }

    return (
        <thead>
            <tr className="thead-row">
                {
                    columns.map((column, index) => 
                        <th 
                            key={index} 
                            className="col-2 text-center thead-col" 
                            scope="col"
                            onClick={() => handleColumnClick(column)}
                        >
                            {column.label}
                        </th>                        
                    )
                }
            </tr>
        </thead>
    )
}

export default TableHead;