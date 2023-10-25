import { Component } from "react";
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
// import cookie from 'react-cookies';

import ModTagPage from './ModTagPage';
import ModPortfolioPage from './ModPortfolioPage';
import styles from '../css/Main.module.css';
import MainContents from "./MainContents";

export default class Main extends Component{

    state = {
        menu : {
            port : false,
            tag : false,
        },
        load : false,
        tag : {
            list : [],
            new : [],
            del : [],
            delSkill : [],
        },
        pofol : [],
        
    }

    getData = ()=>{
        fetch("http://101.101.211.45:8000/adminGetData")
        .then(res=>res.json())
        .then(res=>{
            this.setState({
                load : true,
                tag : {
                    ...this.state.tag,
                    list : res[0]
                },
                pofol : res[1],
            })
        });
    }
    componentDidMount(){
        if(!this.state.load){
            this.getData();
        }
    }

    render(){
        return(
            <div className={styles.wrap}>
                <BrowserRouter>
                    <header className={styles.header}>
                        <h1 className="hidden">프로필사이트 관리페이지</h1>
                        <nav>
                            <ul className={styles.gnb}>
                                <li>
                                    <NavLink
                                        to="/admin/ModPortfolioPage"
                                        className={this.state.menu.port ? styles.active: ""}
                                        onClick={()=>{
                                            this.props.sessionConfirm()
                                            .then(bool=>{
                                                if(bool){
                                                    this.setState({menu : {tag : false, port:true}})
                                                }else{
                                                    alert("세션이 만료되었습니다.");
                                                    window.location.href= "/admin";
                                                }
                                            })
                                        }}
                                    >
                                        포트폴리오 관리
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/admin/ModTagPage"
                                        className={this.state.menu.tag ? styles.active: ""}
                                        onClick={()=>{
                                            this.props.sessionConfirm()
                                            .then(bool=>{
                                                if(bool){
                                                    this.setState({menu : {tag : true, port:false}})
                                                }else{
                                                    alert("세션이 만료되었습니다.");
                                                    window.location.href= "/admin";
                                                }
                                           })
                                        }}
                                    >
                                        태그리스트 관리
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        <NavLink 
                            to="/admin"
                            className={styles.btn_logOut}
                            onClick={()=>this.props.LogOut()}
                        >
                            로그아웃
                        </NavLink>
                    </header>
                    <Routes>
                        <Route path="/admin" element={<MainContents />} />
                        <Route 
                            path="/admin/ModTagPage"
                            element={
                                <ModTagPage 
                                    tag={this.state.tag}
                                    getData={this.getData}
                                    sessionConfirm ={this.props.sessionConfirm}
                                />
                            }>
                        </Route>
                        <Route 
                            path="/admin/ModPortfolioPage"
                            element={
                                <ModPortfolioPage
                                    data={this.state}
                                    getData={this.getData}
                                    sessionConfirm ={this.props.sessionConfirm}
                                />
                            }>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}
