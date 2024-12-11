import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

import PHONEICONSVG from '../../../src/Assets/icons/svg/phone.svg';
import CALENDERICONSVG from '../../../src/Assets/icons/svg/calender.svg';
import ACRESSICONSVG from '../../../src/Assets/icons/svg/acres.svg';
import PRICEICONSVG from '../../../src/Assets/icons/svg/price.svg';
import TOWERICONSVG from '../../../src/Assets/icons/svg/tower.svg';
import LOCATIONSMALLICONSVG from '../../../src/Assets/icons/svg/locationsmall.svg';
import FAVOURITEICONSVG from '../../../src/Assets/icons/svg/favourite.svg';
import SHAREICONSVG from '../../../src/Assets/icons/svg/share.svg';
import LINESVG from '../../../src/Assets/icons/svg/Line.svg';
import WHITELINESVG from '../../../src/Assets/icons/svg/whiteline.svg';
import ArrowSVG from '../../../src/Assets/icons/svg/arrow.svg';
import SwimmingPoolSVG from '../../../src/Assets/icons/svg/swimming.svg';
import CarParkingSVG from '../../../src/Assets/icons/svg/carparking.svg';
import VolleyBallSVG from '../../../src/Assets/icons/svg/volleyball.svg';
import AtmSVG from '../../../src/Assets/icons/svg/atm.svg';
import RestaurantSVG from '../../../src/Assets/icons/svg/restaurant.svg';
import GrocerySVG from '../../../src/Assets/icons/svg/grocery.svg';
import LaundrySVG from '../../../src/Assets/icons/svg/laundry.svg';
import BasketBallSVG from '../../../src/Assets/icons/svg/basketball.svg';
import BadmintonCourtSVG from '../../../src/Assets/icons/svg/badminton.svg';
import LobbyAreaSVG from '../../../src/Assets/icons/svg/lobbyarea.svg';
import ShoppingCenterSVG from '../../../src/Assets/icons/svg/shoppingcenter.svg';
import CommunityHallSVG from '../../../src/Assets/icons/svg/communityhall.svg';
import PowerBackupSVG from '../../../src/Assets/icons/svg/powerbackup.svg';
import WaterSupplySVG from '../../../src/Assets/icons/svg/watersupply.svg';
import GymSVG from '../../../src/Assets/icons/svg/gym.svg';
import ShareFrameSVG from '../../../src/Assets/icons/svg/ShareFrame.svg';
import ForwardSVG from '../../../src/Assets/icons/svg/forwardarrow.svg';
import BackwardSVG from '../../../src/Assets/icons/svg/backwardarrow.svg';
import PropertyTypeSVG from '../../../src/Assets/icons/svg/propertyicon.svg';
import RupeeSignSVG from '../../../src/Assets/icons/svg/rupeesign.svg';
import LocationSmallhomeSVG from '../../../src/Assets/icons/svg/redlocation.svg';
import EyeSVG from '../../../src/Assets/icons/svg/eye.svg';
import LocationBiggerSVG from '../../../src/Assets/icons/svg/locationbigger.svg';
import ScrollSVG from '../../../src/Assets/icons/svg/scroll.svg';
import WhiteLineSVG from '../../../src/Assets/icons/svg/whiteline.svg';


const getSVG = (path, style = {}) => (
  <img src={path} alt="Icon" style={{ ...style }} />
);

export const PhoneIcon = (props) => {
  return <Icon component={() => getSVG(PHONEICONSVG, props.iconstyle)} {...props} />;
};

export const WhiteLinestreakIcon = (props) => {
  return <Icon component={() => getSVG(WhiteLineSVG, props.iconstyle)} {...props} />;
};

export const ScrollIcon = (props) => {
  return <Icon component={() => getSVG(ScrollSVG, props.iconstyle)} {...props} />;
};

export const ShareFrameIcon = (props) => {
  return <Icon component={() => getSVG(ShareFrameSVG, props.iconstyle)} {...props} />;
};
export const AcresIcon = (props) => {
    return <Icon component={() => getSVG(ACRESSICONSVG, props.iconstyle)} {...props} />;
  };

export const CalenderIcon = (props) => {
    return <Icon component={() => getSVG(CALENDERICONSVG, props.iconstyle)} {...props} />;
};

export const PriceIcon = (props) => {
    return <Icon component={() => getSVG(PRICEICONSVG, props.iconstyle)} {...props} />;
};

export const TowerIcon = (props) => {
    return <Icon component={() => getSVG(TOWERICONSVG, props.iconstyle)} {...props} />;
};

export const LocationSmallIcon = (props) => {
  return <Icon component={() => getSVG(LOCATIONSMALLICONSVG, props.iconstyle)} {...props} />;
};

export const FavouriteIcon = (props) => {
  return <Icon component={() => getSVG(FAVOURITEICONSVG, props.iconstyle)} {...props} />;
};

export const SHAREIcon = (props) => {
  return <Icon component={() => getSVG(SHAREICONSVG, props.iconstyle)} {...props} />;
};

export const LineIcon = (props) => {
  return <Icon component={() => getSVG(LINESVG, props.iconstyle)} {...props} />;
};

export const WhiteLineIcon = (props) => {
  return <Icon component={() => getSVG(WHITELINESVG, props.iconstyle)} {...props} />;
};

export const ArrowIcon = (props) => {
  return <Icon component={() => getSVG(ArrowSVG, props.iconstyle)} {...props} />;
};

export const SwimmingPoolIcon = (props) => {
  return <Icon component={() => getSVG(SwimmingPoolSVG, props.iconstyle)} {...props} />;
};

export const CarParkingIcon = (props) => {
  return <Icon component={() => getSVG(CarParkingSVG, props.iconstyle)} {...props} />;
};

export const VolleyBallIcon = (props) => {
  return <Icon component={() => getSVG(VolleyBallSVG, props.iconstyle)} {...props} />;
};

export const AtmIcon = (props) => {
  return <Icon component={() => getSVG(AtmSVG, props.iconstyle)} {...props} />;
};

export const RestaurantIcon = (props) => {
  return <Icon component={() => getSVG(RestaurantSVG, props.iconstyle)} {...props} />;
};

export const GroceryIcon = (props) => {
  return <Icon component={() => getSVG(GrocerySVG, props.iconstyle)} {...props} />;
};

export const LaundryIcon = (props) => {
  return <Icon component={() => getSVG(LaundrySVG, props.iconstyle)} {...props} />;
};

export const BasketBallIcon = (props) => {
  return <Icon component={() => getSVG(BasketBallSVG, props.iconstyle)} {...props} />;
};

export const BadmintonCourtIcon = (props) => {
  return <Icon component={() => getSVG(BadmintonCourtSVG, props.iconstyle)} {...props} />;
};

export const EntranceLobbyIcon = (props) => {
  return <Icon component={() => getSVG(LobbyAreaSVG, props.iconstyle)} {...props} />;
};

export const ShoppingCenterIcon = (props) => {
  return <Icon component={() => getSVG(ShoppingCenterSVG, props.iconstyle)} {...props} />;
};

export const CommunityHallIcon = (props) => {
  return <Icon component={() => getSVG(CommunityHallSVG, props.iconstyle)} {...props} />;
};

export const PowerBackupIcon = (props) => {
  return <Icon component={() => getSVG(PowerBackupSVG, props.iconstyle)} {...props} />;
};

export const WaterSupplyIcon = (props) => {
  return <Icon component={() => getSVG(WaterSupplySVG, props.iconstyle)} {...props} />;
};

export const GymIcon = (props) => {
  return <Icon component={() => getSVG(GymSVG, props.iconstyle)} {...props} />;
};

export const ForwardIcon = (props) => {
  return <Icon component={() => getSVG(ForwardSVG, props.iconstyle)} {...props} />;
};

export const BackwardIcon = (props) => {
  return <Icon component={() => getSVG(BackwardSVG, props.iconstyle)} {...props} />;
};

export const PropertyIcon = (props) => {
  return <Icon component={() => getSVG(PropertyTypeSVG, props.iconstyle)} {...props} />;
};

export const RupeeIcon = (props) => {
  return <Icon component={() => getSVG(RupeeSignSVG, props.iconstyle)} {...props} />;
};

export const LocationRedIcon = (props) => {
  return <Icon component={() => getSVG(LocationSmallhomeSVG, props.iconstyle)} {...props} />;
};

export const EyeIcon = (props) => {
  return <Icon component={() => getSVG(EyeSVG, props.iconstyle)} {...props} />;
};

export const LcoationBiggerIcon = (props) => {
  return <Icon component={() => getSVG(LocationBiggerSVG, props.iconstyle)} {...props} />;
};