import ShowPropertyDetails from "../Components/ShowPropertyDetails";
import { useParams } from "react-router-dom";

function BuyViewDetails() {
  const { id } = useParams();
  return (
    <>
      <ShowPropertyDetails id={id} />
    </>
  )
}

export default BuyViewDetails;