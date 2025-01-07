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
import TopLocalitiesSVG from '../../../src/Assets/icons/svg/toplocalities.svg';
import SearchSVG from '../../../src/Assets/icons/svg/searchicon.svg';
import LeftArrowSVG from '../../../src/Assets/icons/svg/leftarrow.svg';
import RightArrowSVG from '../../../src/Assets/icons/svg/rightarrow.svg';
import ScrollSVG from '../../../src/Assets/icons/svg/scroll.svg';
import WhiteLineSVG from '../../../src/Assets/icons/svg/whiteline.svg';
import PeopleSVG from '../../../src/Assets/icons/svg/people.svg';
import FillSVG from '../../../src/Assets/icons/svg/Fill.svg';
import WhiteFillSVG from '../../../src/Assets/icons/svg/whiteFill.svg';
import SpotlightLocationSVG from '../../../src/Assets/icons/svg/spotlightlocation.svg';
import SpotlightHomeSVG from '../../../src/Assets/icons/svg/spotlighthome.svg';
import SpotlightPriceSVG from '../../../src/Assets/icons/svg/spotlightprice.svg';
import WhiteHambergerSVG from '../../../src/Assets/icons/svg/whitehamberger.svg';
import WhiteCloseSVG from '../../../src/Assets/icons/svg/whiteclose.svg';
import ConsultSVG from '../../../src/Assets/icons/svg/consult.svg';
import RealestateSVG from '../../../src/Assets/icons/svg/realestateconsulting.svg';
import LegalSVG from '../../../src/Assets/icons/svg/leagaladvice.svg';
import InteriorSVG from '../../../src/Assets/icons/svg/interiordesign.svg';
import HomeloanSVG from '../../../src/Assets/icons/svg/homeloan.svg';
import AwardsSVG from '../../../src/Assets/icons/svg/awards.svg';
import ResidentialProjectSVG from '../../../src/Assets/icons/svg/residentialprojects.svg';
import CommercialProjectSVG from '../../../src/Assets/icons/svg/commercialprojects.svg';
import ScoPlotsSVG from '../../../src/Assets/icons/svg/scoplots.svg';
import PlotnFloorSVG from '../../../src/Assets/icons/svg/plotsnfloor.svg';
import MonthlyVisitSVG from '../../../src/Assets/icons/svg/monthlyvisit.svg';
import FacebookSVG from '../../../src/Assets/icons/svg/facebook.svg';
import YouTubeSVG from '../../../src/Assets/icons/svg/youtube.svg';
import InstagramSVG from '../../../src/Assets/icons/svg/Instagram.svg';
import TwitterSVG from '../../../src/Assets/icons/svg/twitter.svg';
import LinkedInSVG from '../../../src/Assets/icons/svg/linkedin.svg';
import SendSVG from '../../../src/Assets/icons/svg/send.svg';
import CarrierSVG from '../icons/svg/Job offers-pana 1.svg';
import HandShakeSVG from '../icons/svg/HandShake.svg';
import HeadPhoneSVG from '../icons/svg/Headphone.svg';
import PlayButtonSVG from '../icons/svg/PlayButton.svg';
import ForSaleSVG from "../icons/svg/For_sale.svg";
import Girl_Searching from "../icons/svg/Girl_Search.svg";


const getSVG = (path, style = {}) => (
  <img src={path} alt="Icon" style={{ ...style }} />
);

export const ForSaleIcon = (props) => {
  return <Icon component={() => getSVG(ForSaleSVG, props.iconstyle)} {...props} />;
};

export const GirlSearchingIcon = (props) => {
  return <Icon component={() => getSVG(Girl_Searching, props.iconstyle)} {...props} />;
}


export const HandShakeIcon = (props) => {
  return <Icon component={() => getSVG(HandShakeSVG, props.iconstyle)} {...props} />;
}

export const HeadPhoneIcon = (props) => {
  return <Icon component={() => getSVG(HeadPhoneSVG, props.iconstyle)} {...props} />;
}

export const PlayButtonIcon = (props) => {
  return <Icon component={() => getSVG(PlayButtonSVG, props.iconstyle)} {...props} />;
}

export const CarrierIcon = (props) => {
  return <Icon component={() => getSVG(CarrierSVG, props.iconstyle)} {...props} />;
}

export const PhoneIcon = (props) => {
  return <Icon component={() => getSVG(PHONEICONSVG, props.iconstyle)} {...props} />;
};

export const SendIcon = (props) => {
  return <Icon component={() => getSVG(SendSVG, props.iconstyle)} {...props} />;
};

export const TwitterIcon = (props) => {
  return <Icon component={() => getSVG(TwitterSVG, props.iconstyle)} {...props} />;
};

export const InstagramIcon = (props) => {
  return <Icon component={() => getSVG(InstagramSVG, props.iconstyle)} {...props} />;
};

export const FacebookIcon = (props) => {
  return <Icon component={() => getSVG(FacebookSVG, props.iconstyle)} {...props} />;
};

export const YouTubeIcon = (props) => {
  return <Icon component={() => getSVG(YouTubeSVG, props.iconstyle)} {...props} />;
};

  export const LinkedinIcon = (props) => {
  return <Icon component={() => getSVG(LinkedInSVG, props.iconstyle)} {...props} />;
};

export const AwardsIcon = (props) => {
  return <Icon component={() => getSVG(AwardsSVG, props.iconstyle)} {...props} />;
};

export const ResidentialProjectIcon = (props) => {
  return <Icon component={() => getSVG(ResidentialProjectSVG, props.iconstyle)} {...props} />;
};

export const CommercialProjectIcon = (props) => {
  return <Icon component={() => getSVG(CommercialProjectSVG, props.iconstyle)} {...props} />;
};

export const ScoPlotsIcon = (props) => {
  return <Icon component={() => getSVG(ScoPlotsSVG, props.iconstyle)} {...props} />;
};

export const PlotnFloorIcon = (props) => {
  return <Icon component={() => getSVG(PlotnFloorSVG, props.iconstyle)} {...props} />;
};

export const MonthlyVisitIcon = (props) => {
  return <Icon component={() => getSVG(MonthlyVisitSVG, props.iconstyle)} {...props} />;
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

export const TopLocalitesIcon = (props) => {
  return <Icon component={() => getSVG(TopLocalitiesSVG, props.iconstyle)} {...props} />;
};

export const SearchIcon = (props) => {
  return <Icon component={() => getSVG(SearchSVG, props.iconstyle)} {...props} />;
};

export const RightArrowIcon = (props) => {
  return <Icon component={() => getSVG(RightArrowSVG, props.iconstyle)} {...props} />;
};

export const LeftArrowIcon = (props) => {
  return <Icon component={() => getSVG(LeftArrowSVG, props.iconstyle)} {...props} />;
};

export const PeopleIcon = (props) => {
  return <Icon component={() => getSVG(PeopleSVG, props.iconstyle)} {...props} />;
};

export const FillIcon = (props) => {
  return <Icon component={() => getSVG(FillSVG, props.iconstyle)} {...props} />;
};

export const SpotlightLocationIcon = (props) => {
  return <Icon component={() => getSVG(SpotlightLocationSVG, props.iconstyle)} {...props} />;
}

export const SpotlightHomeIcon = (props) => {
  return <Icon component={() => getSVG(SpotlightHomeSVG, props.iconstyle)} {...props} />;
}

export const SpotlightPriceIcon = (props) => {
  return <Icon component={() => getSVG(SpotlightPriceSVG, props.iconstyle)} {...props} />;
}

export const WhiteHambergerIcon = (props) => {
  return <Icon component={() => getSVG(WhiteHambergerSVG, props.iconstyle)} {...props} />;
}

export const WhiteCloseIcon = (props) => {
  return <Icon component={() => getSVG(WhiteCloseSVG, props.iconstyle)} {...props} />;
}

export const WhiteFillIcon = (props) => {
  return <Icon component={() => getSVG(WhiteFillSVG, props.iconstyle)} {...props} />;
}

export const ConsultIcon = (props) => {
  return <Icon component={() => getSVG(ConsultSVG, props.iconstyle)} {...props} />;
}

export const RealestateIcon = (props) => {
  return <Icon component={() => getSVG(RealestateSVG, props.iconstyle)} {...props} />;
}

export const LegalIcon = (props) => {
  return <Icon component={() => getSVG(LegalSVG, props.iconstyle)} {...props} />;
}

export const InteriorIcon = (props) => {
  return <Icon component={() => getSVG(InteriorSVG, props.iconstyle)} {...props} />;
}

export const HomeloanIcon = (props) => {
  return <Icon component={() => getSVG(HomeloanSVG, props.iconstyle)} {...props} />;
}