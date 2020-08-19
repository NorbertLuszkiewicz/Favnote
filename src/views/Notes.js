import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import PageInformation from 'components/molecules/PageIndormation/PageInformation';
import { fetchItems } from 'actions';

class Notes extends Component {
  componentDidMount() {
    const { fetchNotes } = this.props;

    fetchNotes();
  }

  render() {
    const { notes } = this.props;

    return (
      <>
        <PageInformation numberOfItems={notes.length} />
        <GridTemplate>
          {notes.map(({ title, content, created, _id: id }) => (
            <Card id={id} title={title} content={content} created={created} key={id} />
          ))}
        </GridTemplate>
      </>
    );
  }
}

const mapStateToProps = ({ notes }) => ({ notes });

const mapDispatchToProps = dispatch => ({
  fetchNotes: () => dispatch(fetchItems('notes')),
});

Notes.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  notes: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notes);
