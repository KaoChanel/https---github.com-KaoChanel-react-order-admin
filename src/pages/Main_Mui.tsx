import React from 'react'
// import Header from './Header';
// import Footer from './Footer';
// import {Select, Button, Table} from 'antd';
// import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
// import type { FilterValue, SorterResult } from 'antd/es/table/interface';

// import IconButton from '@mui/material/IconButton';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import LastPageIcon from '@mui/icons-material/LastPage';

// const getContainerClasses = useCallback(() => {
//   let classes = `main-header navbar navbar-expand ${navbarVariant}`;
//   if (headerBorder) {
//     classes = `${classes} border-bottom-0`;
//   }
//   return classes;
// }, [navbarVariant, headerBorder]);

// interface TablePaginationActionsProps {
//   count: number;
//   page: number;
//   rowsPerPage: number;
//   onPageChange: (
//     event: React.MouseEvent<HTMLButtonElement>,
//     newPage: number,
//   ) => void;
// }

// interface Column {
//   id: 'name' | 'calories' | 'fat';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// interface DataType {
//   name: {
//     first: string;
//     last: string;
//   };
//   gender: string;
//   email: string;
//   login: {
//     uuid: string;
//   };
// }

// const columns: ColumnsType<DataType> = [
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     sorter: true,
//     render: name => `${name.first} ${name.last}`,
//     width: '20%',
//   },
//   {
//     title: 'Gender',
//     dataIndex: 'gender',
//     filters: [
//       { text: 'Male', value: 'male' },
//       { text: 'Female', value: 'female' },
//     ],
//     width: '20%',
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//   },
// ];

// const columns: readonly Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   // { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'calories',
//     label: 'Calories',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'fat',
//     label: 'Fat',
//     // label: 'Fat\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
// ];

// function createData(name: string, calories: number, fat: number) {
//   return { name, calories, fat };
// }

// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
//   createData('Loaker cocoa wafers', 230, 12.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

// const Main = () => {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const handleChangePage = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number,
//   ) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeOrderStatus = () => {

//   }

//   return (
//     <>
//       <Header />
//       <main className='container p-4'>
//         <div className="row">
//           <div className="col"><h4>คำสั่งขาย (Sales Orders)</h4></div>
//           <div className="col text-end">
//             <Button type='primary'>Export</Button>
//           </div>
//         </div>
//         <section className="content">
//           <div className="row pt-2 pb-2">
//             <div className="col-lg-3 col-6">
//               <div className="small-box bg-info">
//                 <div className="inner">
//                   <h3>150</h3>

//                   <p>New Orders</p>
//                 </div>
//                 <div className="icon">
//                   <i className="ion ion-bag" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-3 col-6">
//               <div className="small-box bg-success">
//                 <div className="inner">
//                   <h3>
//                     53<sup style={{ fontSize: '20px' }}>%</sup>
//                   </h3>

//                   <p>Bounce Rate</p>
//                 </div>
//                 <div className="icon">
//                   <i className="ion ion-stats-bars" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-3 col-6">
//               <div className="small-box bg-warning">
//                 <div className="inner">
//                   <h3>44</h3>

//                   <p>User Registrations</p>
//                 </div>
//                 <div className="icon">
//                   <i className="ion ion-person-add" />
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-3 col-6">
//               <div className="small-box bg-danger">
//                 <div className="inner">
//                   <h3>65</h3>

//                   <p>Unique Visitors</p>
//                 </div>
//                 <div className="icon">
//                   <i className="ion ion-pie-graph" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         <div className="row pb-4">
//           <div className="col">
//             <TextField
//               label="Keyword"
//               id="outlined-size-small"
//               defaultValue=""
//               size="small"
//             />
//           </div>
//           <div className="col">
//             <Select
//               defaultValue="lucy"
//               style={{ width: 120 }}
//               // onChange={handleChange}
//               options={[
//                 {
//                   value: 'jack',
//                   label: 'Jack',
//                 },
//                 {
//                   value: 'lucy',
//                   label: 'Lucy',
//                 },
//                 {
//                   value: 'disabled',
//                   disabled: true,
//                   label: 'Disabled',
//                 },
//                 {
//                   value: 'Yiminghe',
//                   label: 'yiminghe',
//                 },
//               ]}
//             />
//           </div>
//           <div className="col">
//             <FormControl sx={{ minWidth: 120 }} size="small">
//               <InputLabel id="demo-select-small">Age</InputLabel>
//               <Select
//                 labelId="demo-select-small"
//                 id="demo-select-small"
//                 value={''}
//                 label="กำลังดำเนินการ"
//                 onChange={handleChangeOrderStatus}
//               >
//                 <MenuItem value="">
//                   <em>None</em>
//                 </MenuItem>
//                 <MenuItem value={10}>Ten</MenuItem>
//                 <MenuItem value={20}>Twenty</MenuItem>
//                 <MenuItem value={30}>Thirty</MenuItem>
//               </Select>
//             </FormControl>
//           </div>
//         </div>
//         <div className="row">
//         <Table
//       columns={columns}
//       rowKey={record => record.login.uuid}
//       dataSource={data}
//       pagination={tableParams.pagination}
//       loading={loading}
//       onChange={handleTableChange}
//     />
//         </div>
//       </main>

//       <Footer />
//     </>
//   )
// }

// export default Main