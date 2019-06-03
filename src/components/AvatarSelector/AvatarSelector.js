import React, { Component } from 'react';
import Cropper from 'cropperjs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';


// custom import
import 'cropperjs/dist/cropper.min.css';
import './style.scss';
import Modal from '../PortalModal';
import FormLayoutVertical from '../FormLayoutVertical';
import Grid from '@material-ui/core/Grid';


class AvatarSelector extends Component{

  constructor(props){
    super(props);
    this.cropper = null;
  }

  state = {
    scaleX: 1,
    scaleY: 1,
    imageFile: null,
    tempFile: null
  }

  componentDidMount(){
    if(this.image){
      this.cropper = new Cropper(this.image, {
        aspectRatio: 1 / 1,
        autoCrop: true,
        zoomable:true,
        ready: () => {
          this.cropper.setCropBoxData({left: 0, top: 0, width: 250, height: 250});
        }
      });
    }
  }

  handleZoomIn = () => {
    console.log('handleZoomIn');
    const { cropper } = this;
    cropper && cropper.zoom(0.1);
  }

  handleZoomOut = () => {
    console.log('handleZoomOut');
    const { cropper } = this;
    cropper && cropper.zoom(-0.1);
  }

  handleMoveLeft = () => {
    console.log('handleMoveLeft');
    const { cropper } = this;
    cropper && cropper.move(-10, 0);
  }

  handleMoveRight = () => {
    console.log('handleMoveRight');
    const { cropper } = this;
    cropper && cropper.move(10, 0);
  }

  handleMoveUp = () => {
    console.log('handleMoveUp');
    const { cropper } = this;
    cropper && cropper.move(0, -10);
  }

  handleMoveDown = () => {
    console.log('handleMoveDown');
    const { cropper } = this;
    cropper && cropper.move(0, 10);
  }

  handleRotateLeft = () => {
    console.log('handleRotateLeft');
    const { cropper } = this;
    cropper && cropper.rotate(-45);
  }

  handleRotateRight = () => {
    console.log('handleRotateRight');
    const { cropper } = this;
    cropper && cropper.rotate(45);
  }

  handleFlipHorizontal = () => {
    console.log('handleFlipHorizontal');
    const { cropper } = this;
    const { scaleX } = this.state;
    cropper  && this.setState((prevState) => {
      let newScaleX = -prevState.scaleX;
      cropper.scaleX(newScaleX);
      return {scaleX: newScaleX};
    });
  }

  handleFlipVertical = () => {
    console.log('handleFlipVertical');
    const { cropper } = this;
    const { scaleY } = this.state;
    cropper  && this.setState((prevState) => {
      let newScaleY = -prevState.scaleY;
      cropper.scaleY(newScaleY);
      return {scaleY: newScaleY};
    });
  }

  handleCrop = () => {
    console.log('handleCrop');
    const { cropper } = this;
    const croppedImg = cropper && cropper.getCroppedCanvas({width: 100, height: 100}).toDataURL('image/jpeg');
    console.log(croppedImg);
  }

  handleClear = () => {
    console.log('handleClear');
    const { cropper } = this;
    cropper && cropper.clear();
  }

  handleClose = () => {
    if(this.props.handleClose) this.props.handleClose();
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('drop');
  }

  handleSelectFile = (e) => {
    e.preventDefault();
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = false;
    fileInput.click();
    fileInput.onchange = e => {
      this.setState({tempFile: e.path[0].files.item(0)}, () => {
        this.getObjectUrl();
      });
    };
  }

  goToCrop = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  clearCurrentFile = (e) => {
    e.preventDefault();
    this.setState({tempFile: null});
  }

  getObjectUrl = () => {
    const { tempFile } = this.state;
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log(this.previewImg);
      this.previewImg.src =  e.target.result;
    }
    reader.readAsDataURL(tempFile);
  }

  renderFileChooser = () => {

    const { tempFile } = this.state;

    return(
      <div className="FileChooser">
        <div className="Header">
          <Typography component="h3" variant="h4" align="center">Chọn file ảnh</Typography>
        </div>

        {
          tempFile ?
          <div className="Previewer">
            <img ref={(ref) => {this.previewImg = ref}} src="" alt="Previewer"/>
          </div>
          :
          <div className="DragDrop" onDrop={this.handleDrop} onClick={this.handleSelectFile}>
              <span className="fa fa-plus"></span>
              <i>Kéo thả ảnh vào đây hoặc chọn 1 ảnh từ máy tính...</i>
          </div>
        }

        <div className="ButtonControls">
          <button type="button" className="btn btn-success" onClick={this.goToCrop}>Ok, chọn hình này</button>
          <button type="button" className="btn btn-primary" onClick={this.clearCurrentFile}>Không, chọn lại</button>
        </div>
      </div>
    )
  }

  renderImageCropper = () => {
    return(
      <div className="ImageContent">
        <Typography component="h3" variant="h4" align="center">Ảnh đại diện</Typography>
        <img ref={(ref) => {this.image = ref}} className="Image" src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/tnc_48980557.jpg?crop=961,0,1928,2571&wid=600&hei=800&scl=3.21375"></img>
        <div className="Controls">
          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In" onClick={this.handleZoomIn}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;zoom&quot;, 0.1)">
                <span className="fa fa-search-plus"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out" onClick={this.handleZoomOut}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;zoom&quot;, -0.1)">
                <span className="fa fa-search-minus"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-method="move" data-option="-10" data-second-option="0" title="Move Left" onClick={this.handleMoveLeft}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, -10, 0)">
                <span className="fa fa-arrow-left"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="move" data-option="10" data-second-option="0" title="Move Right" onClick={this.handleMoveRight}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 10, 0)">
                <span className="fa fa-arrow-right"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="move" data-option="0" data-second-option="-10" title="Move Up" onClick={this.handleMoveUp}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 0, -10)">
                <span className="fa fa-arrow-up"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="move" data-option="0" data-second-option="10" title="Move Down" onClick={this.handleMoveDown}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;move&quot;, 0, 10)">
                <span className="fa fa-arrow-down"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left" onClick={this.handleRotateLeft}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;rotate&quot;, -45)">
                <span className="fa fa-rotate-left"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right" onClick={this.handleRotateRight}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;rotate&quot;, 45)">
                <span className="fa fa-rotate-right"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal" onClick={this.handleFlipHorizontal}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;scaleX&quot;, -1)">
                <span className="fa fa-arrows-h"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical" onClick={this.handleFlipVertical}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;scaleY&quot;, -1)">
                <span className="fa fa-arrows-v"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" data-method="crop" title="Crop" onClick={this.handleCrop}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;crop&quot;)">
                <span className="fa fa-check"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" data-method="clear" title="Clear" onClick={this.handleClear}>
              <span className="docs-tooltip" data-toggle="tooltip" data-animation="false" title="$().cropper(&quot;clear&quot;)">
                <span className="fa fa-remove"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  render(){

    const { imageFile } = this.state;

    return(
      <Modal className="CropAvatar">
        <div className="Wrapper">
          <FormLayoutVertical>
            <button type="button" className="btn btn-primary close-popup" title="Đóng" onClick={this.handleClose}>
              <span className="docs-tooltip" title="Đóng">
                <span className="fa fa-remove"></span>
              </span>
            </button>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                { imageFile ? this.renderImageCropper() : this.renderFileChooser() }
              </Grid>
            </Grid>
          </FormLayoutVertical>
        </div>
        <div className="OverLay"/>
      </Modal>
    )
  }
}

export default AvatarSelector;
