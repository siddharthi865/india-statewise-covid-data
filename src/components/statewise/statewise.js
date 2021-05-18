import React, { useEffect, useState } from 'react'
import './statewise.css'

const Statewise = () => {

  const [data, setData] = useState([]);

  const getCovidData = async () => {
    const res = await fetch('https://api.covid19india.org/data.json')
    const actualData = await res.json();
    //console.log(actualData.statewise);
    setData(actualData.statewise);
  }

  useEffect(() => {
    getCovidData();
  }, [])

  return (
    <>
      <div className="container-fluid mt-5">
        <div className="main-heading">
          <h1 className="mb-5 text-center"><span className="font-weight-bold">INDIA</span> COVID-19 DATA</h1>
        </div>

        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th> State </th>
                <th> Confirmed </th>
                <th> Recovered </th>
                <th> Deaths </th>
                <th> Active </th>
                <th> Updated </th>
                <th> Death Percentage </th>
                <th> Recovered Percentage </th>
                <th> Active Percentage </th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((curElem, ind) => {
                  if(curElem.state !== 'Total' && curElem.state !== 'State Unassigned'){ 
                  return (
                    <tr key={ ind }>
                      <td> { curElem.state } </td>
                      <td> {curElem.confirmed } </td>
                      <td> {curElem.recovered } </td>
                      <td> {curElem.deaths } </td>
                      <td> {curElem.active } </td>
                      <td> {curElem.lastupdatedtime } </td>
                      <td> { ((curElem.deaths / curElem.confirmed ) * 100).toFixed(2) }</td>
                      <td> { ((curElem.recovered / curElem.confirmed ) * 100).toFixed(2) }</td>
                      <td> { ((curElem.active / curElem.confirmed ) * 100).toFixed(2) }</td>
                    </tr>
                  )
                  }
                })
              }
              {
                data.map((curElem, ind) => {
                  if(curElem.state === 'Total'){ 
                  return (
                    <tr key={ ind } className="total_data">
                      <td> { curElem.state } </td>
                      <td> {curElem.confirmed } </td>
                      <td> {curElem.recovered } </td>
                      <td> {curElem.deaths } </td>
                      <td> {curElem.active } </td>
                      <td> {curElem.lastupdatedtime } </td>
                      <td> { ((curElem.deaths / curElem.confirmed ) * 100).toFixed(2) }</td>
                      <td> { ((curElem.recovered / curElem.confirmed ) * 100).toFixed(2) }</td>
                      <td> { ((curElem.active / curElem.confirmed ) * 100).toFixed(2) }</td>
                    </tr>
                  )
                  }
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Statewise
