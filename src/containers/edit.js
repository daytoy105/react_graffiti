import React, { Component }  from 'react'
import DrawItem from 'components/draw_item.js'

import './edit.scss'

export default  class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color_arr: ['#ff752f', '#ff0000', '#eadc00', '#00ea8f', '#0058ea', '#a000ea'], // 涂鸦
            px_arr: [5, 7.5, 10, 12.5, 15, 17.5],
            pen_color: 0,
            pen_size: 0,
            canvas_arr: [],
            canvas_heigth: 0,
            iscanvas: 1
        }
    }

    componentDidMount() {
        let heigth = document.body.clientHeight - parseInt(this.refs.tools_container.offsetHeight)
        this.setState({ canvas_heigth: heigth })
    }
    // canvas 涂鸦
    handlePenColor(i, e) {
        this.setState({ pen_color: i })
        for (let i in this.state.color_arr) {
            this.refs['pcolor_' + i].className = 'pan'
        }
        this.refs['pcolor_' + i].className = 'pan active'
        let strokeColor = this.state.color_arr[i]
        for (let i = 0; i < 6; i++) {
            this.refs['color_box' + i].style.background = strokeColor
        }
    }
    handlePenSize(i, e) {
        this.setState({ pen_size: i })
        for (let i in this.state.color_arr) {
            this.refs['psize_' + i].className = 'pan'
        }
        this.refs['psize_' + i].className = 'pan active'
    }
   
    render() {
        return (
            <div ref="edit_bg" className="edit_bg">
                <h1>Canvas 涂鸦</h1>
                <DrawItem height={this.state.canvas_heigth} pen_size={this.state.px_arr[this.state.pen_size]} pen_color={this.state.color_arr[this.state.pen_color]} line={this.state.showline}/>
                <div className="tools_container" ref="tools_container" >
                    <div className="column column_3">
                        <img src={require("images/xian.png")} />
                    </div>
                    <div className="column column_1">
                        <ul className="slide_box">
                        {
                            this.state.color_arr.map((col,i)=>(
                                <li key={i} ref={"pcolor_"+i} id={"pcolor_"+i} className={`pan ${i==0?'active':''}`} onClick={this.handlePenColor.bind(this,i)}><span className={"color"+(i+1)}></span></li>
                            ))
                        }
                        </ul>
                    </div>
                    <div className="column column_2">
                        <ul className="slide_box">
                        {
                            this.state.color_arr.map((col,i)=>(
                                <li key={i} ref={"psize_"+i} id={"psize_"+i} className={`pan ${i==0?'active':''}`} onClick={this.handlePenSize.bind(this,i)}><i className={"px"+(i+1)}><em><b ref={"color_box"+i}></b></em>{(i+2)*5}</i></li>
                            ))
                        }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }       
}
