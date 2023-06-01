
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard/dashboard';
import CreateDepartment from './pages/department/create-department';
import Department from './pages/department/department';
import EditDepartment from './pages/department/edit-department';
import ImportDepartment from './pages/department/import-department';
import ListDepartment from './pages/department/list-department';
import CreateEmployee from './pages/employee/create-employee';
import DetailEmployee from './pages/employee/detail-employee';
import EditEmployee from './pages/employee/edit-employee';
import Employee from './pages/employee/employee';
import ImportEmployee from './pages/employee/import-employee';
import ListEmployee from './pages/employee/list-employee';
import Home from './pages/home';
import Profile from './pages/profile/profile';
import CreateRole from './pages/role/create-role';
import EditRole from './pages/role/edit-role';
import ImportRole from './pages/role/import-role';
import ListRole from './pages/role/list-role';
import Role from './pages/role/role';

import Asset from './pages/asset/asset';
import CreateAsset from './pages/asset/create-asset';
import DetailAsset from './pages/asset/detail-asset';
import EditAsset from './pages/asset/edit-asset';
import ImportAsset from './pages/asset/import-asset';
import ListAsset from './pages/asset/list-asset';

function App() {
  return (
    <div className='flex'>
      <BrowserRouter>
        <Home />
        <Routes>
          <Route path='/' element={<Dashboard />} exact />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='department' element={<Department />} exact >
            <Route path='' element={<ListDepartment />} />
            <Route path='create' element={<CreateDepartment />} />
            <Route path='edit/:id' element={<EditDepartment />} />
            <Route path='import' element={<ImportDepartment />} />
          </Route>
          <Route path='role' element={<Role />} exact >
            <Route path='' element={<ListRole />} />
            <Route path='create' element={<CreateRole />} />
            <Route path='edit/:id' element={<EditRole />} />
            <Route path='import' element={<ImportRole />} />
          </Route>
          <Route path='employee' element={<Employee />} exact >
            <Route path='' element={<ListEmployee />} />
            <Route path='create' element={<CreateEmployee />} />
            <Route path='edit/:id' element={<EditEmployee />} />
            <Route path='detail/:id' element={<DetailEmployee />} />
            <Route path='import' element={<ImportEmployee />} />
          </Route>
          <Route path='asset' element={<Asset />} exact >
            <Route path='' element={<ListAsset />} />
            <Route path='create' element={<CreateAsset />} />
            <Route path='edit/:id' element={<EditAsset />} />
            <Route path='detail/:id' element={<DetailAsset />} />
            <Route path='import' element={<ImportAsset />} />
          </Route>
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
