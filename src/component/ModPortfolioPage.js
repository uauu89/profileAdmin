import { Component } from "react";
import styles from '../css/ModPortfolioPage.module.css';
import ModPortfolioList from "./ModPortfolioList";
import ModPortfolioForm from "./ModPortfolioForm";


export default class ModPortfolioPage extends Component{

    state = {
        tag : this.props.data.tag.list,
        pofol : this.props.data.pofol,
        menu : "list",
    }

    dummy = {
        idx : "",
        title : "",
        themeColor : "#DCEFE1",
        opacity : 20,
        imgSrc : "",
        skill : "",
        linkSite : "",
        linkGithub : "",
        linkFigma : "",
        dateStart : "",
        dateEnd : "",
        contents : "",
        colOrder : "",
    }

    setStatePofol = e => this.setState(e);

    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevProps.data.pofol) !== JSON.stringify(this.props.data.pofol)){
            this.setState({
                tag : this.props.data.tag.list,
                pofol : this.props.data.pofol,
                menu: "list"
            })
        }
    }
    
    
    render(){
        return(
            <section className={styles.wrap}>
                <h2 className="hidden">포트폴리오 수정 목록 페이지</h2>
                {this.state.menu === "list" ?
                    <ModPortfolioList 
                        data={this.state} 
                        setStatePofol={this.setStatePofol}
                        setSelectedData={this.setSelectedData}
                        getData={this.props.getData}
                        sessionConfirm ={this.props.sessionConfirm}
                    /> :
                    <ModPortfolioForm
                        data={this.state.menu === "modify" ? this.state.modData : this.dummy}
                        tag={this.state.tag}
                        setStatePofol={this.setStatePofol} 
                        getData={this.props.getData}
                        sessionConfirm ={this.props.sessionConfirm}
                    />
                }
            </section>
        )
    }

}