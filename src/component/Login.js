import { Component } from "react";
import cookie from 'react-cookies';
import styles from "../css/Login.module.css"

export default class Login extends Component{

    Login = (e)=>{
        e.preventDefault();
        let data ={
            ID : document.querySelector("#inputID").value,
            PW : document.querySelector("#inputPW").value,
        }
        fetch("http://101.101.211.45:8000/adminLogin", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify(data),
            
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.match){
                this.props.Login(true);
                const maxAge = 30 * 60;
                cookie.save("0", res.data[0], {path : "/", maxAge});
                cookie.save("1", res.data[1], {path : "/", maxAge});
            }else{
                alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다.");
            }
        });
    }


    render(){
        return(
            <section className={styles.wrap}>
                <h2 className="hidden">관리자 로그인 페이지</h2>
                <form method="POST" className={styles.form} onSubmit={this.Login}>
                    <ul>
                        <li className={styles.inputWrap}>
                            <label htmlFor="inputID" className={styles.label}>아이디</label>
                            <input type="text" id="inputID" name="inputID" className={styles.input} ></input>
                        </li>
                        <li className={styles.inputWrap}>
                            <label htmlFor="inputPW" className={styles.label}>비밀번호</label>
                            <input type="password" id="inputPW" name="inputPW" className={styles.input}></input>
                        </li>
                    </ul>
                    <button 
                        type="submit"
                        className={styles.btn_login}
                    >
                        로그인
                    </button>
                </form>
            </section>
        )
    }
}