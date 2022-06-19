import React, { Component } from 'react';
import "./App.css";
import Barang from './container/barang';
import User from './container/user';
import Peminjaman from './container/peminjaman';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function BasicExample() {
  return (
    
    <Router>
      <nav class="navbar navbar-expand-lg bg-dark navbar-light d-none d-lg-block" id="templatemo_nav_top">
            <div class="container text-light">
                <div class="w-100 d-flex justify-content-between">
                    <div>
                        <i class="fa fa-envelope mx-2"></i>
                        <a class="navbar-sm-brand text-light text-decoration-none" href="#">Welcome to website</a>
                    </div>
                    <div>
                        {/* <button className="btn btn-success" onClick={this.handleLogout}>Logout</button> */}
                            
                    </div>
                </div>
            </div>
            </nav>
      <div class="  navbar-expand-lg navbar-light shadow align-self-center navbar-collapse  " id="templatemo_main_nav">

<div class="flex-fill">
    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
    <a class="navbar-brand text-success logo h2 align-self-center" href="#">
    Camp Ground Admin
  </a>
          <li  class="nav-item">
            <Link class="nav-link" to="/">Barang</Link>
          </li>
          <li  class="nav-item">
            <Link class="nav-link" to="/pengguna">User</Link>
          </li>
          <li  class="nav-item">
            <Link class="nav-link" to="/peminjaman">Peminjaman</Link>
          </li>
          
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <BarangHome />
          </Route>
          <Route path="/pengguna">
            <UserHome />
          </Route>
          <Route path="/peminjaman">
            <PeminjamanHome />
          </Route>
          
        </Switch>
      </div>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function BarangHome() {
  return (
    <Barang />
  );
}

function UserHome() {
  return (
    <User />
  );
}

function PeminjamanHome() {
  return (
   <Peminjaman />
  );
}
