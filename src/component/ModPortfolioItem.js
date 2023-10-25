import { Component } from "react";

import styles from "../css/ModPortfolioItem.module.css"

import { faLink, faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class ModPortfolioItem extends Component{

    state = {
        tag : this.props.tag,
        pofol : this.props.pofol,
        hover : false,
    }

    pofolDel = idx =>{
        fetch("http://localhost:8800/adminPofolDel", {
            method : "POST",
            headers : {"Content-Type": "application/json"},
            body : JSON.stringify({idx : idx})
        })
        .then(res=>res.json())
        .then(res=>{
            if(res){
                alert("삭제되었습니다");
                this.props.getData();
            }
        })
    }



    confirm_pofolDel = (e) => {
        let idx = e.value,
            targetParnet = e.closest("div[class*=hover]"),
            targetTitle = targetParnet.querySelector("h3").innerText;
        if(window.confirm(`'${targetTitle}'\n삭제하시겠습니까?`)){
            this.pofolDel(idx);
        }
    }

    componentDidUpdate(prevProps){
        if(JSON.stringify(prevProps.pofol) !== JSON.stringify(this.props.pofol)){
            this.setState({
                pofol : this.props.pofol
            })
        }
    }

    render(){
        let arraySkill = this.state.pofol.skill.split(",");
        arraySkill.pop();
        return(
            <div 
                className={`${styles.wrap} ${this.state.hover? styles.hover : ""}`}
                onMouseEnter={()=>this.setState({hover : true})}
                onMouseLeave={()=>this.setState({hover: false})}
            >
                <div className={styles.imgFrameWrap}>
                    <div
                        className={styles.imgFrame}
                        style={{backgroundColor : this.state.pofol.themeColor, opacity : this.state.pofol.opacity+"%"}}
                    />
                    <img alt=""
                        src={this.state.pofol.imgSrc? 
                            this.state.pofol.imgSrc: "http://101.101.211.45:8000/img/defaultThumb.jpg"
                        }
                    />
                </div>


                <h3 className={styles.title}>{this.state.pofol.title}</h3>
                <ul className={styles.tagWrap}>
                    {arraySkill.map((i, idx) => {
                        let color = this.state.tag.filter(c=>c.name === i)[0].color;
                        return(
                        <li
                            key={idx}
                            className={styles.tagStyle}
                            style={{backgroundColor : color}}
                        >
                            {i}
                        </li>
                        )
                    })}
                    
                </ul>
                <p className={styles.date}>
                    {this.state.pofol.dateStart? this.state.pofol.dateStart+" ~ ":""}{this.state.pofol.dateEnd}
                </p>
                <ul className={styles.linkWrap}>
                    <li>
                        <a href={this.state.pofol.linkSite} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLink} /> 사이트
                        </a>
                    </li>
                    <li>
                        <a href={this.state.pofol.linkGithub} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLink} /> 깃허브
                        </a>
                    </li>
                    <li>
                        <a href={this.state.pofol.linkFigma} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLink} /> 피그마
                        </a>
                    </li>
                </ul>
                <div className={styles.btnWrap}>
                    <button type="button" 
                        className={`${styles.btnStyle} ${styles.btnMod}`}
                        data={this.state}
                        onClick={()=>{
                            this.props.setStatePofol({
                                menu : "modify",
                                modData : this.state.pofol,
                            })
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />수정
                    </button>
                    <button type="button" 
                        className={`${styles.btnStyle} ${styles.btnDel}`}
                        value={this.state.pofol.idx}
                        onClick={e=>{
                            this.props.sessionConfirm()
                            .then(bool=>{
                                if(bool){
                                    this.confirm_pofolDel(e.target);
                                }else{
                                    alert("세션이 만료되었습니다.");
                                    window.location.href= "/";
                                }
                            })
                        }}
                    >
                        <FontAwesomeIcon icon={faX} />삭제
                    </button>
                    
                    
                </div>
            </div>
        )
    }
}
