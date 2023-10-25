import React, { Component } from "react";
import styles from "../css/ModTagPage.module.css"
import ModTagItem from "./ModTagItem";
import NewTagItem from "./NewTagItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default class ModTagPage extends Component{

    state={
        list : this.props.tag.list,
        new : [],
        del : [],
        delSkill : [],
    }

    addNewTag = ()=>{
        let lastIdx = this.state.new.length ?
            this.state.new.map(i=>i.idx).at(-1):
            this.state.list.map(i=>i.idx).sort().at(-1);

        let template = {
            idx : lastIdx+1,
            name : "",
            color : "",
            colOrder : ""
        }
        this.setState({
            new : [...this.state.new, template]
            
        })
    }

    updateTag = (data)=>{
        let arr = this.state.list.map(i=>i.idx),
            idx = arr.indexOf(data.idx);

        let modItem = [...this.state.list];
        modItem[idx] = data;

        this.setState({
            list : modItem
        })
    }

    delTag = (e, name)=>{
        let modArray = this.state.list.filter(i=>i.idx !== e);
        let delArray = [...this.state.del, e];
        let delSkill = [...this.state.delSkill, name];
        

        this.setState({
            list : modArray,
            del : delArray,
            delSkill : delSkill,
        })
        

    }

    insertNewTag = (data)=>{
        let arr = this.state.new.map(i=>i.idx),
            idx = arr.indexOf(data.idx);

        let modItem = [...this.state.new];
        modItem[idx] = data;

        this.setState({
            new : modItem,
        })
        
    }
    delNewTag = (e) =>{
        let modArray = this.state.new.filter(i=>i.idx !== e);
        this.setState({
            new : modArray
        })
    }


    tagSubmit = (e)=>{
        e.preventDefault();

        this.props.sessionConfirm()
        .then(bool=>{
            if(bool){

                let originProps = [...this.props.tag.list];
                
                this.state.del.forEach(num=>{
                    originProps = [...originProps].filter(i=>i.idx !== num);
                })
                let modArray = this.state.list.filter((i, idx)=>JSON.stringify(i) !== JSON.stringify(originProps[idx]));

                let original = originProps.filter((i, idx)=>JSON.stringify(i) !== JSON.stringify(this.state.list[idx]));
                let reqData = {
                    new : this.state.new,
                    mod : modArray,
                    del : this.state.del,
                    delSkill : this.state.delSkill,
                    original : original,
                }

                fetch("http://101.101.211.45:8000/adminTagUpdate", {
                    method : "POST",
                    headers : {"Content-Type": "application/json"},
                    body : JSON.stringify(reqData)
                })
                .then(res=>res.json())
                .then(res=>{
                    if(res){
                        this.props.getData();
                        alert("수정되었습니다");
                    }
                })

            }else{
                alert("세션이 만료되었습니다.");
                window.location.href= "/";
            }
        })
    }
    
    componentDidUpdate(prevProps){
        if(JSON.stringify(this.props.tag) !== JSON.stringify(prevProps.tag)){
            this.setState({
                ...this.props.tag
            })
        }
    }

    render(){
        return(
            <section className={styles.wrap}>
                <h2 className="hidden">태그 리스트 수정페이지</h2>
                <form method="POST" className={styles.form} onSubmit={this.tagSubmit}>

                    <div className={styles.listWrap}>
                        <div id="tagList" className={styles.list} >
                            {this.state.list.map(i=>
                                <ModTagItem key={i.idx} data={i} updateTag={this.updateTag} delTag={this.delTag}/>
                                )
                            }
                            {this.state.new.map(i=>
                                <NewTagItem key={i.idx} data={i} insertNewTag={this.insertNewTag} delNewTag={this.delNewTag} />
                                )
                            }

                        
                        </div>
                        <button type="button"
                            className={styles.btnInputAdd}
                            onClick={()=>this.addNewTag()}
                        >
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </button>
                    </div>

                    <div className={styles.btnWrap}>
                        <button
                            type="button"
                            className={`${styles.btnStyle} ${styles.btnUndo}`}
                            disabled = {JSON.stringify(this.state) === JSON.stringify(this.props.tag)}
                            onClick={()=>{
                                this.setState({
                                    list : this.props.tag.list,
                                    new : [],
                                    del : [],
                                    delSkill : [],
                                })
                                }
                            }
                        >
                            되돌리기
                        </button>

                        <button
                            type="submit"
                            className={`${styles.btnStyle} ${styles.btnSubmit}`}
                            disabled = {JSON.stringify(this.state) === JSON.stringify(this.props.tag)}
                        >
                            수정
                        </button>
                    </div>


                </form>
            </section>
        )
    }
}

