import React, { Component } from 'react'
import superagent from 'superagent'
import actions from '../../actions'
import { connect } from 'react-redux'

class Search extends Component{
  constructor(){
    super()
      this.state ={
        venues: [],
        search: {
          location: '',
          query: ''
        }
      }
    }

   updateSearchFilters(field, event){
      console.log('updateLogFilters: field == '+field+'=='+event.target.value)
      let search = Object.assign({}, this.state.search)
      search[field] = event.target.value
      this.setState({
        search: search
      })
   }
   searchVenue(){
     console.log('searchVenue :'+JSON.stringify(this.state.search))
     const url = 'https://api.foursquare.com/v2/venues/search'
     const params ={
       v: '20140806',
       near: this.state.search.location,
       query: this.state.search.query,
       client_id:'VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD',
       client_secret:'UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ'
     }
     superagent
     .get(url)
     .query(params)
     .set('Accept', 'application/json')
     .end((err, data) => {

       if(err){
         alert('Oops: '+ err.message)
         return
       }
       else{
         console.log(JSON.stringify(data.body.response.venues))
         this.setState({
           venues: data.body.response.venues
         })
       }
     })
   }

   selectVenue(venue, event){
     event.preventDefault()
     console.log('selectedVenue: '+JSON.stringify(venue))
     this.props.selectVenue(venue)
   }

   render(){
     return(
       <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h3>Search Venues</h3>
            <input onChange={this.updateSearchFilters.bind(this, 'query')} type="text" placeholder="Query"/><br />
            <input onChange={this.updateSearchFilters.bind(this, 'location')} type="text" placeholder="Location"/><br />
            <button onClick={this.searchVenue.bind(this)}>Search</button>
            <hr></hr>
            <h3>Venues</h3>
            <ol>
              {this.state.venues.map((venue, i) =>{
                  return (
                    <li key={venue.id}>
                      <a onClick={this.selectVenue.bind(this,venue)} href="#">
                        {venue.name}
                      </a>
                    </li>
                  )
                })
              }
            </ol>
          </div>
          <div className="col-md-8">
            <h4>
              {(this.props.venue.selectedVenue) ? this.props.venue.selectedVenue.name : 'No Venue Selected'}
            </h4>
          </div>
        </div>
      </div>
     )
   }
}

const stateToProps = (state) => {
  return {
    venue: state.venue
  }
}

const dispatchToProps = (dispatch) =>{
  return{
    selectVenue: (venue) => dispatch(actions.selectVenue(venue))
  }
}

export default  connect(stateToProps, dispatchToProps)(Search)
