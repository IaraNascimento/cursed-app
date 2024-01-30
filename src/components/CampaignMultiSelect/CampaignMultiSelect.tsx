import { getDatabase, onValue, ref } from "@firebase/database";
import { useEffect, useState } from "react";

type CampaignMultiSelectProps = {
  id: string;
  hideLabel?: boolean;
};

function CampaignMultiSelect(props: CampaignMultiSelectProps) {
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

  useEffect(() => {
    localStorage.setItem(
      "selectedCampaigns-" + props.id,
      JSON.stringify(selectedCampaigns)
    );
  }, [selectedCampaigns]);

  function handleSelect(optionArray: any) {
    const tempSelectedCampaigns: Array<string> = [];

    Array.from(optionArray).map((option: any) => {
      if (option.selected) tempSelectedCampaigns.push(option.value);
    });

    setSelectedCampaigns(tempSelectedCampaigns);
  }

  return (
    <>
      {campaigns?.length > 1 && (
        <div>
          {!props.hideLabel && <label htmlFor="campaign">Campanha:</label>}
          <select
            name="campaign"
            onChange={(e) => handleSelect(e.target.childNodes)}
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
