/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { getCategories, getPackage, getTermination, getInventoryItems} from '../services/APIservice';
import {
    Page,
    PageHeader,
    PageHeaderTools,
    PageSidebar,
    PageSection,
    PageSectionVariants,
    Nav,
    NavItem,
    NavList,
    Brand,
    InputGroup,
    Alert,
    Text,
    AlertActionCloseButton,
    AlertGroup,
    AlertVariant,
    NavExpandable
  } from '@patternfly/react-core';
  import './Layout.css';
  import './input.tsx'
import InputInventory from "./input";
import OutputInventory from "./output";
import ReportInventory from "./report";
import Supplier from "./Supplier";
import Customer from "./Customer";
import Dashboard from "./Dashboard";
import { Context } from "src/store/store";
import Inventory from "./InventoryView";

  type NavigationBarProps = {
    Company: string;
    setisNavO: () => void;
    isNavO : boolean;

  };
  
  const HeaderBar = ({ Company, setisNavO, isNavO}: NavigationBarProps) => {
    const logo = (<Brand src={process.env.PUBLIC_URL + '/inpetlogo.png'} alt="Logo" />)
    return (<PageHeader  isNavOpen={isNavO} showNavToggle logo={logo} onNavToggle={setisNavO}><h1 className='font-face-gm'>Inpet Private Limited</h1></PageHeader>);
  };


  
const Layout = () => {

  const {state, dispatch} = useContext(Context)
    const [isNavO, setisNavO] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    
    useEffect(()=>{
      getInventoryItems().then((res) => {
        if(res.code === 200){
            console.log(res.data)
            dispatch({ type: "SET_INV", data: res.data });
        }else {
          dispatch({ type: "SET_ERROR", data: res });
          }
    });
      getCategories().then((res) => {
          if(res.code === 200){
              console.log(res.data)
              dispatch({ type: "SET_CAT", data: res.data });
          }else {
            dispatch({ type: "SET_ERROR", data: res });
            }
      });
      getTermination().then((res) => {
        if(res.code === 200){
            console.log(res.data)
            dispatch({ type: "SET_TER", data: res.data });
        }else {
          dispatch({ type: "SET_ERROR", data: res });
          }
    });
    getPackage().then((res) => {
      if(res.code === 200){
          console.log(res.data)
          dispatch({ type: "SET_PKG", data: res.data });
      }else {
        dispatch({ type: "SET_ERROR", data: res });
        }
  });
  },[dispatch]);


    function onNavToggle(){
        setisNavO(!isNavO);
    }
    function onSelect(result) {
        setActiveItem(result.itemId)
    }
    const Header = <HeaderBar setisNavO={onNavToggle} isNavO={isNavO} Company={'Inpet'} />;
    const nav = (<Nav onSelect={onSelect}>
        <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} ><Link to ="/">Dashboard</Link></NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} ><Link to ="/supplier">Supplier Master</Link></NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} ><Link to ="/customer">Customer Master</Link></NavItem>
        <NavExpandable title="Inventory" srText="Inventory" groupId="grp-1" isExpanded>
          <NavItem itemId={3} isActive={activeItem === 3} ><Link to ="/inventory">Entry</Link></NavItem>
          <NavItem itemId={4} isActive={activeItem === 4} ><Link to ="/inventory/view">View</Link></NavItem>
        </NavExpandable>
          
          <NavItem itemId={5} isActive={activeItem === 5}><Link to ="/report" >Report</Link></NavItem>
          <NavItem itemId={6} isActive={activeItem === 6}><Link to ="/output" >Search</Link></NavItem>
        </NavList>
        
        
      </Nav>)
      
      const sidebar = (<PageSidebar  nav={nav} isNavOpen={isNavO} />)
    return (
        <Page className='mynav' sidebar={sidebar} header={Header}>
      <PageSection isFilled hasOverflowScroll hasShadowTop type="default" variant="light" >
      <h1 className="font-face-gm">INPET PRIVATE LIMITED</h1>
      <br />
      <AlertGroup isToast isLiveRegion>
          {state.alerts.map(({key, variant, title, details}) => (
            <Alert
            //isExpandable
              variant={AlertVariant[variant]}
              title={title}
              actionClose={
                <AlertActionCloseButton
                  title={title}
                  variantLabel={`${variant} alert`}
                  onClose={() => dispatch({ type: "REMOVE_Alert", data: key })}
                />
              }
              key={key} >
                {/* <Text>{details}</Text> */}
              </Alert>
          ))}
        </AlertGroup>
        <Switch>
        <Route exact path='/'><Dashboard /></Route>
        <Route exact path='/supplier'><Supplier /></Route>
        <Route exact path='/customer'><Customer /></Route>
        <Route exact path='/inventory'><InputInventory /></Route>
        <Route exact path='/report'><ReportInventory /></Route>
        <Route exact path='/output'><OutputInventory /> </Route>
        <Route exact path="/inventory/view"><Inventory /></Route>
        </Switch> 
      </PageSection>
    </Page>
    )
}

export default Layout;