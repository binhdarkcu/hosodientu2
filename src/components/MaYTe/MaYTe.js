import React from 'react';
import './MaYTe.css';
const MaYTe = ({direction, maYTe, soPhieu, sTT, barCode}) => {

  return(
    <React.Fragment>
      {soPhieu && <div className="MaYTe">
                    <span>Số phiếu:</span>
                    <span>{soPhieu}</span>
                  </div>}
      {maYTe && <div className="MaYTe">
                    <span>Mã Y Tế:</span>
                    <span>{maYTe}</span>
                </div>}
      {sTT && <div className="MaYTe">
                    <span>STT:</span>
                    <span>{sTT}</span>
                </div>}
      {barCode && <div><img src=""/></div>}
    </React.Fragment>
  )
}

MaYTe.defaultProps = {};

export default MaYTe;
