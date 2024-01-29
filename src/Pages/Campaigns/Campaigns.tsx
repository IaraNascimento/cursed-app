import Logout from "../Logout/Logout";
import CampaignList from "../../components/CampaignList/CampaignList";
import CampaignCreate from "../../components/CampaignCreate/CampaignCreate";
import { useNavigate } from "react-router-dom";
// import "./Campaigns.scss";

function Campaigns() {
  const navigate = useNavigate();
  return (
    <>
      <button className="primary" onClick={() => navigate("/files")}>
        Arquivos
      </button>
      <Logout />
      <h2 className="title">Campanhas</h2>
      <CampaignCreate />
      <CampaignList />
    </>
  );
}

export default Campaigns;
