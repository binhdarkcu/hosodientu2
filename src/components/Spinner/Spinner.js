import React from 'react';
import PropTypes from 'prop-types';
import * as Loader from 'react-spinners';

// custom imports
import Modal from '../PortalModal';
import './style.scss';

const Spinner = ({type, size, color, loading}) => {
  const CurrentSpinner = Loader[type];
  return(
      loading &&
      <Modal className="Spinner">
        <div className="Animation">
          <CurrentSpinner color={color} size={size} sizeUnit="px" loading={true} />
        </div>
      </Modal>
  )
}
// props constraints
Spinner.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
}

Spinner.defaultProps = {
  loading: false
}

export default Spinner;
