import ShowPropertyDetails from "../Components/ShowPropertyDetails";
import { useParams } from "react-router-dom";

function RentViewDetails() {
  const { id } = useParams();

  return (
    <>
      <ShowPropertyDetails id={id} type="rental" />
    </>
  )
}

export default RentViewDetails;