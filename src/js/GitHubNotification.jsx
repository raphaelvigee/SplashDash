import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import GitHub from './services/github';
import PropTypes from 'prop-types';

const renderIconClass = (n) => {
  switch (n.subject.type) {
    case 'PullRequest':
      return "ion-merge";
    case 'Issue':
      return "ion-ios-information-outline";
  }
};

const open = (n) => {
  return GitHub
  .get(n.subject.url)
  .then(r => {
    const d = r.data;
    window.open(d.html_url)
  })
  .then(() => markAsRead(n))
}

const markAsRead = (n) => {
  return GitHub
  .patch(`/notifications/threads/${n.id}`)
}

const GitHubNotification = ({notification: n, onOpen}) => {
  return (
    <div key={n.id} className="notification" onClick={() => open(n).then(onOpen)}>
      <div className="f-row">
        <div className="f-col">
          <span className={`icon ${renderIconClass(n)}`}></span>
        </div>
        <div className="f-col">
          {n.subject.title}
        </div>
      </div>
    </div>
  )
};

GitHubNotification.defaultProps = {
  opOpen: () => {}
}

export default GitHubNotification;
