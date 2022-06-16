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
      <div>
        <ul>
          <li>
            <Link to="/">Barang</Link>
          </li>
          <li>
            <Link to="/pengguna">User</Link>
          </li>
          <li>
            <Link to="/peminjaman">Peminjaman</Link>
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
