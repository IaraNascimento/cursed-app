import { getDatabase, ref as refDb, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";

function CampaignList() {
  const [campaigns, setCampaigns] = useState<Array<any>>([]);
  const db = getDatabase();
  const query = refDb(db, "campaigns");

  useEffect(() => {
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setCampaigns(data.campaigns);
    });
  }, []);

  function deleteCampaign(campaign: string) {
    const currentCampaigns = campaigns;
    const index = currentCampaigns.indexOf(campaign);
    currentCampaigns.splice(index, 1);
    set(query, { campaigns: currentCampaigns });
  }

  return (
    <ul>
      {campaigns?.map((campaign, index) => (
        <li key={index}>
          <span>{campaign}</span>
          <button onClick={() => deleteCampaign(campaign)}>excluir</button>
        </li>
      ))}
    </ul>
  );
}
export default CampaignList;
