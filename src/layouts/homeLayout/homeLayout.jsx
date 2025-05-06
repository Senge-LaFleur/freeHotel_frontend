import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/header.jsx'
import Login from '../../pages/auth/login/login.jsx'

export default function HomeLayout() {

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

    </>
  )
}
