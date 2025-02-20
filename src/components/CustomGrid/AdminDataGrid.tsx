'use client';

/// Theme
import type { ColDef, RowSelectionOptions } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";

/// Core CSS
import { AgGridReact, CustomCellRendererProps } from "ag-grid-react";
import { useMemo, useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash2, User, UserCheck, UserCog } from "lucide-react";
import { dummyRowData } from "./GridData";
import { Status, TRow, UserRole } from "./GridDataTypes";

interface ThreeDotMenuProps {
    rowData: any;
    isEdit?: boolean;
    isView?: boolean;
    isDelete?: boolean;
    handleEdit?: (rowData: any) => void;
    handleView?: (rowData: any) => void;
    handleDelete?: (rowData: any) => void;
}

const ThreeDotMenu = ({
    rowData,
    isEdit = true,
    isView = true,
    isDelete = true,
    handleEdit,
    handleView,
    handleDelete
}: ThreeDotMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="p-2 rounded-md focus:outline-none">
                <MoreVertical className="size-5 cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="bg-white shadow-xl border rounded-xl">
                {isEdit && (
                    <DropdownMenuItem onClick={() => handleEdit?.(rowData)} className="flex items-center gap-2 cursor-pointer">
                        <Pencil className="size-4 text-blue-600" /> Edit
                    </DropdownMenuItem>
                )}
                {isView && (
                    <DropdownMenuItem onClick={() => handleView?.(rowData)} className="flex items-center gap-2 cursor-pointer">
                        <Eye className="size-4 text-gray-600" /> View
                    </DropdownMenuItem>
                )}
                {isDelete && (
                    <DropdownMenuItem onClick={() => handleDelete?.(rowData)} className="flex items-center gap-2 text-red-600 cursor-pointer">
                        <Trash2 className="size-4" /> Delete
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const getRoleIcon = (role: string) => {
    switch (role) {
        case UserRole.Admin:
            return <UserCog className="size-5 text-orange-600" />;
        case UserRole.Manager:
            return <UserCheck className="size-5 text-blue-600" />;
        default:
            return <User className="size-5 text-green-600" />;
    }
};

const getStatus = (status: string) => {
    switch (status) {
        case Status.Done:
            return "text-emerald-100 bg-emerald-600";
        case Status.Pending:
            return "text-yellow-100 bg-yellow-600";
        case Status.Canceled:
            return "text-red-100 bg-red-600";
        default:
            return "text-slate-200 bg-slate-600";
    }
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const roleIconRender = (params: CustomCellRendererProps) => {
    return (
        <div className="flex items-center gap-2">
            <span>{getRoleIcon(params?.value)}</span>
            <h1>{params?.value}</h1>
        </div>
    );
};

const statusRender = (params: CustomCellRendererProps) => {
    return (
        <div className="w-full h-full flex items-center">
            <h1 className={`min-w-[80px] h-[50%] flex justify-center items-center
            rounded-[5px] text-[12px] font-medium ${getStatus(params?.value)}`}>
                {params?.value}
            </h1>
        </div>
    );
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const AdminDataGrid = () => {
    /// Row Data
    const [rowData] = useState<TRow[]>(dummyRowData);

    /// Handlers for actions
    const handleEdit = (rowData: any) => {
        console.log("Edit clicked for:", rowData);
    };

    const handleView = (rowData: any) => {
        console.log("View clicked for:", rowData);
    };

    const handleDelete = (rowData: any) => {
        console.log("Delete clicked for:", rowData);
    };

    /// Column data
    const [colDefs] = useState<ColDef[]>([
        { field: "_id", hide: true },
        { 
            field: "name", 
            headerName: "Name", 
            flex: 1,
            tooltipField: 'name',
        },
        { 
            field: "email", 
            headerName: "Email", 
            flex: 1,
            tooltipField: 'email',
            filter: false
        },
        { 
            field: "phone", 
            headerName: "Phone No", 
            flex: 0.9,
            tooltipField: 'phone'
        },
        { 
            field: "registrationDate", 
            headerName: "Date", 
            flex: 0.6,
            tooltipField: 'registrationDate',
            filter: false
        },
        { 
            field: "online", 
            headerName: "Online", 
            flex: 0.5,
            tooltipValueGetter: (params) => {
                return params.value ? 'User is currently online' : 'User is offline';
            },
            filter: false
        },
        { 
            field: "role", 
            headerName: "Role", 
            flex: 0.8, 
            filter: false,
            cellRenderer: roleIconRender,
            tooltipValueGetter: (params) => {
                switch (params.value) {
                    case UserRole.Admin:
                        return 'Administrator - Full system access';
                    case UserRole.Manager:
                        return 'Manager - Limited administrative access';
                    default:
                        return 'User - Standard access';
                }
            }
        },
        { 
            field: "productStatus", 
            headerName: "Status", 
            flex: 0.6, 
            filter: false,
            cellRenderer: statusRender,
            tooltipValueGetter: (params) => {
                switch (params.value) {
                    case Status.Done:
                        return 'Product delivery completed';
                    case Status.Pending:
                        return 'Product delivery in progress';
                    case Status.Canceled:
                        return 'Product delivery canceled';
                    default:
                        return 'Unknown status';
                }
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 0.5,
            filter: false,
            cellRenderer: (params: CustomCellRendererProps) => (
                <ThreeDotMenu
                    rowData={params.data}
                    isEdit={true}
                    isView={true}
                    isDelete={true}
                    handleEdit={handleEdit}
                    handleView={handleView}
                    handleDelete={handleDelete}
                />
            ),
            sortable: false,
            tooltipValueGetter: () => 'Click for more actions',
        },
    ]);

    /// Active the filter and edit action props
    const defaultColDef = useMemo<ColDef>(() => {
        return { 
            filter: true, 
            editable: true,
            tooltipComponent: undefined, // Use default tooltip component
            tooltipShowDelay: 500, // Show tooltip after 500ms hover
        };
    }, []);

    /// Row selection props
    const rowSelection: RowSelectionOptions = {
        mode: "multiRow",
        headerCheckbox: true,
    };

    /// Any field particular value change
    const handleCellValueChange = (e: any) => {
        console.log(e, "++66");
    };

    /// Add Selected
    const handleSelectionChanged = (event: any) => {
        const selectedRows = event.api.getSelectedRows();
        const selectedIds = selectedRows.map((row: TRow) => row._id);
        console.log(selectedIds, "Selected _id values ++66");
    };

    const myTheme = themeQuartz.withParams({
        spacing: 12,
        accentColor: "#938bff",
        textColor: "#fff",
        backgroundColor: "#171821",
        borderColor: "#ffffff21",
        checkboxUncheckedBorderColor: "#fff",
        checkboxCheckedBorderColor: "transparent",
        oddRowBackgroundColor: "#1f2029",
    });

    return (
        <div className="w-full h-full">
            <div className="ag-theme-alpine w-full h-full">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    rowSelection={rowSelection}
                    pagination={true}
                    defaultColDef={defaultColDef}
                    onCellValueChanged={handleCellValueChange}
                    onSelectionChanged={handleSelectionChanged}
                    theme={myTheme}
                />
            </div>
        </div>
    );
};

export default AdminDataGrid;