import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, propOr } from 'ramda'
import moment from 'moment'
import MapContainer from './MapContainer'
import Rating from './Rating'
import Title from './Title'


//GOOGLE API KEY:  AIzaSyA6PNXwjUhL0VD7WYutPfLVKILzvj74Y-8
const LogEntryDetail = (props) => {
  const logEntry = find(propEq('_id', props.match.params.id))(props.log)
  const name = propOr('', 'name', logEntry)
  let startDateTime = propOr('', 'startDateTime', logEntry)
  startDateTime = moment.utc(startDateTime).format('lll').toString()

  const position = propOr('', 'position', logEntry)
  const centerMap = position === '' ? true : false

  if (position === '') {
    return <div>Loading Map...</div>
  }

  return (
    <div>
      <div  className="vh-25 cover bg-center">
        <MapContainer
          mapCenter={position}
          mapCenterCurrLoc={centerMap}
          mapZoom={14}
          mapStyle={{width: '100%', height: '25%', position: 'relative'}}/>
      </div>



      <div className="cf">
        <Title name={name} startDateTime={startDateTime} />
        <Rating rating={logEntry.rating}/>

        <div className="pa2 pb3 fl w-100 tc bg-light-gray">
          <div className=" f4 f2-ns measure center">

            <p className="db lh-copy black-70 serif fw1 mv0 pt0 f4 f3-m f2-l measure baskerville">
              Decent fishing with a few trout in the 12 to 14 inch range.
            </p>
          </div>
        </div>
        <div className="pa2 pb3 fl w-100 tc bg-black-10">
          <main className="mw6 center">
            <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
              <div className="dtc w3 w4-ns v-mid">
                <img src="/fish-flounder.jpg" className="ba b--black-10 db " alt="flounder" />
              </div>
              <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">Flounder - 12in - 1lb</h1>
                <h2 className="f6 fw4 mt0 mb0 black-60">1:05 PM</h2>
              </div>
              <div className="dtc v-mid">
                <form className="w-100 tr">
                  <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Add</button>
                </form>
              </div>
            </article>

              <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                <div className="dtc w3 w4-ns v-mid">
                  <img src="/fish-sea-trout.jpg" className="ba b--black-10 db " alt="trout" />
                </div>
                <div className="dtc v-mid pl3">
                  <h1 className="f6 f5-ns fw6 lh-title black mv0">Trout - 12in - 1lb</h1>
                  <h2 className="f6 fw4 mt0 mb0 black-60">1:15 PM</h2>
                </div>
                <div className="dtc v-mid">
                  <form className="w-100 tr">
                    <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Add</button>
                  </form>
                </div>
              </article>

              <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
                <div className="dtc w3 w4-ns v-mid">
                  <img src="/fish-red-fish.jpg" className="ba b--black-10 db" alt="flounder" />
                </div>
                <div className="dtc v-mid pl3">
                  <h1 className="f6 f5-ns fw6 lh-title black mv0">Redfish - 12in - 1lb</h1>
                  <h2 className="f6 fw4 mt0 mb0 black-60">1:30 PM</h2>
                </div>
                <div className="dtc v-mid">
                  <form className="w-100 tr">
                    <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Add</button>
                  </form>
                </div>
              </article>


            </main>
          </div>

          <div className="pa3 fl w-50 w-25-ns tc black bg-light-blue">
            <div className="pa1 fl v-mid w-50 ">
              <h1 className="f3 fw2 black-90">4.5 <span className="f5 fw1">ft</span></h1>
            </div>
            <div className="pa3 fl w-50 ">
              <i className="fa fa-arrow-circle-o-up fa-4x" aria-hidden="true"></i>
            </div>
            <div className="fl w-100 ">
              <h2 className="f3  fw2 black-50 mt0 lh-copy">rising tide</h2>
            </div>
          </div>

          <div className="pa3 fl w-50 w-25-ns tc dark-gray bg-lightest-blue">
            <div className="pa1 fl v-mid w-50 ">
              <h1 className="f3  fw3 black-90">68.8 <span className="f5 fw1">F</span></h1>
            </div>
            <div className="pa3 fl w-50 ">
              <i className="fa fa-thermometer-three-quarters fa-4x" aria-hidden="true"></i>
            </div>
            <div className="fl w-100 ">
              <h2 className="f3  fw2 black-50 mt0 lh-copy">water temp</h2>
            </div>
          </div>


          <div className="pa3 fl w-50 w-25-ns tc bg-dark-blue">
            <div className="pa1 fl v-mid w-50 ">
              <h1 className="f3 fw2 washed-blue">20 <span className="f5 fw1 washed-blue">mph</span></h1>
            </div>
            <div className="pa3 fl w-50">
              <img
              src="/wind-turbine.svg"
              alt="windy"
              height="60px"
              width="60px" />
            </div>
            <div className="fl w-100 ">
              <h2 className="f3 fw1 washed-blue mt0 lh-copy">wind (SSW)</h2>
            </div>
          </div>


          <div className="pa3 fl w-50 w-25-ns tc bg-white">
            <div className="pa1 fl v-mid w-50 ">
              <h1 className="f3  fw2 black">75 <span className="f5 fw1">F</span></h1>
            </div>
            <div className="pa3 fl w-50">
              <img
              src="/sunny.svg"
              alt="windy"
              height="60px"
              width="60px" />
            </div>
            <div className="fl w-100 ">
              <h2 className="f3  fw2 black-50 mt0 lh-copy">sunny</h2>
            </div>
          </div>

      </div>


    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    log: state.log,
    dbStatus: state.dbStatus
  }
}

const connector = connect(mapStateToProps)
export default connector(LogEntryDetail);
