import { ContestDetails } from "../../utils/interfaces";
import { contest as defaults } from "../../utils/emptyEntities";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getContestById } from "../../fetch/ContestFetch";
import Menu from "../../components/Menu";
import ContestForm from "../../components/forms/ContestForm";

export default function ContestEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contest, setContest] = useState<ContestDetails>(defaults);

  async function fetchContest() {
    if (!id || Number.isNaN(parseInt(id))) return;

    const res = await getContestById(parseInt(id));

    setContest(res);
  }

  useEffect(() => {
    fetchContest();
  }, []);

  return (
    <div className="bg-gray-300 w-screen">
      <Menu />
      <div className="mx-auto my-10 w-11/12 max-w-screen-lg">
        <h1 className="text-8xl text-stroke font-Jomhuria">Contests</h1>
        <ContestForm
          data={contest}
          onSubmit={() => navigate("/contests")}
          action={id ? "EDIT" : "CREATE"}
        />
      </div>
    </div>
  );
}
