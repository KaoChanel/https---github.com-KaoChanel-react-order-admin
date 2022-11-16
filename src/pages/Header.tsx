import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from './../store/reducers/authSlice';
import { Select } from 'antd';

const Header = () => {
    const dispatch = useDispatch();
    const navigator = useNavigate();
    const [selectedCompany, setSelectedCompany] = useState(localStorage.getItem('company') ?? 'BIO');
    const companies = [
        { name: 'BioScience Animal Health PCL', value: 'BIO' },
        { name: 'Nutrition Ingredient Company', value: 'NIC' },
        { name: 'Pro Test Kit', value: 'PTK' },
        { name: 'PedEx', value: 'PEDEX' },
    ]

    const logOut = () => {
        dispatch(logoutUser());
        navigator('/');
    }

    /// for HTMl select.
    const handleCompanySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCompany(event.target.value);
        localStorage.setItem('company', event.target.value);
    }

    /// for Ant Design Select component.
    const handleChange = (value: string) => {
        setSelectedCompany(value);
        localStorage.setItem('company', value);
        console.log(`selected ${value}`);

        window.location.reload();
      };

    return (
        <nav className="navbar navbar-expand">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#"><img src='./images/bis_logo.png' alt='Logo' width='100' /> SmartSales BIS</Link>

                <div className="navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Link</Link>
                        </li>
                        {/* <ul className="navbar-nav">
                            <li className="nav-item">
                                <button
                                    onClick={ }
                                    type="button"
                                    className="nav-link"
                                >
                                    <i className="fas fa-bars" />
                                </button>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <Link to="/" className="nav-link">
                                    {t<string>('header.label.home')}
                                </Link>
                            </li>
                            <li className="nav-item d-none d-sm-inline-block">
                                <Link to="/" className="nav-link">
                                    {t<string>('header.label.contact')}
                                </Link>
                            </li>
                        </ul> */}
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 me-2">
                        <li className="nav-item">
                            {/* <Select className="form-select" size='large' onChange={handleCompanySelect}
                            options={companies.map((e, i) => [{value: e.value, label: e.name}])} /> */}
                                {/* {
                                    companies.map((e, i) => <option key={i} value={e.value}>{e.name}</option>)
                                }
                            </Select> */}
                            <Select defaultValue={selectedCompany} style={{ width: 200 }} onChange={handleChange}
                            options={ companies.map(e => ({ label: e.name, value: e.value })) }
                            ></Select>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className='fa-regular fa-gear'></i>
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><Link className="dropdown-item" to="#">Profile</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item red" to="#" onClick={logOut}>Log Out</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header