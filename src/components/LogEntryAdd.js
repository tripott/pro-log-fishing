import React, {Component} from 'react'

class LogEntryAdd extends Component {

  render() {
    return (
      <div className="pa4 fl w-100 tc bg-white">
        <div className="pa1 fl">
          <h1 className="f3-m f2-l black-70 fw2 mt3 mb0">New Log Entry</h1>
        </div>

        <div className="fl">
          <h2 className="f5 fw5 black-40 mt1 mb1 lh-copy">Date Time Goes here from state</h2>
        </div>
      </div>
    )
  }
}

export default LogEntryAdd
