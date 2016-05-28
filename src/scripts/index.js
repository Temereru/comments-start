import React from 'react';
import ReactDOM from 'react-dom';

import { onUpdate, forceUpdate, sendEvent } from 'state'

var classnames = require('classnames');

class CommentContainer extends React.Component {
  constructor (props) {
    super(props);
  };

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1 className="text-center">Comments</h1>
        <button className={classnames({btn: true, 'pull-right': true, hide: !this.props.state.show})} onClick={this.toggleComments}>Hide Comments</button>
        <button className={classnames({btn: true, 'btn-primary': true,  'pull-right': true, hide: this.props.state.show})} onClick={this.toggleComments}>show Comments</button>
        <h4 className="comment-count">{this.getCommentsTitle(this.props.state.comments.length)}</h4>
        <div className={classnames({hide: !this.props.state.show})}>
          {this.getComments()}
        </div>

        <CommentForm addComment={this.addComment.bind(this)} />
      </div>
    );
  };

  getComments() {
    return this.props.state.comments.map((comment) => {
      return (
        <Comment 
          name={comment.name} text={comment.text} 
          key={this.props.state.comments.indexOf(comment)} />
      )
    });
  };

  getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments to show';
    } else if (commentCount === 1) {
      return '1 comment';
    } else {
      return `${commentCount} comments`;
    }
  };

  addComment(name, text) {
    const comment = {
      name,
      text
    };

    sendEvent('addComment', comment);
  };

  toggleComments() {
    sendEvent('toggleComments');
  };
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <span className="comment-title">
          {this.props.text}
        </span> - 
        <span className="comment-author">
          {this.props.name}
        </span>
      </div>
    )
  }
}

class CommentForm extends React.Component {
  render() { 
    return (
      <form className="form-group" onSubmit={this.handleSubmit.bind(this)}>
        <h3>Add a new post</h3>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Comment" ref={(input) => this.text = input}></input>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Name" ref={(input) => this.name = input}></input>
        </div>
        <button type="submit" className="btn btn-primary">Add Comment</button>
      </form>
    )
  };

  handleSubmit(e) {
    e.preventDefault();

    let name = this.name; 
    let text = this.text;
    this.props.addComment(name.value, text.value);
  };
}

const main = document.querySelector('main');

onUpdate((state) => {
  ReactDOM.render(
    <CommentContainer state={state}/>,
    main
  );
});

forceUpdate();

