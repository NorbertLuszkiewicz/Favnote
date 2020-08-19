import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import axios from 'axios';

class DetailsPage extends Component {
  state = {
    activeItem: {
      title: '',
      content: '',
      created: '',
      articleUrl: '',
      twitterName: '',
    },
    err: {
      title: 'ERROR 404',
      content: 'WRONG NOTE ADDRESS',
      created: '',
      articleUrl: 'https://www.youtube.com/watch?v=leEQ3nz8O-I',
      twitterName: '',
    },
  };

  componentDidMount() {
    const { activeItem } = this.props;
    if (activeItem) {
      const [activesItem] = activeItem;
      this.setState({ activeItem: activesItem });
    } else {
      const { match } = this.props;
      const { id } = match.params;

      axios
        .get(`http://localhost:9000/api/note/${id}`)
        .then(({ data }) => {
          this.setState({ activeItem: data });
        })
        .catch(() => this.setState(prevState => ({ activeItem: prevState.err })));
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <DetailsTemplate
        title={activeItem.title}
        created={activeItem.created}
        content={activeItem.content}
        articleUrl={activeItem.articleUrl}
        twitterName={activeItem.twitterName}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.pageContext]) {
    return {
      // eslint-disable-next-line no-underscore-dangle
      activeItem: state[ownProps.pageContext].filter(item => item._id === ownProps.match.params.id),
    };
  }
  return {};
};

DetailsPage.propTypes = {
  // eslint-disable-next-line react/require-default-props
  activeItem: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  match: PropTypes.shape({
    params: PropTypes.object,
    path: PropTypes.string,
  }).isRequired,
};

export default withContext(connect(mapStateToProps)(DetailsPage));
