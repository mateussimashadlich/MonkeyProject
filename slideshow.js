class Slideshow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlideItemIndex: 0,
      slideItems: [
        {
          name: 'Monkey Filming and Photos',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img_id: 'man_and_monkey',
          img_src: 'static/man_and_monkey.jpg',
          img_alt: 'A man and a monkey sitting on a short wall',
          page: 'monkey_filming_photos.html',
        },
        {
          name: 'Monkey Art',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img_id: 'staring_monkey',
          img_src: 'static/staring_monkey.jpg',
          img_alt: 'A monkey staring at the camera',
          page: 'monkey_art.html',
        },
        {
          name: 'Monkey Bla',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          img_id: 'staring_monkey',
          img_src: 'static/monkey_mirror.jpg',
          img_alt: 'A monkey staring at the camera',
          page: '#',
        }
      ]
    }
  }

  componentDidMount() {
    this.timer_slideItem = setInterval(() => {
      this.changeSlideItem("right")
    }, 6500);
  }

  changeSlideItem(direction, clicked) {
    if (direction == "left") {
      if (this.state.currentSlideItemIndex == 0) {
        this.setState({ currentSlideItemIndex: this.state.slideItems.length - 1 })
      }
      else {
        this.setState({ currentSlideItemIndex: this.state.currentSlideItemIndex - 1 })
      }
    }
    else if (direction == "right") {

      if (this.state.currentSlideItemIndex == this.state.slideItems.length - 1) {
        this.setState({ currentSlideItemIndex: 0 })
      }
      else {
        this.setState({ currentSlideItemIndex: this.state.currentSlideItemIndex + 1 })
      }
    }
    if (clicked == true) {
      clearInterval(this.timer_slideItem);
      this.timer_slideItem = setInterval(() => {
        this.changeSlideItem("right")
      }, 6500);
    }
  }
  render() {
    let slideItem = this.state.slideItems[this.state.currentSlideItemIndex];
    let slideIndicatorsImg = [];
    for (var i = 0; i < this.state.slideItems.length; i++) {
      if (i == this.state.currentSlideItemIndex) {
        slideIndicatorsImg.push("static/little_painted_circle.png")
      }
      else {
        slideIndicatorsImg.push("static/little_unpainted_circle.png")
      }
    }

    return (
      <div>
        <input className="slide-show-button" type="image" src="static/botao_esquerda.png" alt="Advance to the left" width="48" height="48" onClick={() => this.changeSlideItem("left", true)} />
        <section id="slide-show-item" class="animation">
          <a href={slideItem.page}>
            <figure>
              <h1>{slideItem.name}</h1>
              <img id={slideItem.img_id} src={slideItem.img_src} alt={slideItem.img_alt} />
            </figure>
            <article>
              <section>
                <h1>{slideItem.name}</h1>
                <p>{slideItem.text}</p>
              </section>
            </article>
          </a>
        </section>
        <input className="slide-show-button" type="image" src="static/botao_direita.png" alt="Advance to the right" width="48" height="48" onClick={() => this.changeSlideItem("right", true)} />
        <ul>
          {
            slideIndicatorsImg.map((img, index) =>
              <li key={index}>
                <input type="image" src={img} alt="Advance" width="12" height="12" onClick={() => this.setState({ currentSlideItemIndex: index })} />
              </li>)

          }
        </ul>
      </div>
    );
  };
};

ReactDOM.render(
  <Slideshow />,
  document.getElementById('slide-show')
);