import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";

function CampaignMultiSelect() {
  const [campaigns, setCampaigns] = useState<Array<any>>([]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<Array<string>>([]);
  const db = getDatabase();

  useEffect(() => {
    const query = ref(db, "campaigns");
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      setCampaigns(data.campaigns);
    });
  }, []);

  useEffect(() => {}, [selectedCampaigns]);

  function handleSelect(selected: string) {
    const tempSelectedCampaigns = JSON.parse(JSON.stringify(selectedCampaigns));

    if (tempSelectedCampaigns.includes(selected)) {
      const index = tempSelectedCampaigns.indexOf(selected);
      tempSelectedCampaigns.splice(index, 1);
    } else {
      tempSelectedCampaigns.push(selected);
    }

    setSelectedCampaigns(tempSelectedCampaigns);
  }

  return (
    <>
      {campaigns?.length > 1 && (
        <div>
          <label htmlFor="campaign">Campanha:</label>
          <select
            name="campaign"
            onChange={(e) => handleSelect(e.target.value)}
            multiple
          >
            {campaigns.map((campaign, index) => (
              <option key={index} value={campaign}>
                {campaign}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default CampaignMultiSelect;
