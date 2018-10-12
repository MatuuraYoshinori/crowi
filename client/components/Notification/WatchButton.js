import React from 'react'
import PropTypes from 'prop-types'
import { translate } from 'react-i18next'
import { Button } from 'reactstrap'
import Icon from 'components/Common/Icon'

class WatchButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      watching: false,
      isChanging: false,
      creationError: false,
    }

    this.watch = this.watch.bind(this)
  }

  async componentDidMount() {
    try {
      const { watching = false } = await this.props.crowi.apiGet('/pages.watch.status', { page_id: this.props.pageId })
      this.setState({ watching })
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error(err.message)
      }
    }
  }

  async watch() {
    const { crowi, pageId } = this.props
    const { watching } = this.state
    this.setState({ isChanging: true, creationError: false })
    try {
      const { ok } = await crowi.apiPost('/pages.watch', { page_id: pageId, status: !watching })
      if (ok) {
        this.setState({ watching: !watching })
      }
    } catch (err) {
      this.setState({ creationError: true })
    } finally {
      this.setState({ isChanging: false })
    }
  }

  render() {
    const { watching } = this.state
    const { icon, text } = watching
      ? {
          icon: 'eye-slash',
          text: 'Unwatch',
        }
      : {
          icon: 'eye',
          text: 'Watch',
        }

    return (
      <Button outline size="sm" onClick={this.watch}>
        <Icon className="mr-1" name={icon} />
        {text}
      </Button>
    )
  }
}

WatchButton.propTypes = {
  isCreated: PropTypes.bool,
  pageId: PropTypes.string,
  t: PropTypes.func.isRequired,
  crowi: PropTypes.object.isRequired,
}
WatchButton.defaultProps = {
  isCreated: false,
}

export default translate()(WatchButton)