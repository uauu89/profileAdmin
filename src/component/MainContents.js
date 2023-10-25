import { Component } from "react";
import styles from '../css/MainContents.module.css';
export default class MainContents extends Component{
 
    
    render(){
        return(
            <section className={styles.wrap}>
                <h2 className={styles.title}>프로필사이트 관리자 페이지</h2>
                <p>로그인 되었습니다.</p>
                <p>현재 로그인 유지시간은 30분입니다.</p>
            </section>
        )
    }
}