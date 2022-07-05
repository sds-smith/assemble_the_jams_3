
const Track = () => {
    return (
        <div className="Track" style={trackStyle}>
          <div className="Track-information" style={trackInfoStyle}>
            <h3 style={trackInfoStyle}>{this.props.track.name}</h3>
            <p style={trackInfoStyle}>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          {this.renderAction()}
        </div>            
    )
}

export default Track