import React,{ Component }  from 'react'
import  './draw_item.scss'

export default class  DrawItem extends Component {
    constructor(props) {
        super(props)   
        this.state={
            LastLoc:{
                x:0,
                y:0
            },
            isMouseDown:0,
            cPushArray:[],
            cStep:-1,
            scrollTop:0
        }
    }
    // canvas 涂鸦
    handleCanvasStart(e){
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        document.body.style.overflow='hidden'
        let LastLoc = this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY); 
        this.setState({
            isMouseDown:1,
            LastLoc:LastLoc,
            scrollTop:scrollTop
        })
    }   

    handleCanvasMove(e){
        let canvas=document.getElementById('canvas')
        let context=canvas.getContext('2d');
        if (this.state.isMouseDown) {
            let curLoc = this.windowToCanvas(e.touches[0].pageX, e.touches[0].pageY); //得到当前鼠标点击的坐标
            context.beginPath();
            context.moveTo(this.state.LastLoc.x, this.state.LastLoc.y);
            context.lineTo(curLoc.x, this.state.LastLoc.y);
            context.lineWidth = this.props.pen_size;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.strokeStyle = this.props.pen_color;
            context.stroke();
        }
    }

    handleCanvasEnd(e){
        let canvas=document.getElementById('canvas')
        let cStep = this.state.cStep;
        cStep++
        let cPushArray = this.state.cPushArray;
        cPushArray.push(canvas.toDataURL());
        this.setState({
            isMouseDown:0,
            cStep:cStep,
            cPushArray:cPushArray
        })
    }

    handleUndo(){
        var canvas=document.getElementById('canvas')
        var context=canvas.getContext('2d')
        let cStep = this.state.cStep
        let cPushArray = this.state.cPushArray
        if (cStep > 0) {
            cStep--;
            var canvasPic = new Image();
            canvasPic.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(canvasPic, 0, 0);
            }
            canvasPic.src = cPushArray[cStep];
            cPushArray.pop();
            this.setState({
                cPushArray:cPushArray,
                cStep:cStep
            })
        }else{
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.setState({
                cPushArray:[],
                cStep:-1
            })
        }
    }

    handClear(){
        var canvas=document.getElementById('canvas')
        var context=canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    windowToCanvas(x, y) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        let bbox = this.refs.canvas.getBoundingClientRect(); //拿到canvas的包围盒
        return {
            x: Math.round(x - bbox.left),
            y: Math.round(y - bbox.top-scrollTop)
        };
    }
 

    render() {
        return (
            <div>
                <canvas ref="canvas" id="canvas" width="375" height={this.props.height} onTouchStart={this.handleCanvasStart.bind(this)} onTouchMove={this.handleCanvasMove.bind(this)} onTouchEnd={this.handleCanvasEnd.bind(this)}></canvas>
                    <div id="canvas_btn" className="tools_container">
                        <div className="prev" onClick={this.handleUndo.bind(this)}>
                            <img src={require("images/prev_btn.png")} />
                            <p>撤消</p>
                        </div>
                        <div className="clear" onClick={this.handClear.bind(this)} >
                            <img src={require("images/clear_btn.png")} />
                            <p>清空</p>
                        </div>
                    </div>
            </div>
        )
    }       
}
 