import { Component } from "react";
import styles from '../css/ModPortfolioForm.module.css';

export default class ModPortfolioForm extends Component{

    state={
        pofol : this.props.data,
        tag : this.props.tag,
        newImg : {
            file : "",
            name : "",
            src : "",
        }
    }

    pofolSubmit = e=>{
        e.preventDefault();

        this.props.sessionConfirm()
        .then(bool=>{
            if(bool){
                let reqData = new FormData();
                reqData.append("pofol", JSON.stringify(this.state.pofol))
                reqData.append("file", this.state.newImg.file)

                fetch("http://101.101.211.45:8000/adminPofolUpsert", {
                    method : "POST",
                    body : reqData
                })
                .then(res=>res.json())
                .then(res=>{
                    if(res){
                        this.props.getData();
                        alert("수정되었습니다");
                        this.props.setStatePofol({
                            menu : "list"
                        })
                    }
                });
            }else{
                alert("세션이 만료되었습니다.");
                window.location.href= "/";
            }
        })
    }

    render(){
        let arraySkill = this.state.pofol.skill.split(",");
        arraySkill.pop();
        return(
            <>
                <form method="POST" encType="multipart/form-data" className={styles.listWrap} onSubmit={this.pofolSubmit}>
                    <input type="hidden" idx="idx" readOnly value={this.state.pofol.idx}></input>
                    <ul className={styles.list} >
                        <li className={`${styles.grid} ${styles.tp2col}`}>
                            <div className={styles.grid}>
                                <p className={styles.label}>제목</p>
                                <input type="text" id="title"
                                    className={styles.inputCommonStyle}
                                    value={this.state.pofol.title}
                                    onChange={e=>this.setState({
                                        pofol : {
                                            ...this.state.pofol,
                                            title : e.currentTarget.value
                                        }
                                    })}
                                />
                            </div>
                            <div className={styles.grid}>
                                <p className={styles.label}>노출순서</p>
                                <input type="input" id="colOrder"
                                    className={styles.inputCommonStyle}
                                    value={this.state.pofol.colOrder}
                                    onChange={e=>this.setState({
                                        pofol : {
                                            ...this.state.pofol,
                                            colOrder : e.currentTarget.value
                                        }
                                    })}
                                />
                            </div>
                        </li>

                        <li className={styles.grid}>
                            <p className={styles.label}>기술스택</p>
                            <ul className={styles.tagWrap}>
                                {this.state.tag.map((i, idx) => 
                                    <li key={idx} className={styles.checkWrap}>
                                        <input 
                                            type="checkbox"
                                            id={"check_"+i.name}
                                            value={i.name}
                                            checked={Boolean(arraySkill.find(c => c === i.name))}
                                            onChange={e=>{
                                                let domList = document.querySelectorAll("input[type=checkbox]:checked"),
                                                    stateSkill = "";

                                                if(domList.length){
                                                    domList.forEach(i=>{
                                                        stateSkill += `${i.value},`
                                                    })
                                                }
                                                this.setState({
                                                    pofol:{
                                                        ...this.state.pofol,
                                                        skill : stateSkill
                                                    }
                                                })
                                                
                                            }}
                                        />
                                        <label 
                                            htmlFor={"check_"+i.name}
                                            className={styles.customCheckbox} 
                                        />
                                        <label 
                                            htmlFor={"check_"+i.name}
                                            className={styles.tagStyle}
                                            style={{backgroundColor : i.color}}
                                            defaultValue={i.name}
                                        >
                                            {i.name}
                                        </label>
                                    </li>
                                )}
                                
                            </ul>
                        </li>

                        <li className={styles.gridImgSec}>
                            <div className={`${styles.grid} ${styles.tp3col}`}>
                                <p className={styles.label}>썸네일</p>
                                <input type="file" id="img"
                                    className={styles.inputFile}
                                    onChange={e=>this.setState({
                                        newImg :{
                                            ...this.state.newImg,
                                            file : e.currentTarget.files[0]? e.currentTarget.files[0]: "",
                                            name : e.currentTarget.files[0]? e.currentTarget.files[0].name: "",
                                            src : e.currentTarget.files[0]? URL.createObjectURL(e.currentTarget.files[0]): ""
                                        }
                                    })}
                                /> 
                                <label htmlFor="img" className={styles.inputCommonStyle}>
                                    {this.state.newImg.name? 
                                        this.state.newImg.name:
                                        this.state.pofol.imgSrc?
                                            this.state.pofol.imgSrc: "등록된 파일이 없습니다"
                                    }
                                </label>
                                <label htmlFor="img" className={styles.inputFileButton}>파일선택</label>
                            </div>
                            <div className={`${styles.grid} ${styles.tp3col}`}>
                                <p className={styles.label}>메인컬러</p>
                                <input type="text" id="color"
                                    className={styles.inputCommonStyle}
                                    value={this.state.pofol.themeColor}
                                    onChange={e=>this.setState({
                                        pofol : {
                                            ...this.state.pofol,
                                            themeColor : e.currentTarget.value
                                        }
                                    })}
                                />
                                <input type="color" id="colorPicker"
                                    className={styles.colorPicker}
                                    value={this.state.pofol.themeColor}
                                    onChange={e=>this.setState({
                                        pofol : {
                                            ...this.state.pofol,
                                            themeColor : e.currentTarget.value
                                        }
                                    })}
                                />
     
                            </div>
                            <div className={`${styles.grid} ${styles.tp3col} ${styles.group_range}`}>
                                <p className={styles.label}>투명도</p>
                                <input type="range" id="range"
                                    style={{background : `linear-gradient(to right, var(--color_main) ${this.state.pofol.opacity}%, #fff ${this.state.pofol.opacity}%)`}}
                                    value={this.state.pofol.opacity}
                                    onInput={e=>this.setState({
                                        pofol : {
                                            ...this.state.pofol,
                                            opacity : e.currentTarget.value,
                                        }
                                    })}
                                />
                                <div className={styles.inputWrap}>
                                    <input type="number" id="inputRange" className={styles.inputRange} min="0" max="100" 
                                        value={this.state.pofol.opacity} 
                                        onChange={e=>this.setState({
                                            pofol : {
                                                ...this.state.pofol,
                                                opacity : e.currentTarget.value,
                                            }
                                        })}
                                    />
                                    <span className={styles.unit}>%</span>
                                </div>
                                </div>
                            <div className={`${styles.grid}`}>
                                <p className={styles.label}>기간</p>
                                <p className={`${styles.grid} ${styles.tpDate}`} >
                                    <input type="text" id="startDate" 
                                        className={styles.inputCommonStyle}
                                        value={this.state.pofol.dateStart}
                                        onChange={e=>this.setState({
                                            pofol : {
                                                ...this.state.pofol,
                                                dateStart : e.currentTarget.value
                                            }
                                        })}
                                    />
                                    <span className={styles.tilde}>~</span> 
                                    <input type="text" id="endDate"
                                        className={styles.inputCommonStyle}
                                        value={this.state.pofol.dateEnd}
                                        onChange={e=>this.setState({
                                            pofol : {
                                                ...this.state.pofol,
                                                dateEnd : e.currentTarget.value
                                            }
                                        })}
                                    />
                                </p>
                            </div>
                            <div className={styles.imgFrameWrap}>
                                <div
                                    className={styles.imgFrame}
                                    style={{backgroundColor : this.state.pofol.themeColor, opacity : this.state.pofol.opacity+"%"}}
                                />
                                <img alt=""
                                    src={this.state.newImg.src? 
                                            this.state.newImg.src:
                                            this.state.pofol.imgSrc? 
                                                this.state.pofol.imgSrc: "http://101.101.211.45:8000/img/defaultThumb.jpg"
                                    }
                                />
                            </div>
                        </li>

                        <li className={`${styles.grid} ${styles.tp3col}`}>
                            <p className={styles.label}>사이트 주소</p>
                            <input type="text" id="linkSite"
                                className={styles.inputCommonStyle}
                                value={this.state.pofol.linkSite}
                                onChange={e=>this.setState({
                                    pofol : {
                                        ...this.state.pofol,
                                        linkSite : e.currentTarget.value
                                    }
                                })}
                            />
                            <a href={this.state.pofol.linkSite}
                                target="_blank" rel="noopener noreferrer"
                                className={`${styles.link} ${this.state.pofol.linkSite? "" : styles.linkPrevent}`}
                            >
                                테스트 링크
                            </a>
                        </li>

                        <li className={`${styles.grid} ${styles.tp3col}`}>
                            <p className={styles.label}>깃허브 주소</p>
                            <input type="text" id="linkGithub"
                                className={styles.inputCommonStyle}
                                value={this.state.pofol.linkGithub}
                                onChange={e=>this.setState({
                                    pofol : {
                                        ...this.state.pofol,
                                        linkGithub : e.currentTarget.value
                                    }
                                })}
                            />
                            <a href={this.state.pofol.linkGithub}
                                target="_blank" rel="noopener noreferrer"
                                className={`${styles.link} ${this.state.pofol.linkGithub? "" : styles.linkPrevent}`}
                            >
                                테스트 링크
                            </a>
                        </li>

                        <li className={`${styles.grid} ${styles.tp3col}`}>
                            <p className={styles.label}>피그마 주소</p>
                            <input type="text" id="linkFigma"
                                className={styles.inputCommonStyle}
                                value={this.state.pofol.linkFigma}
                                onChange={e=>this.setState({
                                    pofol : {
                                        ...this.state.pofol,
                                        linkFigma : e.currentTarget.value
                                    }
                                })}
                            />
                            <a href={this.state.pofol.linkFigma}
                                target="_blank" rel="noopener noreferrer"
                                className={`${styles.link} ${this.state.pofol.linkFigma? "" : styles.linkPrevent}`}
                            >
                                테스트 링크
                            </a>
                        </li>

                        <li className={styles.grid}>
                            <p className={styles.label}>설명</p>
                            <textarea
                                id="contents"
                                className={`${styles.inputCommonStyle} ${styles.textarea}`} 
                                value={this.state.pofol.contents}
                                onChange={e=>this.setState({
                                    pofol : {
                                        ...this.state.pofol,
                                        contents : e.currentTarget.value
                                    }
                                })}
                            />
                        </li>
                    </ul>
                    <div className={styles.btnWrap}>
                        <button
                            type="button"
                            className={`${styles.btnStyle} ${styles.btnCancel}`}
                            onClick={()=>{this.props.setStatePofol({menu : "list"})}}
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className={`${styles.btnStyle} ${styles.btnSubmit}`}
                        >
                            완료
                        </button>
                    </div>
                </form>
            </>
        )
    }
}