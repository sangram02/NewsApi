import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
// import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  articles = [
    {
      "source": {
        "id": null,
        "name": "Lifehacker.com"
      },
      "author": "Beth Skwarecki",
      "title": "How to Start Meal Prepping Without It Taking Over Your Life",
      "description": "When you get serious about your fitness goals (be they strength or weightrelated), often one first step is to get your nutrition in order. You want to get enough protein to support your muscles, fruits and vegetables for health, carbs for fuel, and a total …",
      "url": "https://indianexpress.com/section/lifestyle/fitness/",
      "urlToImage": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Zml0bmVzc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "publishedAt": "20220920T15:00:00Z",
      "content": "When you get serious about your fitness goals (be they strength or weightrelated), often one first step is to get your nutrition in order. You want to get enough protein to support your muscles, fr… [+6138 chars]"
    },
    {
      "source": {
        "id": "engadget",
        "name": "Engadget"
      },
      "author": "Mariella Moon",
      "title": "Apple is raising App Store prices across Europe and Asia",
      "description": "Apple has announced that it's raising the prices of both apps and inapp purchases, not including autorenewable subscriptions, across several regions starting on October 5th. All territories using the Euro currency are affected, along with Chile, Egypt, Japa…",
      "url": "https://www.engadget.com/appleraisingappstorepriceseuropeandasia101018295.html",
      "urlToImage": "https://images.unsplash.com/photo-1645940524344-a1bb7a3a648f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjBpcGhvbmUlMjAxM3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      "publishedAt": "20220920T10:10:18Z",
      "content": "Apple has announced that it's raising the prices of both apps and inapp purchases, not including autorenewable subscriptions, across several regions starting on October 5th. All territories using t… [+1287 chars]"
    },
    {
      "source": {
        "id": "engadget",
        "name": "Engadget"
      },
      "author": "Jon Fingas",
      "title": "Apple will fix iOS 16's annoying copy and paste prompts",
      "description": "Apple has another bug to quash in iOS 16. Senior manager Ron Huang told a MacRumors reader that the company will fix the frequent permissions prompts when you try to copy and paste content between apps. This is \"absolutely not expected behavior,\" Huang said. …",
      "url": "https://timesofindia.indiatimes.com/gadgets-news/apple-is-working-on-a-fix-for-the-iphone-14-pros-camera-shaking-issue/articleshow/94321703.cms",
      "urlToImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRryxk6TPvoN728QBickyoA3RTeJiDupnxCWw&usqp=CAU",
      "publishedAt": "20220920T13:15:59Z",
      "content": "Apple has another bug to quash in iOS 16. Senior manager Ron Huang told a MacRumors reader that the company will fix the frequent permissions prompts when you try to copy and paste content between ap… [+823 chars]"
    }

  ]

  constructor(props) {
    super(props);
    console.log("hello am working");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `NewsHunt - ${this.props.category} `;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    console.log("yes once again...")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf05af58390242b69705b0754669bed1&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url)
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false

    })
    this.props.setProgress(100);
  }

  previousclick = async () => {
    console.log("clicked previous")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf05af58390242b69705b0754669bed1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData);


    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
  }

  nextclick = async () => {
    console.log("clciked next");

    if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf05af58390242b69705b0754669bed1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(url)
      let parsedData = await data.json()

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }
  }

  // fetchMoreData = async() => {
  //   this.setState({ page: this.state.page + 1 })
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf05af58390242b69705b0754669bed1&page=1&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data =  await fetch(url)
  //   let parsedData = await data.json()
  //   console.log(parsedData);
  //   this.setState({
  //     articles: this.state.articles.concat(parsedData.articles),
  //     totalResults: parsedData.totalResults,
  //     loading: false

  //   })

  // };


  // the above is commented and its updated and written below 

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bf05af58390242b69705b0754669bed1&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
    })
    
};

  render() {
    console.log("rendering...");
    return (
      <div className='container my-3'>
        <h2>Top Headlines</h2>
        {/* for spinner durinh loading */}
        {this.state.loading && <Spinner/>}



        {/* INFINITE SCROLLING  */}


        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.totalResults}
          loader=<Spinner />
        > */}
          <div className="container">


            <div className="row">
              {/* {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : "This news description is not showing in this card so click below to read"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div> */}




              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : "This news description is not showing in this card so click below to read"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

                
              })}

              {/* THIS BELOW IS USELESS , IT WILL ALWAYS BE COMMENT OUT  */}

              {/* <div className="col-md-4">
          <NewsItem text={"Lumpy Virus"} description={"this virus is spreading rapidly in all over india and upto now thousand of cow and cattles have been died"} imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREjGR7RAtFigfO-WcuoZ4DNdfTliQVqRvTJw&usqp=CAU"}/>
          </div>
          <div className="col-md-4">
          <NewsItem text={"Nambia Leopard"} description={"on the ocassion of former PM shree Narendra Modi birthday ,this leopard has been brought"} imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSquUANRgHwSWaXUv4YJMoUIVyJahj850aSLQ&usqp=CAU"}/>
          </div> */}

            </div>
          </div>
        {/* </InfiniteScroll> */}
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-warning" onClick={this.previousclick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 18)} type="button" className="btn btn-warning" onClick={this.nextclick}>Next &rarr;</button>
          </div>

      </div>

    )
  }
}

export default News     