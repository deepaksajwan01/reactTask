import React from 'react'

export default function CharacterCard(props) {
  return (
    <div>
      <div className="card ml-3 mb-3 card-width"> 
  <h5 className="card-header">{props.data.name}</h5>
  <div className="card-body">
    <h5 className="card-title">Gender: {props.data.gender}</h5>
    <p className="card-text">Height: {props.data.height}</p>
    <a href="#" className="btn btn-secondary">More Details</a>
  </div>
</div>
     {/* <p>{props.data.name}</p> 
     <p>{props.data.gender}</p>
     <p>{props.data.height}</p> */}
    </div>
  )
}
