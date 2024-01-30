import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getDatabase, ref as refDb, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import "./CampaignList.scss";

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
    <table>
      {campaigns?.map((campaign, index) => (
        <tr key={index}>
          <td>
            <span>{campaign}</span>
          </td>
          <td className="action-col-2">
            <button
              className="secondary"
              onClick={() => deleteCampaign(campaign)}
            >
              <FontAwesomeIcon icon={icon({ name: "trash" })} />
            </button>
          </td>
        </tr>
      ))}
    </table>
  );
}
export default CampaignList;
