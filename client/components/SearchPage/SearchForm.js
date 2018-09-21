// @flow
import React from 'react'

type Props = {
  keyword?: string,
  onSearchFormChanged: Function,
}

type State = {
  keyword: ?string,
  searchedKeyword: ?string,
}

// Search.SearchForm
export default class SearchForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      keyword: this.props.keyword,
      searchedKeyword: this.props.keyword,
    }
  }

  search() {
    const { searchedKeyword, keyword } = this.state
    if (searchedKeyword != keyword) {
      this.props.onSearchFormChanged({ keyword })
      this.setState({ searchedKeyword: keyword })
    }
  }

  handleSubmit = (event: Event) => {
    event.preventDefault()
    this.search()
  }

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const keyword = event.target.value
    this.setState({ keyword })
  }

  render() {
    return (
      <form className="form form-group input-group" onSubmit={this.handleSubmit}>
        <input type="text" name="q" value={this.state.keyword} onChange={this.handleChange} className="form-control" />
        <span className="input-group-append">
          <button type="submit" className="btn btn-outline-secondary">
            <i className="search-top-icon fa fa-search" />
          </button>
        </span>
      </form>
    )
  }
}
