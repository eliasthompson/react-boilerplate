import React from 'react';

/**
 * An error page.
 * @param {Object} props - Component props
 * @return {React.Component} returns React element
 */
export default function ErrorPage(props) {
  return (
    <div className="page">{ props.error }</div>
  );
}
