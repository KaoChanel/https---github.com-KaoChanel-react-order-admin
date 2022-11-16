import React, { useState, useEffect, useCallback, ChangeEventHandler, ChangeEvent } from 'react'
import Header from './Header';
import Footer from './Footer';
import { Input, Select, Button, DatePicker, Table, Tag } from 'antd';
import {
  CheckCircleOutlined, 
  ClockCircleOutlined,
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';
import type { ColumnGroupType, ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue, SorterResult } from 'antd/es/table/interface';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
// import useApi from './../hooks/useApi';
import { Employees } from './../Interfaces/Employees';
import { OrderView } from './../Interfaces/OrderView';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue | null>;
}

const { RangePicker } = DatePicker;

const columns: ColumnsType<OrderView> = [
  {
    title: 'No.',
    dataIndex: 'rowKey',
    // sorter: true,
    align: 'center',
    width: '5%',
    sorter: (a, b) => a.rowKey! - b.rowKey!,
  },
  {
    title: 'Order Date',
    dataIndex: 'createTime',
    sorter: (a, b) => moment(a.createTime).unix() - moment(b.createTime).unix(),
    align: 'center',
    width: '10%',
    // render: item => moment(item).format('HH:mm:ss DD-MM-yyyy'),
    render(item, record) {
      return <span>{moment(item).format('HH:mm:ss')}<br/>{moment(item).format('DD-MM-yyyy')}</span>
    }
  },
  {
    title: 'Refernce No.',
    dataIndex: 'refNo',
    sorter: (a, b) => Number(a.refNo!.substring(12, a.refNo!.length)) - Number(b.refNo?.substring(12, b.refNo!.length))
  },
  {
    title: 'Employee',
    dataIndex: 'empName',
  },
  {
    title: 'Customer Name',
    dataIndex: 'custName',
  },
  {
    title: 'Net Total',
    dataIndex: 'netAmnt',
    align: 'right',
    sorter: (a, b) => a.netAmnt! - b.netAmnt!,
    render: item => new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumSignificantDigits: 3 }).format(item)
  },
  {
    title: 'Status',
    dataIndex: 'isTransfer',
    align: 'center',
    filterMultiple: true,
    filters: [
      { text: 'รอดำเนินการ', value: 'N' },
      { text: 'เข้าระบบแล้ว', value: 'Y' },
      { text: 'อนุมัติผ่าน', value: 'A' },
      { text: 'ยกเลิกเอกสาร', value: 'C' }
    ],
    onFilter: (value, record: OrderView) => record.isTransfer === value,
    // render(text, record) {
    //   return <span className="xxx">{text}</span>;
    // }
    render: row => row === 'N' ? <Tag color='warning' >รอดำเนินการ</Tag> 
    : row === 'Y' ? <Tag color='green'>เข้าระบบแล้ว</Tag> 
    : row === 'A' ? <Tag color='processing' icon={<CheckCircleOutlined />}>อนุมัติผ่าน</Tag> 
    : <Tag color='green' icon={<DeleteOutlined />}>ยกเลิกเอกสาร</Tag>
  },
];

const Main = () => {
  let dateFormat = 'YYYY-MM-DD';
  const [pendingOrders, setPendingOrders] = useState(0);
  const [data, setData] = useState<OrderView[]>([]);
  const [elements, setElements] = useState<OrderView[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateType, setDateType] = useState('ORDER');
  const [docType, setDocType] = useState('ALL');
  const [startDate, setStartDate] = useState(moment().format(dateFormat));
  const [endDate, setEndDate] = useState(moment().format(dateFormat));
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 25,
    },
  });

  const onChangeRangeDate: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);

      console.log('From: ', dates[0], ', to: ', dates[1]);
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
      console.log('Clear');
    }
  };

  const handleChangeDateType = (value: string) => {
    setDateType(value);
    fetchData();
    getPendingOrders();
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    let filterData = elements
    .filter(e => e.docuNo?.includes(event.target.value)
      || e.empName.includes(event.target.value)
      || e.custName.includes(event.target.value));

    if(event.target.value === ''){
      filterData = elements;
    }

    setData(filterData);
  }

  const fetchData = (() => {
      setLoading(true);
      fetch(`https://localhost:44395/api/SaleOrderHeader/GetSaleOrder/${localStorage.getItem('company')}/${dateType}/${startDate}/${endDate}`)
      // .then((res: any) => res.ok ? res.json() : Promise.reject())
      .then((respone: any) => respone.json())
      .then((jsonObject: any) => {

        for(let i = 0; i < jsonObject.length; i++) {
          jsonObject[i].rowKey = i+1;
        }

        console.log(localStorage.getItem('company'));
        setData(jsonObject);
        setElements(jsonObject);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data.length,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });

        setLoading(false);
      })
      // .finally(() => setLoading(false))
      .catch(() => setLoading(false));
  });

  const getPendingOrders = (() => {
    fetch(`https://localhost:44395/api/SaleOrderHeader/GetPendingOrder/${localStorage.getItem('company')}`)
    // .then((res: any) => res.ok ? res.json() : Promise.reject())
    .then((respone: any) => respone.json())
    .then((jsonObject: any) => {
      setPendingOrders(jsonObject.length);
    })
    .catch(() => setPendingOrders(0));
});

  const handleClickSearch = () => {
    fetchData();
    getPendingOrders();
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<OrderView> | SorterResult<OrderView>[],
  ) => {

    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  useEffect(() => {
    fetchData();
    getPendingOrders();
  }, []);

  return (
    <>
      <Header />
      <main className='container p-4'>
        <div className="row">
          <div className="col"><h4>คำสั่งขาย (Sales Orders)</h4></div>
          <div className="col text-end">
            <Button className='border-lime-500 text-lime-500 font-bold hover:text-white hover:bg-lime-500'>Export</Button>
          </div>
        </div>
        <section className="content">
          <div className="row pt-2 pb-2">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{data.length}</h3>

                  <p>Sales Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  {/* <h3>
                    53<sup style={{ fontSize: '20px' }}>%</sup>
                  </h3> */}
                  <h3>{data.filter(e => e.isTransfer === 'Y').length}</h3>

                  <p>Bounce Rate</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{data.filter(e => e.isTransfer === 'N').length} / {pendingOrders}</h3>

                  <p>Pending Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{data.filter(e => e.isTransfer === 'C').length}</h3>

                  <p>Cancel Orders</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="row pb-4">
          <div className="col-5">
            <Input
              placeholder="เลขที่เอกสาร, ชื่อพนักงานขาย, สถานะเอกสาร..."
              id="outlined-size-small"
              defaultValue=""
              size="large"
              className='hover:border-blue-800'
              onChange={handleSearch}
            />
          </div>
          <div className="col-3">
            <RangePicker size='large' defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]} onChange={onChangeRangeDate}/>
          </div>
          <div className="col-2">
            <Select
              size='large'
              defaultValue="ORDER"
              style={{ width: '100%' }}
              onChange={handleChangeDateType}
              options={[
                {
                  value: 'ORDER',
                  label: 'วันที่สั่งขาย',
                },
                {
                  value: 'DOCUMENT',
                  label: 'วันที่เอกสาร',
                },
              ]}
            />
          </div>

          {/* <div className="col-2">
            <Select
              size='large'
              defaultValue="ALL"
              style={{ width: '100%' }}
              // onChange={handleChange}
              options={[
                {
                  value: 'ALL',
                  label: 'ทั้งหมด',
                },
                {
                  value: 'N',
                  label: 'รอดำเนินการ',
                },
                {
                  value: 'Y',
                  label: 'เข้าระบบแล้ว',
                },
                // {
                //   value: 'disabled',
                //   disabled: true,
                //   label: 'Disabled',
                // },
                {
                  value: 'A',
                  label: 'อนุมัติผ่าน',
                },
                {
                  value: 'C',
                  label: 'ยกเลิกเอกสาร',
                },
              ]}
            />
          </div> */}
          <div className="col-2">
            <Button block size='large' className='bg-blue-800 text-white' icon={<SearchOutlined />} onClick={handleClickSearch}>Search</Button>
          </div>
        </div>
        <div className="row">
          <Table
            columns={columns}
            rowKey={record => record.rowKey}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
          />
        </div>
      </main>

      <Footer />
    </>
  )
}

export default Main

function dateFormat(item: any, arg1: string): React.ReactNode | import("rc-table/lib/interface").RenderedCell<Employees> {
  throw new Error('Function not implemented.');

}
function fetchWithTimeout(arg0: string, arg1: { setTimeout: number; }) {
  throw new Error('Function not implemented.');
}

