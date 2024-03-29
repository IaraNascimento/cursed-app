import { useEffect, useState } from "react";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";

function CampaignCreate() {
  const db = getDatabase();
  const query = refDb(db, "campaigns");

  const [newCampaign, setNewCampaign] = useState<string>("");
  const [currentCampaigns, setCurrentCampaigns] = useState<Array<string>>([""]);

  function handleSubmit(campaignTitle: string) {
    campaignTitle = campaignTitle.trim();
    const campaigns = currentCampaigns;
    if (!currentCampaigns.includes(campaignTitle)) {
      campaigns.push(campaignTitle);
      setCurrentCampaigns(campaigns);
      set(query, { campaigns });
    }
  }

  useEffect(() => {
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setCurrentCampaigns(data.campaigns);
    });
  }, []);

  return (
    <form className="fileUpload" onSubmit={(e) => e.preventDefault()}>
      <input
        placeholder="Nome da campanha"
        type="text"
        onChange={(e) => setNewCampaign(e.target.value)}
      />
      <button className="primary" onClick={() => handleSubmit(newCampaign)}>
        Criar Campanha
      </button>
    </form>
  );
}

export default CampaignCreate;
