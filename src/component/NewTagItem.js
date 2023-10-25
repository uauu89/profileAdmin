import { Component } from "react";
import styles from "../css/ModTagItem.module.css"
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class NewTagItem extends Component{
    state= {
        idx : this.props.data.idx,
        name : this.props.data.name,
        color : this.props.data.color,
        colOrder : this.props.data.colOrder,
    }

    changeColor(value){
        document.querySelector("#colorPicker_"+this.props.data.idx).value = value;
        this.setState({color : value});
    }
    changeColorPicker(value){
        document.querySelector("#color_"+this.props.data.idx).value = value;
        this.setState({color : value});
    }

    componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
            this.props.insertNewTag(this.state);
        }
    }
       
    render(){
        return(
            <div className={styles.rows} data-type="insert">
                <span
                    id={"tagDemo_"+this.props.data.idx}
                    className={styles.tagDemo}
                    style={{backgroundColor : this.state.color}}
                >
                    {this.state.name}
                </span>
                <input type="hidden" name="idx" readOnly
                    id={"idx_"+this.props.data}
                    value={this.props.data.idx}
                >
                </input>
                <input type="text" name="name" placeholder="언어명"
                    id={"name_"+this.props.data.idx}
                    className={`${styles.inputStyle} ${styles.inputName}`}
                    defaultValue={this.state.name}
                    onChange={e=>{this.setState({name : e.currentTarget.value});}}
                >
                </input>
                <div className={styles.inputColorGroup}>
                    <input type="text" name="color" placeholder="#000000"
                        id={"color_"+this.props.data.idx}
                        className={`${styles.inputStyle} ${styles.inputColor}`}
                        defaultValue={this.state.color}
                        onChange={e=>{this.changeColor(e.currentTarget.value);}}
                    >
                    </input>
                    <input type="color" name="colorPicker" tabIndex="-1"
                        id={"colorPicker_"+this.props.data.idx}
                        className={styles.inputPicker}
                        defaultValue={this.state.color}
                        onChange={e=>{this.changeColorPicker(e.currentTarget.value);}}
                    >
                    </input>
                </div>
                <input type="number" name="colOrder" placeholder="0"
                    id={"colOrder_"+this.props.data.idx}
                    className={`${styles.inputStyle} ${styles.inputColOrder}`}
                    onChange={e=>{this.setState({colOrder : e.currentTarget.value});}}
                >
                </input>
                <button type="button"
                    id={"btn_del_"+this.props.data.idx}
                    className={styles.btnDel}
                    data-idx={this.props.data.idx}
                    onClick={()=>{this.props.delNewTag(this.props.data.idx);}}
                >
                    <FontAwesomeIcon icon={faX}/>
                </button>
            </div>
        )
    }

}