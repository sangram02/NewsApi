import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {

    // creation of objects 
    let { text, description, imageUrl, newsUrl, author, date ,source} = this.props
    // these text n all are imported for the cards which are commented card on newsUrl.js 

    return (
      <div>
        <div className="card" style={{}}>
          <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex: 1}}>
          {/* the above style tag is used so that badges doesnt overlap on other article  */}
            {source}
          </span>
          <img src={!imageUrl ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7HjpHNuzVssA9WGGtdCI0kC6gnLmjbMVuw&usqp=CAU" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{text}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-danger">By {!author ? "anonymous" : author} on {new Date(date).toGMTString()}</small></p>
            {/* the above function(written inside the date) is used to give indian standard time */}
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
            {/* this (target = "_blank") is used to open that thing in a new tab  */}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem