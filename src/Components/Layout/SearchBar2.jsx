import Card from "../../RoughComponent/Card"
import Card2Boot from "../../RoughComponent/Card2Boot"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

function SearchBar2() {
  return (
    <Carousel
      swipeable
      draggable
      arrows={false}
      infinite
      responsive={{
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet: { breakpoint: { max: 1024, min: 640 }, items: 3 },
        mobile: { breakpoint: { max: 640, min: 0 }, items: 2 }
      }}
    >
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
      <Card2Boot />
    </Carousel>
  )
}

export default SearchBar2
