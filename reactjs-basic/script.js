const divTag = React.createElement(
  'div',
  { className: 'post-item' },
  React.createElement('h2', { title: 'Học React tại F8' }, 'Học Reactjs'),
  React.createElement('p', null, 'Học Reactjs từ cơ bản tới nâng cao')
);




ReactDOM.render(divTag, document.getElementById("root"));
