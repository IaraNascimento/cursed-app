import Logout from "../Logout/Logout";
import CampaignList from "../../components/CampaignList/CampaignList";
import CampaignCreate from "../../components/CampaignCreate/CampaignCreate";
import { useNavigate } from "react-router-dom";
import Menu from "../../components/Menu/Menu";
// import "./Campaigns.scss";

function Campaigns() {
  const navigate = useNavigate();
  return (
    <>
      <Menu />
      <h2 className="title">Campanhas</h2>
      <CampaignCreate />
      <CampaignList />
    </>
  );
}

export default Campaigns;
