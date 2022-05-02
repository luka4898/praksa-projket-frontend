import React, { Component } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { variables } from "../../Variables";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
class MultipleCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.similarevn,
    };
  }
  render() {
    const { event } = this.state;
    return (
      <Carousel responsive={responsive} arrows={false} showDots={true}>
        {event.map((evn) => (
          <div className="col-ms-8 col-md-3" key={evn.currentEventId}>
            <div className="project">
              <figure className="img-responsive">
                <img src={variables.PHOTO_URL + evn.imagePath} />
                <figcaption>
                  <span className="project-details">{evn.eventName}</span>
                  <span className="project-price">
                    <strong>{evn.price} BAM</strong>
                  </span>
                  <span className="project-creator">{evn.organizersName}</span>
                </figcaption>
                <span className="actions">
                  <Link
                    to={{
                      pathname: `/eventdetails/${evn.currentEventId}`,
                      state: { eventTypeId: evn.eventTypeId },
                    }}
                    className="btn btn-warning bnt-action button"
                    onClick={() =>
                      this.props.history.push(
                        `/eventdetails/${evn.currentEventId}`
                      )
                    }
                  >
                    View
                  </Link>
                </span>
              </figure>
            </div>
          </div>
        ))}
      </Carousel>
    );
  }
}

export default MultipleCarousel;
