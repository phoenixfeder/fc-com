import PropTypes from 'prop-types';
import React, { Component } from 'react';

class LearningFinished extends Component {

  render() {
    return (
      <div>
        You´re finsihed!
      </div>
    );
  }

}

LearningFinished.propTypes = {
  cards: PropTypes.array.isRequired,
};

export default LearningFinished;
