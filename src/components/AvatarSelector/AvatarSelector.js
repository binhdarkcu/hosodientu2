import React, { Component } from 'react';
import Cropper from 'cropperjs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import Base64Binary from 'base64-arraybuffer';
import LazyLoad from 'react-lazy-load';


// custom import
import { INVALID_FILE_TYPE } from '../../constants/Messages';
import 'cropperjs/dist/cropper.min.css';
import './style.scss';
import Modal from '../PortalModal';
import FormLayoutVertical from '../FormLayoutVertical';
import Grid from '@material-ui/core/Grid';
import LoadingImage from '../../assets/images/loading.gif';

class AvatarSelector extends Component{

  constructor(props){
    super(props);
    this.cropper = null;
  }

  state = {
    scaleX: 1,
    scaleY: 1,
    imgURL: null,
    tempFile: null,
    avatar: '',
    showBackBtn: false
  }

  handleZoomIn = () => {
    const { cropper } = this;
    cropper && cropper.zoom(0.1);
  }

  handleZoomOut = () => {
    const { cropper } = this;
    cropper && cropper.zoom(-0.1);
  }

  handleMoveLeft = () => {
    const { cropper } = this;
    cropper && cropper.move(-10, 0);
  }

  handleMoveRight = () => {
    const { cropper } = this;
    cropper && cropper.move(10, 0);
  }

  handleMoveUp = () => {
    const { cropper } = this;
    cropper && cropper.move(0, -10);
  }

  handleMoveDown = () => {
    const { cropper } = this;
    cropper && cropper.move(0, 10);
  }

  handleRotateLeft = () => {
    const { cropper } = this;
    cropper && cropper.rotate(-45);
  }

  handleRotateRight = () => {
    const { cropper } = this;
    cropper && cropper.rotate(45);
  }

  handleFlipHorizontal = () => {
    const { cropper } = this;
    cropper  && this.setState((prevState) => {
      let newScaleX = -prevState.scaleX;
      cropper.scaleX(newScaleX);
      return {scaleX: newScaleX};
    });
  }

  handleFlipVertical = () => {
    const { cropper } = this;
    cropper  && this.setState((prevState) => {
      let newScaleY = -prevState.scaleY;
      cropper.scaleY(newScaleY);
      return {scaleY: newScaleY};
    });
  }

  handleCrop = () => {
    const { cropper } = this;
    const rawBase64Img = cropper && cropper.getCroppedCanvas({width: 100, height: 100}).toDataURL('image/jpeg');
    this.setState({avatar: rawBase64Img});
  }

  handleClear = () => {
    const { cropper } = this;
    cropper && cropper.clear();
  }

  handleClose = () => {
    if(this.props.handleClose) this.props.handleClose();
  }

  handleDragOver = e => {
    e.preventDefault();
  }

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const selectedFile = e.dataTransfer.files.item(0);
    const ext = selectedFile.name.split('.').pop() || 'undefined';
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'bmp'];
    allowedExtensions.indexOf(ext.toLowerCase()) > -1 ?
      this.setState({tempFile: e.dataTransfer.files.item(0)}, () => { this.getObjectUrl(); })
      :
      toast.error(INVALID_FILE_TYPE);
  }

  handleSelectFile = (e) => {
    e.preventDefault();
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = false;
    fileInput.accept = ".png, .jpg, .jpeg, .bmp";
    fileInput.click();
    fileInput.onchange = e => {
      const selectedFile = e.path[0].files.item(0);
      const ext = selectedFile.name.split('.').pop() || 'undefined';
      const allowedExtensions = ['png', 'jpg', 'jpeg', 'bmp'];
      allowedExtensions.indexOf(ext.toLowerCase()) > -1 ?
        this.setState({tempFile: e.path[0].files.item(0)}, () => { this.getObjectUrl(); })
        :
        toast.error(INVALID_FILE_TYPE);
    };
  }

  goToCrop = (e) => {
    e.preventDefault();
    const { tempFile } = this.state;
    if(tempFile) this.setState({imgURL: this.previewImg.src, tempFile: null, showBackBtn: true})
  }

  clearCurrentFile = (e) => {
    e.preventDefault();
    this.setState({tempFile: null});
  }

  getObjectUrl = () => {
    const { tempFile } = this.state;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewImg.src =  e.target.result;
    }
    reader.readAsDataURL(tempFile);
  }

  handleLoad = () => {
    if(this.image){
      this.cropper = new Cropper(this.image, {
        aspectRatio: 1 / 1,
        autoCrop: true,
        zoomable:true,
        ready: () => {
          // this.cropper.setCropBoxData({left: 0, top: 0, width: 250, height: 250});
        }
      });
    }
  }

  handleBack = () => {

    const { imgURL, avatar } = this.state;

    if(avatar){
      this.setState({avatar: ''});
      return;
    }

    if(imgURL){
      this.setState({imgURL: '', showBackBtn: false});
      this.cropper.destroy();
    }
  }

  updateAvatar = () => {
    const { avatar } = this.state;
    const strippedBase64Str = avatar.replace(/^data:image\/[a-z]+;base64,/, "");
    const arrayBuffer = Base64Binary.decode(strippedBase64Str);
    const uint8Array = new Uint8Array(arrayBuffer);
    const bytesArray = Array.from(uint8Array);
    if(this.props.updateAvatar) this.props.updateAvatar(bytesArray);
  }

  renderFileChooser = () => {

    const { tempFile } = this.state;

    return(
      <div className="FileChooser">
        <div className="Header">
          <Typography component="h3" variant="h4" align="center">Chọn file ảnh</Typography>
          <Typography component="span" align="center"><i>*Chỉ chấp nhận các file ảnh có định dạng *.jpg, *.jpeg, *.png, *.bmp, *.gif</i></Typography>
        </div>

        {
          tempFile ?
          <div className="Previewer">
            <LazyLoad height={250}>
              <img ref={(ref) => {this.previewImg = ref}} src={LoadingImage} alt="Previewer"/>
            </LazyLoad>

          </div>
          :
          <div className="DragDrop" onDragOver={this.handleDragOver} onDrop={this.handleDrop} onClick={this.handleSelectFile}>
              <span className="fa fa-plus"></span>
              <i>Kéo thả ảnh vào đây hoặc chọn 1 ảnh từ máy tính...</i>
          </div>
        }

        <div className="ButtonControls">
          <button type="button" className="btn btn-success" disabled={!tempFile} onClick={this.goToCrop}>Ok, chọn hình này</button>
          <button type="button" className="btn btn-primary" onClick={this.clearCurrentFile}>Không, chọn lại</button>
        </div>
      </div>
    )
  }

  renderImageCropper = () => {

    const { imgURL } = this.state;

    return(
      <div className="ImageContent">
        <div className="Header">
          <Typography component="h3" variant="h4" align="center">Ảnh đại diện</Typography>
          <Typography component="span" align="center"><i>*Tip: Rê chuột vào từng icon để hiển thị chức năng của từng nút bấm</i></Typography>
          <Typography component="span" align="center"><i>*Nếu khung cắt vượt ngoài ảnh đã chọn sẽ biến thành khoảng trắng/đen</i></Typography>
        </div>
        <div className="Cropper">
            <img ref={(ref) => {this.image = ref}} className="Image" src={imgURL} onLoad={this.handleLoad} alt="Crop avatar"></img>
        </div>
        <div className="Controls">
          <div className="btn-group">
            <button type="button" className="btn btn-primary" title="Phóng to" onClick={this.handleZoomIn}>
              <span title="Phóng to">
                <span className="fa fa-search-plus"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Thu nhỏ" onClick={this.handleZoomOut}>
              <span title="Thu nhỏ">
                <span className="fa fa-search-minus"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" title="Di chuyển ảnh sang trái" onClick={this.handleMoveLeft}>
              <span title="Di chuyển ảnh sang trái">
                <span className="fa fa-arrow-left"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Di chuyển ảnh sang phải" onClick={this.handleMoveRight}>
              <span title="Di chuyển ảnh sang phải">
                <span className="fa fa-arrow-right"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Di chuyển ảnh lên" onClick={this.handleMoveUp}>
              <span title="Di chuyển ảnh lên">
                <span className="fa fa-arrow-up"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Di chuyển ảnh xuống" onClick={this.handleMoveDown}>
              <span title="Di chuyển ảnh xuống">
                <span className="fa fa-arrow-down"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" title="Xoay ảnh (sang trái 45 độ)" onClick={this.handleRotateLeft}>
              <span title="Xoay ảnh (sang trái)">
                <span className="fa fa-rotate-left"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Xoay ảnh (sang trái 45 độ)" onClick={this.handleRotateRight}>
              <span title="Xoay ảnh (sang trái)">
                <span className="fa fa-rotate-right"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary"  title="Lật ảnh (chiều ngang)" onClick={this.handleFlipHorizontal}>
              <span title="Lật ảnh (chiều ngang)">
                <span className="fa fa-arrows-h"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Lật ảnh (chiều dọc)" onClick={this.handleFlipVertical}>
              <span title="Lật ảnh (chiều dọc)">
                <span className="fa fa-arrows-v"></span>
              </span>
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn btn-primary" title="Cắt" onClick={this.handleCrop}>
              <span title="Cắt">
                <span className="fa fa-check"></span>
              </span>
            </button>
            <button type="button" className="btn btn-primary" title="Chọn lại" onClick={this.handleClear}>
              <span title="Chọn lại">
                <span className="fa fa-remove"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  renderAvatarPreview = () => {

    const { avatar } = this.state;

    return(

      <div className="AvatarPreview">
        <div className="Header">
          <Typography component="h3" variant="h4" align="center">Xem trước ảnh đại diện</Typography>
        </div>
        <div className="AvatarPreviewBox">
          <img src={avatar} alt="Avatar Preview"/>
        </div>
        <div className="ButtonControls">
          <button type="button" className="btn btn-success" onClick={this.updateAvatar}>Lưu avatar</button>
          <button type="button" className="btn btn-primary" onClick={this.handleBack}>Không, chọn lại</button>
        </div>
      </div>
    )
  }

  render(){

    const { imgURL, avatar, showBackBtn } = this.state;

    return(
      <Modal className="CropAvatar">
        <div className="Wrapper">
          <FormLayoutVertical>
            <button type="button" className="btn btn-primary close-popup" title="Đóng" onClick={this.handleClose}>
              <span className="docs-tooltip" title="Đóng">
                <span className="fa fa-remove"></span>
              </span>
            </button>
            {
              showBackBtn &&
              <button type="button" className="btn btn-primary previous-step" title="Quay lại" onClick={this.handleBack}>
                <span className="docs-tooltip" title="Quay lại">
                  <span className="fa fa-arrow-left"></span>
                </span>
              </button>
            }
            <Grid container spacing={24}>
              <Grid item xs={12}>
                { imgURL ? avatar ? null: this.renderImageCropper() : this.renderFileChooser() }
                { avatar && this.renderAvatarPreview()}
              </Grid>
            </Grid>
          </FormLayoutVertical>
        </div>
        <div className="OverLay"/>
      </Modal>
    )
  }
}

AvatarSelector.propTypes = {
  handleClose: PropTypes.func.isRequired,
  updateAvatar: PropTypes.func.isRequired
}

export default AvatarSelector;
